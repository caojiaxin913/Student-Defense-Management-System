<template>
    <div class="research">
        <div class="header">
            <div style="display: flex;">
                <div class="title">课题管理</div>
            </div>
            <div class="btns">
                <span>答辩小组：</span>
                <el-button size="mini" @click="allResearch">全部</el-button>
                <el-button size="mini" type="warning" @click="noGroup">未分配</el-button>
                <el-button size="mini" type="primary" @click="haveGroup">已分配</el-button>
            </div>
        </div>
        <div class="table">
            <!-- 表格 -->
            <el-table :data="list" stripe border style="width: 100%" size="medium">
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="title" label="标题" width="300"></el-table-column>
                <el-table-column prop="type" label="类型" width="150"></el-table-column>

                <el-table-column prop="student_name" label="学生" width="120"></el-table-column>
                <el-table-column prop="teacher_name" label="导师" width="120"></el-table-column>
                <el-table-column prop="group_name" label="答辩小组" width="200">
                    <template slot-scope="scope">
                        <span v-if="scope.row.group_name">
                            {{ scope.row.group_name }}
                        </span>
                        <span v-else style="color:orange">
                            未分配
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="得分"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="分配答辩小组" placement="top-start">
                            <el-button icon="el-icon-news" circle size="mini" @click="handleGroup(scope.row)"></el-button>
                        </el-tooltip>
                        
                        <el-tooltip effect="dark" content="浏览课题" placement="top-start">
                            <el-button type="" icon="el-icon-tickets" circle size="mini"
                            @click="handleSee(scope.row)"></el-button>
                        </el-tooltip>
                        
                        <el-tooltip effect="dark" content="编辑课题" placement="top-start">
                            <el-button type="primary" icon="el-icon-edit" circle size="mini"
                            @click="handleEdit(scope.row)"></el-button>
                        </el-tooltip>
                        
                        <el-tooltip effect="dark" content="删除课题" placement="top-start">
                            <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="handleDelete(scope.row.id)"></el-button>
                        </el-tooltip>
                        
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

        <!-- 查看课题信息对话框 -->
        <el-dialog title="查看课题" :visible.sync="isShowResearch" width="70%">
            <el-descriptions title="课题信息" direction="vertical" :column="4" border>
                <el-descriptions-item label="标题" :span="3">{{ currentResearch.title }}</el-descriptions-item>
                <el-descriptions-item label="课题类型" :span="1">
                    <el-tag size="small">{{ currentResearch.type }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="姓名" :span="2">{{ currentResearch.student_name }}</el-descriptions-item>
                <el-descriptions-item label="导师" :span="2">{{ currentResearch.teacher_name }}</el-descriptions-item>
                <el-descriptions-item label="课题简介" :span="4">{{ currentResearch.intro }}</el-descriptions-item>
                <el-descriptions-item label="研究背景" :span="4">{{ currentResearch.background }}</el-descriptions-item>
                <el-descriptions-item label="研究内容" :span="4">{{ currentResearch.content }}</el-descriptions-item>
                <el-descriptions-item label="研究方法" :span="4">{{ currentResearch.method }}</el-descriptions-item>
                <el-descriptions-item label="预期成果" :span="4">{{ currentResearch.expect }}</el-descriptions-item>
                <el-descriptions-item label="答辩小组" :span="4">{{ currentResearch.group_name }}</el-descriptions-item>
                <el-descriptions-item label="得分" :span="4">{{ currentResearch.score }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <!-- 编辑信息对话框 -->
        <el-dialog title="编辑课题" :visible.sync="isShowEdit" width="70%">

            <el-descriptions title="课题信息" direction="vertical" :column="4" border>
                <el-descriptions-item label="标题" :span="3">
                    <el-input v-model="currentResearch.title"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="课题类型" :span="1">
                    <el-input v-model="currentResearch.type"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="姓名" :span="2">
                    <el-input v-model="currentResearch.student_name"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="导师" :span="2">
                    <el-input v-model="currentResearch.teacher_name"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="课题简介" :span="4">
                    <el-input type="textarea" v-model="currentResearch.intro"></el-input>
                </el-descriptions-item>

                <el-descriptions-item label="研究背景" :span="4">
                    <el-input type="textarea"  v-model="currentResearch.background"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="研究内容" :span="4">
                    <el-input type="textarea"  v-model="currentResearch.content"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="研究方法" :span="4">
                    <el-input type="textarea"  v-model="currentResearch.method"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="预期成果" :span="4">
                    <el-input type="textarea"  v-model="currentResearch.expect"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="得分" :span="4">
                    <el-input v-model="currentResearch.score" disabled></el-input>
                </el-descriptions-item>
            </el-descriptions>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowEdit = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveEdit" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分配答辩小组 -->
        <el-dialog title="分配答辩小组" :visible.sync="isShowGroup" width="50%">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="课题名称" :span="4">
                    {{currentResearch.title}}
                </el-descriptions-item>
                <el-descriptions-item label="答辩小组" :span="4">
                    
                    <el-select v-model="currentResearch.group_name" placeholder="请选择">
                        <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    
                </el-descriptions-item>
            </el-descriptions>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowGroup = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveGroup" size="small">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
  
<script>
import { researchs, deleteresearch, edit, updategroup } from '@/api/research';
import { getall } from '@/api/group'
export default {
    data() {
        return {
            list: [],
            offset: 0,
            count: 0,
            keyword: '',
            currentPage: 1,
            type: 1,
            isShowResearch: false,
            isShowEdit: false,
            isShowGroup:false,
            currentResearch: {},
            groupList:[],
            isgroup:0
        };
    },
    mounted() {
        this.getList()
        this.getGroupList()
    },
    methods: {
        // 根据类型获取课题列表
        getList() {
            const limit = 10;
            const offset = (this.currentPage - 1) * limit;

            researchs({
                limit,
                offset,
                isgroup:this.isgroup
            }).then((res) => {
                if (res.data.code === 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                }else{
                    this.list = res.data.data;
                    this.count = res.data.count;
                }
            });
        },
        //获取答辩小组
        getGroupList(){
            getall({}).then(res => {
                if(res.data.code === 200){
                    this.groupList = res.data.data
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        // 处理分页变化
        handlePageChange(page) {
            this.currentPage = page;
            this.getList();
        },
        //搜索
        handleSearch() {
            //如果关键词为空 不搜索
            if (this.keyword === '') {
                return
            }
            // todo search
        },
        // 删除课题
        handleDelete(id) {
            this.$confirm("确定删除该课题吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                deleteresearch({id}).then(res => {
                    if(res.data.code === 200){
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            })
        },
        handleEdit(info) {
            this.isShowEdit = true
            this.currentResearch = { ...info }
        },
        handleSee(info){
            this.isShowResearch = true
            this.currentResearch = {...info}
        },
        // 保存编辑
        saveEdit() {
			delete this.currentResearch.student_id
			delete this.currentResearch.student_name
			delete this.currentResearch.score
            edit({...this.currentResearch}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.isShowEdit = false
                    this.getList()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        handleGroup(info){
            this.isShowGroup = true
            this.currentResearch = {...info}
        },
        saveGroup(){

            if(this.currentResearch.group_name){
                this.currentResearch.group_id = this.groupList.find(item => item.name === this.currentResearch.group_name).id
            }
            
            updategroup({...this.currentResearch}).then(res => {
                if(res.data.code === 200){
                    this.$message.success(res.data.message)
                    this.getList()
                    this.isShowGroup = false
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        allResearch(){
            this.isgroup = 0
            this.currentPage = 1
            this.getList()
        },
        noGroup(){
            this.isgroup = 1
            this.currentPage = 1
            this.getList()
        },
        haveGroup(){
            this.isgroup = 2
            this.currentPage = 1
            this.getList()
        }
    },
};
</script>

<style scoped lang='less'>
.research {
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