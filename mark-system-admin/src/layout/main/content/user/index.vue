<template>
    <div class="user">
        <div class="header">
            <div style="display: flex;">
                <div class="title">用户管理</div>
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" size="mini"></el-input>
                <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
            </div>
            <div class="btns">
                <el-button type="primary" size="mini" @click="isShowAdd = true">新增用户</el-button>
                <el-button size="mini" @click="getStudent">学生</el-button>
                <el-button size="mini" @click="getTeacher">教师</el-button>
            </div>
        </div>
        <div class="table">
            <!-- 表格 -->
            <el-table :data="list" stripe border style="width: 100%" size="medium">
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="name" label="姓名" width="130"></el-table-column>
                <el-table-column prop="account" label="学号/工号" width="200"></el-table-column>
                <el-table-column prop="type" label="角色" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type === 1">学生</span>
                        <span v-if="scope.row.type === 2">教师</span>
                    </template>
                </el-table-column>
                <el-table-column prop="unit" label="单位" width="180"></el-table-column>
                <el-table-column prop="major" label="专业"></el-table-column>
                <el-table-column prop="phone" label="电话" width="200"></el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="handleEdit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="handleDelete(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination v-if="list.length" background layout="prev, pager, next" :total="count"
                    :hide-on-single-page="true" :current-page="currentPage" :page-size="10" small
                    @current-change="handlePageChange"></el-pagination>
            </div>
        </div>

        <!-- 新增用户对话框 -->
        <el-dialog title="新增用户" :visible.sync="isShowAdd" width="40%">

            <el-form :model="userForm" size="small">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="userForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="userForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="userForm.unit" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="userForm.major" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="type">
                    <el-select v-model="userForm.type" placeholder="请选择身份">
                        <el-option label="学生" value="1"></el-option>
                        <el-option label="教师" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowAdd = false" size="small">取 消</el-button>
                <el-button type="primary" @click="createUser" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑信息对话框 -->
        <el-dialog title="信息编辑" :visible.sync="isShowEdit" width="40%">

            <el-form :model="currentUser" size="small">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="currentUser.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="currentUser.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="unit">
                    <el-input v-model="currentUser.unit" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="专业" prop="major">
                    <el-input v-model="currentUser.major" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份" prop="type">
                    <el-select v-model="currentUser.type" placeholder="请选择身份">
                        <el-option label="学生" value="1"></el-option>
                        <el-option label="教师" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话" prop="major">
                    <el-input v-model="currentUser.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowEdit = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveEdit" size="small">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
  
<script>
import { getUserByType, add, search, deleteuser, edit } from '@/api/user';
export default {
    data() {
        return {
            list: [],
            offset: 0,
            count: 0,
            keyword: '',
            currentPage: 1,
            type: 1,
            isShowAdd: false,
            isShowEdit: false,
            userForm: {
                account: '',
                name: '',
                type: '',
                password: '',
                major: '',
                unit: ''
            },
            currentUser:{}
        };
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        // 根据类型获取用户列表
        getUserList() {
            const limit = 10;
            const offset = (this.currentPage - 1) * limit;

            getUserByType({
                limit,
                offset,
                type: this.type,
            }).then((res) => {
                if (res.data.code === 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                }
            });
        },
        // 获取学生
        getStudent() {
            this.offset = 0;
            this.type = 1;
            this.currentPage = 1;
            this.getUserList();
        },
        // 获取教师
        getTeacher() {
            this.offset = 0;
            this.type = 2;
            this.currentPage = 1;
            this.getUserList();
        },
        // 处理分页变化
        handlePageChange(page) {
            this.currentPage = page;
            this.getUserList();
        },
        //创建账号
        createUser() {
            if (this.userForm.account === '' || this.userForm.password === '' || this.userForm.name === ''
                || this.userForm.type === '' || this.userForm.major === '' || this.userForm.unit === '') {
                this.$message.warning('请把信息填写完整')
                return
            }
            add({ ...this.userForm }).then(res => {
                if (res.data.code === 200) {
                    this.$message.success(res.data.message)
                    this.resetUserForm()
                    this.isShowAdd = false
                    this.getUserList()
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        // 重置表单
        resetUserForm() {
            this.userForm = {
                account: '',
                name: '',
                type: '',
                password: '',
                major: '',
                unit: ''
            }
        },
        //搜索
        handleSearch() {
            //如果关键词为空 不搜索
            if (this.keyword === '') {
                return
            }
            search({ key: this.keyword }).then(res => {
                if (res.data.code === 200) {
                    this.list = res.data.data
                    this.count = 0
                }
            })
        },
        // 删除用户
        handleDelete(id) {
            this.$confirm("确定删除该用户吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    deleteuser({ id }).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.message);
                            // 刷新数据
                            this.getUserList();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                })
                .catch(() => { });
        },
        handleEdit(info){
            this.isShowEdit = true
            this.currentUser = {...info}
        },
        // 保存编辑
        saveEdit(){
            edit({...this.currentUser}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.isShowEdit = false
                    this.getUserList()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }
    },
};
</script>

<style scoped lang='less'>
.user {
    width: 100%;
    height: calc(100vh - 80px);
    overflow-y: auto;
    box-sizing: border-box;

    .header {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            width: 200px;
            display: flex;
            align-items: center;
            font-size: 18px;
        }
    }

    .table {
        margin-top: 10px;

        .pagination {
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>