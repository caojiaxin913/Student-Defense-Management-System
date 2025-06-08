<template>
    <div class="reply">
        <div class="header">
            <div style="display: flex;">
                <div class="title">答辩小组管理</div>
            </div>
            <div class="btns">
                <el-button size="mini" type="primary" @click="isShowCreate = true">创建答辩小组</el-button>
            </div>
        </div>
        <div class="table">
            <!-- 表格 -->
            <el-table :data="list" stripe border style="width: 100%" size="medium">
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="name" label="小组名称" width="300"></el-table-column>
                <el-table-column prop="major" label="专业" width="300"></el-table-column>
                <el-table-column prop="place" label="答辩地点"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                            @click="handleEdit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="handleDelete(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- <div class="pagination">
                <el-pagination v-if="list.length" background layout="prev, pager, next" :total="count"
                    :hide-on-single-page="true" :current-page="currentPage" :page-size="10" small
                    @current-change="handlePageChange"></el-pagination>
            </div> -->
        </div>

        <!-- 编辑信息对话框 -->
        <el-dialog title="编辑答辩小组信息" :visible.sync="isShowEdit" width="70%" >

            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="小组名称" :span="4">
                    <el-input v-model="current.name"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="专业" :span="4">
                    <el-input v-model="current.major"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="答辩地点" :span="4">
                    <el-input v-model="current.place"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="评委老师一" :span="2">
                    <el-select v-if="current.teachers" v-model="current.teachers[0]" placeholder="请选择">
                        <el-option v-for="item in teacherList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="评委老师二" :span="1">
                    <el-select v-if="current.teachers" v-model="current.teachers[1]" placeholder="请选择">
                        <el-option v-for="item in teacherList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="评委老师三" :span="1">
                    <el-select v-if="current.teachers" v-model="current.teachers[2]" placeholder="请选择">
                        <el-option v-for="item in teacherList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-descriptions-item>
            </el-descriptions>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowEdit = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveEdit" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 创建答辩小组对话框 -->
        <el-dialog title="创建答辩小组" :visible.sync="isShowCreate" width="60%">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="小组名称" :span="4">
                    <el-input v-model="newGroup.name"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="专业" :span="4">
                    <el-input v-model="newGroup.major"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="答辩地点" :span="4">
                    <el-input type="textarea" v-model="newGroup.place"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="评委老师一" :span="2">
                    <el-select v-model="newGroup.teacher1_id" placeholder="请选择">
                        <el-option v-for="item in teacherList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="评委老师二" :span="1">
                    <el-select v-model="newGroup.teacher2_id" placeholder="请选择">
                        <el-option v-for="item in teacherList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="评委老师三" :span="1">
                    <el-select v-model="newGroup.teacher3_id" placeholder="请选择">
                        <el-option v-for="item in teacherList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-descriptions-item>
            </el-descriptions>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowCreate = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleCreate" size="small">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
  
<script>
import { getall, deletegroup, edit, create} from '@/api/group';
import { getteachers } from '@/api/user'
export default {
    data() {
        return {
            list: [],
            keyword: '',
            type: 1,
            isShowCreate:false,
            isShowEdit: false,
            current: {},
            newGroup:{
                name:'',
                major:'',
                place:'',
                teacher1_id:'',
                teacher2_id:'',
                teacher3_id:'',
            },
            teacherList:[],
        };
    },
    mounted() {
        this.getList();
        this.getTeacher();
    },
    methods: {
        // 获取导师列表
        getTeacher(){
            getteachers({}).then(res => {
                if(res.data.code === 200){
                    this.teacherList = res.data.data
                }
            })
        },
        // 根据类型获取用户列表
        getList() {
            getall({}).then((res) => {
                if (res.data.code === 200) {
                    this.list = res.data.data
                }
            });
        },
        // 删除课题
        handleDelete(id) {
            this.$confirm("确定删除该小组吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                deletegroup(id).then(res => {
                    if(res.data.code === 200){
                        this.$message.success(res.data.message)
                        this.getList()
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            })
        },
        handleEdit(info) {
            this.isShowEdit = true
            this.current = { ...info }
        },
        // 保存编辑
        saveEdit() {
            edit({...this.current}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.isShowEdit = false
                    this.getList()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        // 创建新小组
        handleCreate(){
            if(this.newGroup.name === '' || this.newGroup.major === '' || this.newGroup.place === ''){
                this.$message.warning('请输入完整信息！')
                return
            }
            // 发送请求
            create({...this.newGroup}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.isShowCreate = false
                    this.getList()
                    this.resetNew()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //重置newGroup
        resetNew(){
            this.newGroup = {
                name:'',
                major:'',
                place:''
            }
        }
    },
};
</script>

<style scoped lang='less'>
.reply {
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

        .btns{
            span{
                margin-right: 10px;
                font-size: 14px;
                color:#666;
            }
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