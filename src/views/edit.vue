<template>
    <div>
        <push-theate :showDlg.sync= 'showDlg' :parentData="parentData"></push-theate>
        <el-button size="large" type="primary" @click="handleCreate">新建电视剧</el-button>
        <el-table
                border
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="time"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="resource"
                    label="地址">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import pushTheate from './pushMovie.vue'
    export default {
        components:{
            'push-theate':pushTheate
        },
        data() {
            return {
                tableData: [],
                showDlg:false,
                parentData:{}
            }
        },
        created(){
            this.init();
        },
        methods: {
            handleCreate(){
                this.parentData = {};
                this.showDlg = true;
            },
            init(){
                this.$http.get('http://127.0.0.1:4000/api/nc/theate/all').then(res=>{
                    this.tableData =  res.data.req
                })
            },
            handleEdit(index, row) {
                this.parentData  = row;
                this.showDlg = true;
//                this.$http.get('http://127.0.0.1:4000/api/nc/theate/all').then(res=>{
//                    this.tableData =  res.data.req
//                })
            },
            handleDelete(index, row) {
                this.$http.post('http://127.0.0.1:4000/api/nc/deleteTheate',{id:row._id}).then(res=>{
                    this.init();
                })
            }
        }
    }
</script>