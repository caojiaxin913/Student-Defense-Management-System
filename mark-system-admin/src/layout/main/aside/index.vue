<template>
    <div class="aside">
        <el-menu class="el-menu-vertical-demo">
            <el-menu-item v-for="item in menuList" :key="item.id" @click="toPage(item)">
                <i :class="item.class"></i>
                <span slot="title">{{ item.text }}</span>
            </el-menu-item>
        </el-menu>
    </div> 
</template>

<script>

export default {
    data() {
        return {
            menuList:[
                {
                    id:0,
                    text:'用户管理',
                    class:'el-icon-user',
                    path:'/main/user'
                },
                {
                    id:1,
                    text:'课题管理',
                    class:'el-icon-folder-opened',
                    path:'/main/research'
                },
                {
                    id:2,
                    text:'答辩小组',
                    class:'el-icon-document',
                    path:'/main/reply'
                },
                {
                    id:3,
                    text:'评分管理',
                    class:'el-icon-edit-outline',
                    path:'/main/mark'
                },
                // {
                //     id:4,
                //     text:'通知管理',
                //     class:'el-icon-news',
                //     path:'/main/message'
                // }
            ]
        }
    },
    methods:{
        toPage(item){
            if(this.$route.path === item.path){
                return
            }else{
                this.$router.push({path:item.path})
            }
        }
    }
}
</script>

<style scoped lang='less'>
.aside{
    width: 200px;
    height: calc(100vh - 60px);
    border-right: 1px solid #ccc;
}

:deep(.el-menu){
    border:none;
}
</style>