const db = require("../db/db");
const express = require("express");
const router = express.Router();
//导入bcryptjs包
const bcrypt = require("bcryptjs");
//导入校验
const Joi = require("joi");

//注册
router.post("/register", (req, res) => {
    const { account, type, name, password, unit, major } = req.body;

    const userSchema = Joi.object({
        account: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        type: Joi.number().valid(1, 2, 3).required(),
        unit: Joi.string().required(),
        major: Joi.string().required(),
    });

    const { error } = userSchema.validate(req.body);

    //如果校验失败
    if (error) {
        return res.send({
            code: 400,
            message: error.message,
        });
    } else {
        //查询语句 查找账号是否已存在
        const findSql = "select * from user where account = ?";
        db.query(findSql, account, (err, results) => {
            if (err) return console.log(err);

            if (results.length > 0) {
                return res.send({
                    code: 400,
                    message: "该账号已存在！",
                });
            } else {
                //对密码加密
                const newpsd = bcrypt.hashSync(password, 10);

                //插入一条数据
                const sql =
                    "INSERT INTO user (account, password, name, type, unit, major) VALUES (?, ?, ?, ?, ?, ?)";

                //插入一条数据
                db.query(
                    sql,
                    [account, newpsd, name, type, unit, major],
                    (err, results) => {
                        if (err) return console.log(err);

                        if (results.affectedRows === 1) {
                            return res.send({
                                code: 200,
                                message: "注册成功",
                            });
                        }
                    }
                );
            }
        });
    }
});

//登录
router.post("/login", (req, res) => {
    const { account, password, type } = req.body;

    // 使用 Joi 对参数进行验证
    const schema = Joi.object({
        account: Joi.string().required(),
        type: Joi.number().valid(1, 2, 3).required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        // 如果参数验证失败，则返回错误信息给客户端
        return res.status(400).json({
            code: 400,
            message: error.message,
        });
    }

    // 查询语句，查找符合账号和类型的用户
    const sql = "SELECT * FROM user WHERE account = ? AND type = ?";
    db.query(sql, [account, type], (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        if (results.length === 0) {
            // 如果没有找到符合条件的用户，则返回“用户不存在”的错误信息
            return res.status(400).json({
                code: 400,
                message: "用户不存在！",
            });
        }

        // 比对密码是否正确
        const result = results[0];
        const isPasswordCorrect = bcrypt.compareSync(password, result.password);

        if (!isPasswordCorrect) {
            // 如果密码不正确，则返回“密码错误”的错误信息
            return res.status(401).json({
                code: 401,
                message: "密码错误！",
            });
        }

        // 登录成功，返回用户信息给客户端
        return res.json({
            code: 200,
            message: "登录成功！",
            userinfo: {
                id: result.id,
                account: result.account,
                type: result.type,
                name: result.name,
                major: result.major,
                phone: result.phone,
                unit: result.unit,
            },
        });
    });
});

// 编辑资料
router.post("/edit", (req, res) => {
    const { id, name, phone, unit, major } = req.body;

    // 使用 Joi 对参数进行验证
    const schema = Joi.object({
        id: Joi.required(),
        account: Joi.string(),
        type: Joi.number().valid(1, 2),
        name: Joi.string().min(2).max(20).required(),
        phone: Joi.string().allow("").pattern(new RegExp("^[0-9]{11}$")),
        unit: Joi.string().required(),
        major: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        // 如果参数验证失败，则返回错误信息给客户端
        return res.status(400).json({
            code: 400,
            message: error.details[0].message,
        });
    }

    // 更新数据库中的用户信息
    const sql =
        "UPDATE user SET name = ?, phone = ?, major = ?, unit = ? WHERE id = ?";
    db.query(sql, [name, phone, major, unit, id], (err, results) => {
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

        // 更新成功，返回“更新成功”的消息给客户端
        return res.json({
            code: 200,
            message: "更新成功！",
        });
    });
});

// 修改密码
router.post("/modifypsd", (req, res) => {
    const { oldPassword, newPassword, id } = req.body;

    // 使用 Joi 对参数进行验证
    const schema = Joi.object({
        id: Joi.required(),
        oldPassword: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
        newPassword: Joi.string()
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
            .required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
        // 如果参数验证失败，则返回错误信息给客户端
        return res.status(400).json({
            code: 400,
            message: error.details[0].message,
        });
    }

    // 查询用户的原密码
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql, id, (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        // 比对原密码是否正确
        const result = results[0];
        const isPasswordCorrect = bcrypt.compareSync(oldPassword, result.password);

        if (!isPasswordCorrect) {
            // 如果原密码不正确，则返回“原密码错误”的错误信息
            return res.status(401).json({
                code: 401,
                message: "原密码错误！",
            });
        }

        // 对新密码进行加密
        const newpsd = bcrypt.hashSync(newPassword, 10);

        // 更新数据库中的用户密码
        const updateSql = "UPDATE user SET password = ? WHERE id = ?";
        db.query(updateSql, [newpsd, id], (err, results) => {
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

            // 更新成功，返回“更新成功”的消息给客户端
            return res.json({
                code: 200,
                message: "修改密码成功！",
            });
        });
    });
});

// 获取用户信息
router.get("/userinfo", (req, res) => {
    const { id } = req.query;

    // 查询用户信息
    const sql =
        "SELECT id, account, name, phone, type, unit, major FROM user WHERE id = ?";
    db.query(sql, id, (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.status(500).json({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        if (results.length === 0) {
            // 如果查询结果为空，则返回“用户不存在”的错误信息
            return res.status(404).json({
                code: 404,
                message: "用户不存在！",
            });
        }

        // 将查询结果返回给客户端
        return res.json({
            code: 200,
            data: results[0],
        });
    });
});

// 获取导师列表
router.get("/getteachers", (req, res) => {
    const sql = "SELECT id as value, name as text FROM user WHERE type = 2";

    db.query(sql, (err, results) => {
        if (err) {
            // 如果查询出现错误，则返回服务器错误给客户端
            console.log(err);
            return res.send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }

        if (results.length === 0) {
            return res.send({
                code: 201,
                message: "未查询到导师",
            });
        }

        return res.send({
            code: 200,
            message: "获取成功",
            data: results,
        });
    });
});

//获取所有用户 分页
router.get("/users", (req, res) => {
    const limit = +req.query.limit;
    const offset = +req.query.offset;
    const type = +req.query.type;

    const sql =
        "SELECT id, account, name, phone, type, unit, major FROM user WHERE type = ? LIMIT ? OFFSET ?; SELECT COUNT(*) as count FROM user WHERE type = ?;";

    db.query(sql, [type, limit, offset, type], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                code: 500,
                message: "服务器出错，请稍后再试！",
            });
        }
        const users = results[0];
        const count = results[1][0]["count"];
        if (users.length === 0) {
            return res.send({
                code: 201,
                message: "暂无用户",
                data: [],
                count: 0,
            });
        }
        return res.send({
            code: 200,
            message: "获取成功",
            data: users,
            count,
        });
    });
});

//搜索用户
router.get("/search",(req,res)=>{

    // 关键词
    const key = req.query.key;
    // 模糊查询语句
    const sql = "SELECT id, account, name, phone, type, unit, major FROM user WHERE name LIKE ?";
    // 给搜索关键词加上 % 通配符
    const keyword = `%${key}%`;
    // 执行 SQL 查询
    db.query(sql, [keyword], (err, results) => {
        if (err) {
            console.log("[SELECT ERROR]:", err.message);
            res.send({ code: 500, msg: "服务器内部错误！" });
        } else {
            res.send({ code: 200, data: results });
        }
    });

})

//删除用户
router.delete("/deleteuser",(req,res)=>{

    const id = req.body.id

    const sql = "DELETE FROM user WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.log("[DELETE ERROR]:", err.message);
            res.send({ code: 500, message: "服务器内部错误！" });
        } else {
            res.send({ code: 200, message: "删除成功！" });
        }
    });
})

module.exports = router;
