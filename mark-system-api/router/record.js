const db = require("../db/db");
const express = require("express");
const router = express.Router();
//导入校验
const Joi = require("joi");

//获取所有评分记录 分页
router.get('/getall',(req,res) => {

    const limit = +req.query.limit
    const offset = +req.query.offset

    const sql = 'select * from record limit ? offset ?'

    db.query(sql,[limit,offset],(err,results)=>{
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            return res.send({ code: 500, message: "服务器内部错误！" });
        }

        if(results.length === 0){
            return res.send({
                code:201,
                message:'暂无评分记录'
            })
        }   

        return res.send({
            code:200,
            message:'获取成功',
            data:results
        })
    })
})

//根据状态获取评分
router.get('/bystatus',(req,res) => { 

    const status = +req.query.status
    const limit = +req.query.limit
    const offset = +req.query.offset

    const sql = 'select * from record where status = ? limit ? offset ?'

    db.query(sql,[status,limit,offset],(err,results)=>{
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            return res.send({ code: 500, message: "服务器内部错误！" });
        }

        if(results.length === 0){
            return res.send({
                code:201,
                message:'暂无评分记录'
            })
        }   

        return res.send({
            code:200,
            message:'获取成功',
            data:results
        })
    })
})

//根据教师id和状态 获取评分记录
router.get('/teacher',(req,res) => {

    const teacher_id = req.query.id 
    const status = req.query.status 

    if(status == 3){
        const sql = 'select * from record where teacher_id = ?'

        db.query(sql,[teacher_id],(err,results) => {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                return res.send({ code: 500, message: "服务器内部错误！" });
            }
    
            if(results.length === 0){
                return res.send({
                    code:201,
                    message:'暂无评分记录'
                })
            }   
    
            const researchIdList = results.map(item => item.research_id)

            const sql2 = 'select * from research where id in(?)'

            //通过research_id查询research中记录 然后把每条记录和record的每条记录整合在一起
            db.query(sql2,[researchIdList],(err,researchs) => {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    return res.send({ code: 500, message: "服务器内部错误！" });
                }

                const data = results.map(item =>{
                    const {research_id} = item 
                    const researchObj = researchs.find(research => research.id === research_id)

                    return {
                        ...item,
                        research:researchObj
                    }
                })

                return res.send({
                    code:200,
                    message:'获取成功',
                    data
                })
                
            })
        })

    }else{
        const sql = 'select * from record where teacher_id = ? and status = ?'

        //获取record表中记录
        db.query(sql,[teacher_id,status],(err,results) => {
            if (err) {
                console.log("[SELECT ERROR]:", err.message);
                return res.send({ code: 500, message: "服务器内部错误！" });
            }
    
            if(results.length === 0){
                return res.send({
                    code:201,
                    message:'暂无评分记录'
                })
            }   

            const researchIdList = results.map(item => item.research_id)

            const sql2 = 'select * from research where id in(?)'

            //通过research_id查询research中记录 然后把每条记录和record的每条记录整合在一起
            db.query(sql2,[researchIdList],(err,researchs) => {
                if (err) {
                    console.log("[SELECT ERROR]:", err.message);
                    return res.send({ code: 500, message: "服务器内部错误！" });
                }

                const data = results.map(item =>{
                    const {research_id} = item 
                    const researchObj = researchs.find(research => research.id === research_id)

                    return {
                        ...item,
                        research:researchObj
                    }
                })

                return res.send({
                    code:200,
                    message:'获取成功',
                    data
                })
                
            })
        })
    }
})


//教师评分
router.post('/mark',(req,res) => {

    const id = req.body.id 
    const score = req.body.score 
    const suggestion = req.body.suggestion
    const note = req.body.note
    const date = new Date()

    // 使用 Joi 对参数进行验证
    const schema = Joi.object({
        id: Joi.required(),
        score: Joi.number().integer().min(0).max(100).required(),
        suggestion: Joi.string(),
        note: Joi.string()
    });

    const { error } = schema.validate(req.body);

     //如果校验失败
     if (error) {
        return res.send({
            code: 400,
            message: error.message,
        });
    }
    else{
        const sql = 'update record set score = ?, suggestion = ?, note = ?, date=?, status = 1 where id = ?'

        db.query(sql,[score,suggestion,note,date,id],(err,results) => {
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
                return res.status(400).json({
                    code: 400,
                    message: "更新失败！",
                });
            }

            const sql2 = 'select research_id from record where id = ?'

            db.query(sql2,id,(err,record) => {
                if (err) return console.log(err.message);
                
                if(record.length === 0) return res.send({code:500,message:'服务器出错，请稍后再试！'})

                const research_id = record[0].research_id

                const sql3 = 'select score from record where research_id =?'

                db.query(sql3,research_id,(err,records) => {
                    if (err) return console.log(err.message);
                
                    if(records.length === 0) return res.send({code:500,message:'服务器出错，请稍后再试！'})
                
                    let scoreSum = 0;

                    records.forEach((item) => {
                        scoreSum += Number(item.score)
                    });

                    //成绩
                    const score = Math.floor(scoreSum/records.length)

                    const sql4 = 'update research set score = ? where id = ?'

                    db.query(sql4,[score,research_id],(err,result) => {
                        if (err) return console.log(err.message);

                        if(result.affectedRows === 1){
                             // 更新成功，返回“更新成功”的消息给客户端
                            return res.json({
                                code: 200,
                                message: "更新成功！",
                            });
                        }else{
                            return res.json({
                                code: 201,
                                message: "更新失败！",
                            });
                        }
                    })
                })
            })
        })
    }
})

//学生获取其课题的评分
router.get('/student',(req,res) => {

    const student_id = req.query.id 

    const sql = 'select * from record where student_id = ?'

    db.query(sql,student_id,(err,results) => {

        if (err) return console.log(err);

        if(results.length === 0){
            return res.send({
                code:201,
                message:'暂未分配答辩小组'
            })
        }else{
            return res.send({
                code:200,
                message:'获取成功',
                data:results
            })
        }
    })
})

module.exports = router