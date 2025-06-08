const db = require("../db/db");
const express = require("express");
const router = express.Router();
//导入校验
const Joi = require("joi");

//创建答辩小组
router.post("/create", (req, res) => {
    const { name, major, place, teacher1_id, teacher2_id, teacher3_id } =
        req.body;
    const group = { name, major, place };

    const sql1 = "INSERT INTO groups SET ?";
    db.query(sql1, group, (err, results) => {
        if (err) {
            console.log("[INSERT ERROR]:", err.message);
            return res.send({ code: 500, message: "服务器内部错误！" });
        } else {
            const group_id = results.insertId;
            const sql2 = "INSERT INTO group_teacher (teacher_id, group_id) VALUES ?";
            const values = [
                [teacher1_id, group_id],
                [teacher2_id, group_id],
                [teacher3_id, group_id],
            ];
            db.query(sql2, [values], (err, results) => {
                if (err) {
                    console.log("[INSERT ERROR]:", err.message);
                    return res.send({ code: 500, message: "服务器内部错误！" });
                } else {
                    if(results.affectedRows > 0){
                        return res.send({ code: 200, message: "创建成功！" });
                    }else{
                        return res.send({ code: 400, message: "创建失败，请稍后再试！" });
                    }
                    
                }
            });
        }
    });
});

//根据id删除答辩小组
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM groups WHERE id = ?";

    db.query(sql, id, (err, results) => {
        if (err) {
            console.log("[DELETE ERROR]:", err.message);
            return res.send({ code: 500, message: "服务器内部错误！" });
        }

        if (results.affectedRows === 1) {
            return res.send({ code: 200, message: "删除成功！" });
        } else {
            return res.send({ code: 400, message: "删除失败！" });
        }
    });
});


// 将查询语句包装为 Promise 对象，返回查询结果
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

//根据id编辑答辩小组
router.post('/edit', async (req, res) => {
    const { id, name, place, major, teachers } = req.body;

    try {
        await query('START TRANSACTION');
        const sql1 = 'UPDATE groups SET name = ?, place = ?, major = ? WHERE id = ?';
        await query(sql1, [name, place, major, id]);
        const sql2 = 'DELETE FROM group_teacher WHERE group_id = ?';
        await query(sql2, [id]);
        const values = teachers.map(teacherId => [teacherId, id]);
        const sql3 = 'INSERT INTO group_teacher (teacher_id, group_id) VALUES ?';
        await query(sql3, [values]);
        await query('COMMIT');
        return res.send({ code: 200, message: '编辑成功！' });
    } catch (err) {
        console.log('[TRANSACTION ERROR]:', err.message);
        await query('ROLLBACK');
        return res.send({ code: 500, message: '服务器内部错误！' });
    }
});


//获取所有答辩小组
router.get("/getall", (req, res) => {
    const sql = "SELECT * FROM groups";

    db.query(sql, (err, groups) => {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            return res.send({ code: 500, message: "服务器内部错误！" });
        }

        if (groups.length === 0) {
            return res.send({
                code: 201,
                message: "暂无答辩小组",
            });
        }

        const groupIds = groups.map((group) => group.id);
        const sql2 =
            "SELECT teacher_id, group_id FROM group_teacher WHERE group_id IN (?)";
        db.query(sql2, [groupIds], (err, groupTeachers) => {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                return res.send({ code: 500, message: "服务器内部错误！" });
            }
            // 将 group_teachers 按 group_id 归类，方便后面合并
            const groupTeachersByGroupId = {};
            for (let groupTeacher of groupTeachers) {
                if (!groupTeachersByGroupId[groupTeacher.group_id]) {
                    groupTeachersByGroupId[groupTeacher.group_id] = [];
                }
                groupTeachersByGroupId[groupTeacher.group_id].push(
                    groupTeacher.teacher_id
                );
            }
            // 合并 groups 和 group_teachers 的信息
            const data = groups.map((group) => {
                return {
                    ...group,
                    teachers: groupTeachersByGroupId[group.id],
                };
            });
            return res.send({
                code: 200,
                message: "获取成功",
                data,
            });
        });
    });
});

// 通过id获取group信息和该小组里面的教师姓名
router.get('/get/:id', (req, res) => {
    const id = +req.params.id

    //查询该答辩小组的信息
    const sql1 = 'SELECT * FROM groups WHERE id = ?';

    db.query(sql1, id, (err, groupInfo) => {
        if (err) {
            console.error('获取答辩小组信息失败：', err.message);
            return res.status(500).json({ code: 500, message: '服务器内部错误！' });
        }

        //获取该答辩小组中的教师id,通过group_id在group_teacher表中获取,教师信息在user表中
        const sql2 = 'SELECT teacher_id FROM group_teacher WHERE group_id = ?';
        db.query(sql2, [id], (err, results) => {
            if (err) {
                console.error('获取教师id列表失败：', err.message);
                return res.status(500).json({ code: 500, message: '服务器内部错误！' });
            }

            const teacherIdList = results.map(item => item.teacher_id);

            //查询每个教师的信息
            const sql3 = 'SELECT name FROM user WHERE id IN (?)';
            db.query(sql3, [teacherIdList], (err, results) => {
                if (err) {
                    console.error('获取教师信息失败：', err.message);
                    return res.status(500).json({ code: 500, message: '服务器内部错误！' });
                }

                const teacherNameList = results.map(item => item.name);

                //将这些信息整合在一起返回给客户端
                const ret = {
                    id: groupInfo[0].id,
                    name: groupInfo[0].name,
                    place: groupInfo[0].place,
                    major: groupInfo[0].major,
                    teacherList: teacherNameList
                };

                return res.send({ code: 200, message: '获取成功！', data: ret });
            });
        });
    });
});

//通过教师id获取group信息
router.get('/getbyteacher/:id',(req,res)=>{

    const teacher_id = +req.params.id

    const sql1 = 'select * from group_teacher where teacher_id = ?'

    db.query(sql1,teacher_id,(err,results) => {

        if (err) {
            console.error('获取group_teacher信息失败：', err.message);
            return res.status(500).json({ code: 500, message: '服务器内部错误！' });
        }

        if(results.length === 0){
            return res.send({
                code:201,
                message:'未查询到group_teacher'
            })
        }

        //答辩小组id
        const group_id = results[0].group_id

        const sql2 = 'select * from groups where id = ?'

        db.query(sql2,group_id,(err,groupInfo)=>{
            if (err) {
                console.error('获取小组信息失败：', err.message);
                return res.status(500).json({ code: 500, message: '服务器内部错误！' });
            }

            //获取该答辩小组中的教师id,通过group_id在group_teacher表中获取,教师信息在user表中
            const sql3 = 'SELECT teacher_id FROM group_teacher WHERE group_id = ?';
            db.query(sql3, [group_id], (err, results) => {
                if (err) {
                    console.error('获取教师id列表失败：', err.message);
                    return res.status(500).json({ code: 500, message: '服务器内部错误！' });
                }

                const teacherIdList = results.map(item => item.teacher_id);

                //查询每个教师的信息
                const sql4 = 'SELECT name FROM user WHERE id IN (?)';
                db.query(sql4, [teacherIdList], (err, results) => {
                    if (err) {
                        console.error('获取教师信息失败：', err.message);
                        return res.status(500).json({ code: 500, message: '服务器内部错误！' });
                    }

                    const teacherNameList = results.map(item => item.name);

                    //将这些信息整合在一起返回给客户端
                    const ret = {
                        id: groupInfo[0].id,
                        name: groupInfo[0].name,
                        place: groupInfo[0].place,
                        major: groupInfo[0].major,
                        teacherList: teacherNameList
                    };

                    return res.send({ code: 200, message: '获取成功！', data: ret });
                });
            });
        })
    })
})

//根据

module.exports = router;
