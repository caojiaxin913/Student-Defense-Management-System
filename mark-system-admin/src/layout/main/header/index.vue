<template>
    <div class="header">
        <div class="logo">管理员系统</div>
        <div class="date">{{ new Date() | dateFormat }}</div>
        <div class="user">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <i class="el-icon-user"></i>
                    {{ $store.state.userinfo.name }}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><span @click="exitLogin">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default{
    data(){
        return{

        }
    },
    filters:{
        dateFormat(val){
            return moment(val).format('YYYY-MM-DD')
        }
    },
    methods:{
        exitLogin(){
            this.$router.push({name:'Login'})
        }
    }
}
</script>

<style scoped lang='less'>
.header{
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    background-color: #00557f;
    padding:0 20px;
    color:#fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo{
        font-size: 20px;
    }

    .user{
        .el-dropdown-link{
            color:#fff;
            cursor: pointer;
        }
    }
}
</style>