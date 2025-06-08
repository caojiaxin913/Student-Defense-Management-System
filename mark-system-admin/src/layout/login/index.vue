<template>
    <div class="login">
        <div class="title">毕设答辩记录及评分 - 管理员系统</div>

        <div class="login-box">
            <el-form :model="loginForm">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            
            <div class="btn">
                <el-button type="primary" @click="loginHandler">登录</el-button>
                <el-button @click="reset">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/user'
export default {
    data() {
        return {
            loginForm:{
                account:'',
                password:'',
                type:3
            }
        }
    },
    methods:{
        loginHandler(){
            
            if(this.loginForm.account == '' || this.loginForm.password == ''){
                this.$message.error('请输入账号和密码')
                return
            }

            //发送登录请求
            login({...this.loginForm}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    //跳转到主页
                    this.$router.push({name:'Main'})
                    //将返回的用户数据存入vuex
					this.$store.commit('setUserinfo', res.data.userinfo)
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        reset(){
            this.loginForm = {
                account:'',
                password:''
            }
        }    
    }
}
</script>

<style scoped lang='less'>
.login {
    width: 100%;
    height: 100vh;
    background: linear-gradient(#00557f, #014263);

    .title {
        font-size: 20px;
        color: #fff;
        text-align: center;
        padding: 20px 0;
    }

    .login-box{
        width: 350px;
        height: auto;
        background-color: #fffffff5;
        padding:30px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 10px;

        .btn{
            width: 100%;
            text-align: end;
        }
    }
}
</style>