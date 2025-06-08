const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'1234',
    database:'score_system',
    multipleStatements: true
})

//向外共享 db 数据库连接对象
module.exports = db