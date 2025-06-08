<template>
    <div class="mark">
        <div class="header">
            <div style="display: flex;">
                <div class="title">评分管理</div>
            </div>
            <div class="btns">                                                                                                                                                                                                                                                                
                <el-button size="mini" @click="getAllRecord">全部</el-button>
                <el-button size="mini" type="warning" @click="getRecordByStatus(0)">未评分</el-button>
                <el-button size="mini" type="primary" @click="getRecordByStatus(1)">已评分</el-button>
            </div>
        </div>

        <div class="table">
            <!-- 表格 -->
            <el-table :data="list" stripe border style="width: 100%" size="medium">
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="title" label="题目" ></el-table-column>
                <el-table-column prop="student_name" label="姓名" width="130"></el-table-column>
                <el-table-column prop="teacher_name" label="评分教师" width="130"></el-table-column>
                <el-table-column prop="score" label="分数" width="100"></el-table-column>
                
                <el-table-column prop="status" label="状态" width="120">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 0">未评</span>
                        <span v-if="scope.row.status === 1">已评</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-view" circle size="mini" @click="showDetial(scope.row)"></el-button>
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
        <el-dialog title="查看评分" :visible.sync="isShowDetial" width="70%">
            <el-descriptions direction="vertical" :column="4" border>
                <el-descriptions-item label="题目" :span="3">{{ current.title }}</el-descriptions-item>
                <el-descriptions-item label="评分" :span="1">{{ current.score }}</el-descriptions-item>
                <el-descriptions-item label="姓名" :span="1">{{ current.student_name }}</el-descriptions-item>
                <el-descriptions-item label="评分教师" :span="1">{{ current.teacher_name }}</el-descriptions-item>
                <el-descriptions-item label="答辩小组" :span="2">{{ current.group_name }}</el-descriptions-item>
                <el-descriptions-item label="意见和建议" :span="4">{{ current.suggestion }}</el-descriptions-item>
                <el-descriptions-item label="备注" :span="4">{{ current.note }}</el-descriptions-item>
                <el-descriptions-item label="评分时间" :span="4">
                    <span v-if="current.date">{{ current.date | dateFormat }}</span>
                    <span v-else>{{ '' }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script>
import { getall,bystatus} from '@/api/record'
import moment from 'moment'
export default {
    data(){
        return{
            list:[],
            offset: 0,
            count: 0,
            keyword: '',
            currentPage: 1,
            status: 0,
            current:{},
            isShowDetial:false
        }
    },
    mounted(){
        this.getAllRecord()
    },
    filters:{
        dateFormat(value){
            return moment(value).format('YYYY-MM-DD hh:mm')
        }
    },
    methods:{
        //获取所有评分记录
        getAllRecord(){

            this.status = 0

            const limit = 10;
            const offset = (this.currentPage - 1) * limit;

            getall({
                limit,
                offset
            }).then(res => {
                if (res.data.code === 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                }
            })
        },
        //根据状态获取评分记录
        getRecordByStatus(status){

            this.status = status

            const limit = 10;
            const offset = (this.currentPage - 1) * limit;

            bystatus({
                limit,
                offset,
                status
            }).then(res => {
                if (res.data.code === 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                }
            })
        },
        // 处理分页变化
        handlePageChange(page) {
            this.currentPage = page;
            if(this.status === 0){
                this.getAllRecord()
            }else{
                this.getRecordByStatus(this.status)
            }
        },
        showDetial(info){
            this.current = {...info}
            this.isShowDetial = true
        }
    }
}
</script>

<style scoped lang='less'>
.mark{
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