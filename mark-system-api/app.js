const express = require('express')
const app = express();

//跨域
const cors = require('cors');
app.use(cors());

//配置解析 application/json 格式数据的内置中间件
app.use(express.json());
//配置解析 application/x-www-from-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));

//导入用户路由
const userRouter = require('./router/user');
app.use('/user',userRouter);

//导入课题路由
const researchRouter = require('./router/research');
app.use('/research',researchRouter);

//导入记录路由
const recordRouter = require('./router/record');
app.use('/record',recordRouter);

//导入答辩小组路由
const groupRouter = require('./router/group');
app.use('/group',groupRouter);

app.listen(3000,()=>{
    console.log("服务已启动");
})