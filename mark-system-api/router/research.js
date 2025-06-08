const db = require("../db/db");
const express = require("express");
const router = express.Router();
//导入校验
const Joi = require('joi')

//创建课题 一个学生只能创建一个
router.post('/create', (req, res) => {

    const { title, type, student_id, student_name, teacher_id, teacher_name, intro, background, content, method, expect } = req.body

    // 使用 Joi 对参数进行验证
    const schema = Joi.object({
        title: Joi.string().required(),
        type: Joi.string().required(),
        student_id: Joi.required(),
        student_name: Joi.string().required(),
        teacher_id: Joi.required(),
        teacher_name: Joi.string().required(),
        intro: Joi.string(),
        background: Joi.string(),
        content: Joi.string(),
        method: Joi.string(),
        expect: Joi.string()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // 如果参数验证失败，则返回错误信息给客户端
        return res.send({
            code: 400,
            message: error.message
        });
    }

    // 查询语句，查找是否该生已经创建了课题
    const findSql = 'SELECT * FROM research WHERE student_id = ?'

    db.query(findSql, student_id, (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        //如果查询到 则返回“已经存在课题”错误信息
        if (results.length !== 0) {
            return res.send({
                code: 400,
                message: '您已经创建了课题！'
            })
        }

        //否则执行插入语句
        const insertSql = 'INSERT INTO research SET ?'

        db.query(insertSql, { ...req.body }, (err, results) => {
            if (err) {
                // 如果查询出现错误，则返回服务器错误给客户端
                console.log(err);
                return res.send({
                    code: 500,
                    message: "服务器出错，请稍后再试！",
                });
            }

            if (results.affectedRows === 1) {
                return res.send({
                    code: 200,
                    message: "创建课题成功",
                });
            }
        })
    })
})

//修改课题信息
router.post('/edit', (req, res) => {

    const { id, title, type, teacher_id, teacher_name, intro, background, content, method, expect } = req.body

    // 使用 Joi 对参数进行验证
    const schema = Joi.object({
        id: Joi.required(),
        title: Joi.string().required(),
        type: Joi.string().required(),
        teacher_id: Joi.required(),
        teacher_name: Joi.string().required(),
        intro: Joi.string(),
        background: Joi.string(),
        content: Joi.string(),
        method: Joi.string(),
        expect: Joi.string()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // 如果参数验证失败，则返回错误信息给客户端
        return res.send({
            code: 400,
            message: error.message
        });
    }

    // 查询语句，查找是否存在该 id 的课题
    const findSql = 'SELECT * FROM research WHERE id = ?'

    db.query(findSql, id, (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        // 如果查询到结果，说明存在该课题，执行更新操作
        if (results.length > 0) {
            const updateSql = 'UPDATE research SET title = ?, type = ?, teacher_id = ?, teacher_name = ?, intro = ?, background = ?, content = ?, method = ?, expect = ? WHERE id = ?'
            const params = [title, type, teacher_id, teacher_name, intro, background, content, method, expect, id]

            db.query(updateSql, params, (err, results) => {
                if (err) {
                    // 如果更新操作出现错误，则返回服务器错误给客户端
                    console.log(err);
                    return res.send({
                        code: 500,
                        message: "服务器出错，请稍后再试！",
                    });
                }

                // 如果更新成功，返回成功信息
                if (results.affectedRows === 1) {
                    return res.send({
                        code: 200,
                        message: "修改课题成功",
                    });
                }
            })
        } else {
            // 如果查询结果为空，说明不存在该课题，返回错误信息
            return res.send({
                code: 400,
                message: "课题不存在"
            })
        }
    })

})

//通过学生id获取 该学生的课题
router.get('/student/:id', (req, res) => {
    const student_id = req.params.id;

    const sql = 'SELECT * FROM research WHERE student_id = ?';

    db.query(sql, student_id, (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        // 如果查询成功，判断是否存在数据
        if (results.length === 0) {
            return res.send({
                code: '201',
                message: '暂无课题'
            })
        }

        // 如果查询成功且存在数据，返回结果
        return res.send({
            code: 200,
            message: '获取成功',
            data: results[0]
        });
    })
})

//通过教师id获取 该教师指导的课题
router.get('/teacher/:id', (req, res) => {

    const teacher_id = req.params.id

    //查询语句 查询所有该导师指导的课题
    const sql = 'SELECT * FROM research WHERE teacher_id = ?'

    db.query(sql, teacher_id, (err, results) => {
        if (err) {
            // 如果更新操作出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        if (results.length === 0) {
            return res.send({
                code: '201',
                message: '暂无课题'
            })
        }

        return res.send({
            code: 200,
            message: '获取成功',
            data: results
        })
    })
})

//通过id获取课题
router.get('/id/:id', (req, res) => {

    const id = req.params.id

    //查询该条课题
    const sql = 'select * from research where id = ?'

    db.query(sql, id, (err, results) => {
        if (err) return console.log(err);

        if (results.length === 0) {
            return res.send({
                code: '201',
                message: '暂无课题'
            })
        }

        return res.send({
            code: 200,
            message: '获取成功',
            data: results
        })
    })

})

//获取所有课题 分页
router.get('/researchs', (req, res) => {
    const limit = +req.query.limit
    const offset = +req.query.offset
    const isgroup = +req.query.isgroup

    let sql = ''

    if (isgroup == 0) {
        // 全部
        sql = 'SELECT * FROM research LIMIT ? OFFSET ?; SELECT COUNT(*) as count FROM research;'
    } else if (isgroup == 1) {
        // 未分配
        sql = 'SELECT * FROM research WHERE group_id IS NULL LIMIT ? OFFSET ?; SELECT COUNT(*) as count FROM research WHERE group_id IS NULL;'
    } else {
        // 已分配
        sql = 'SELECT * FROM research WHERE group_id IS NOT NULL LIMIT ? OFFSET ?; SELECT COUNT(*) as count FROM research WHERE group_id IS NOT NULL;'
    }

    db.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        const researchs = results[0]
        const count = results[1][0]["count"]

        if (researchs.length === 0) {
            return res.send({
                code: 201,
                message: "暂无课题",
                data: [],
                count: 0,
            });
        }
        return res.send({
            code: 200,
            message: "获取成功",
            data: researchs,
            count,
        });
    })
})

//删除课题
router.delete('/deleteresearch', (req, res) => {

    const id = req.body.id

    const sql = "DELETE FROM research WHERE id = ?"

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log("[DELETE ERROR]:", err.message);
            res.send({ code: 500, message: "服务器内部错误！" });
        } else {
            res.send({ code: 200, message: "删除成功！" });
        }
    });

})

//分配答辩小组
router.post('/updategroup', (req, res) => {

    const { id, group_id, group_name } = req.body

    const sql = 'UPDATE research SET group_id = ?,group_name = ? WHERE id = ?';

    db.query(sql, [group_id, group_name, id], (err, results) => {
        if (err) {
            // 如果更新数据出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        if (results.affectedRows === 0) {
            // 如果更新的行数为 0，则表示更新数据失败，返回“更新失败”的错误信息
            return res.send({
                code: 400,
                message: "分配失败！"
            });
        }

        const info = {
            student_id: '',
            student_name: '',
            title: '',
            research_id: '',
            group_id,
            group_name
        }

        //获取这个课题的信息
        const sql1 = 'select * from research where id = ?'

        db.query(sql1, id, (err, research) => {
            if (err) {
                // 如果更新数据出现错误，则返回服务器错误给客户端
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    message: "服务器出错，请稍后再试！",
                });
            }

            info.research_id = research[0].id
            info.title = research[0].title
            info.student_id = research[0].student_id
            info.student_name = research[0].student_name

            //获取这个小组中的三个评委老师的信息
            const sql2 = 'SELECT teacher_id FROM group_teacher WHERE group_id = ?';
            db.query(sql2, [group_id], (err, results) => {
                if (err) {
                    console.error('获取教师id列表失败：', err.message);
                    return res.status(500).json({ code: 500, message: '服务器内部错误！' });
                }

                if (results.length > 0) {

                    const teacherIdList = results.map(item => item.teacher_id);

                    //查询每个教师的信息
                    const sql3 = 'SELECT id,name FROM user WHERE id IN (?)';
                    db.query(sql3, [teacherIdList], (err, results) => {
                        if (err) {
                            console.error('获取教师信息失败：', err.message);
                            return res.status(500).json({ code: 500, message: '服务器内部错误！' });
                        }

                        const teacherList = results.map(item => { return { ...item } });

                        const sql4 = `DELETE FROM record WHERE research_id = ?; INSERT INTO record (teacher_id, teacher_name, student_id, student_name, title, research_id, group_id, group_name) VALUES ?`;

                        const values = [
                            
                            [teacherList[0].id, teacherList[0].name, info.student_id, info.student_name, info.title, info.research_id, info.group_id, info.group_name],
                            [teacherList[1].id, teacherList[1].name, info.student_id, info.student_name, info.title, info.research_id, info.group_id, info.group_name],
                            [teacherList[2].id, teacherList[2].name, info.student_id, info.student_name, info.title, info.research_id, info.group_id, info.group_name]
                            
                        ];

                        db.query(sql4, [id,values], (err, results) => {
                            if (err) {
                                console.log("[INSERT ERROR]:", err.message);
                                return res.send({ code: 500, message: "服务器内部错误！" });
                            } else {
                                if(results[1].affectedRows === 3){
                                    return res.send({
                                        code:200,
                                        message:'分配成功！'
                                    })
                                }else{
                                    return res.send({
                                        code:400,
                                        message:'分配失败！'
                                    })
                                }
                            }
                        });
                    });
                }
            });
        })
    })
})

module.exports = router
