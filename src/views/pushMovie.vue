<template>
    <div>

        <el-form ref="form" :model="form"  :inline="true" size="small" :label-position="labelPosition" label-width="120px">
            <el-form-item label="电影/电视剧名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="导演">
                <el-input v-model="form.director"></el-input>
            </el-form-item>
            <el-form-item label="主演">
                <el-input v-model="form.actors"></el-input>
            </el-form-item>
            <el-form-item label="国家/地区">
                <el-input v-model="form.country"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input v-model="form.type"></el-input>
            </el-form-item>
            <el-form-item label="第几季">
                <el-select  v-model="form.season" placeholder="请选择第几季度" @change="onChange">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="首播时间">
                <el-input v-model="form.time"></el-input>
            </el-form-item>
            <el-form-item label="集数">
                <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="评分">
                <el-input v-model="form.score"></el-input>
            </el-form-item>
            <el-form-item label="资源链接">
                <el-input v-model="form.resource"></el-input>
            </el-form-item>
            <el-form-item label="图片" >
                <el-upload
                        drag
                        class="upload-demo"
                        action=""
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="2"
                        :on-exceed="handleExceed"
                        list-type="picture"
                        :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-row type="flex" class="row-bg" justify="center">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="handlePush">发布</el-button>
        </el-row>
    </div>
</template>
<script>
    export default {
        name:"manage",
        data(){
            return{
                form: {
                    name: '',
                    director: '',
                    actors: [],
                    country: '',
                    type: '',
                    season:"",
                    time: '',
                    number: '',
                    score: '',
                    resource:"",
                    image:""
                },
                options:[
                    { value: '1', label: '第一季'},
                    { value: '2', label: '第二季'},
                    { value: '3', label: '第三季'},
                    { value: '4', label: '第四季'},
                    { value: '5', label: '第五季'}
                ],
                labelPosition:'right',
                fileList:[]
            }
        },

        methods: {
            handleRemove(file, fileList) {
                window.console.log(file, fileList);
            },
            handlePreview(file) {
                window.console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            onSubmit(){

            },
            handlePush(){
                this.$http.post('http://127.0.0.1:4000/api/nc/theate',this.form).then(res=>{
                    window.console.log(res)
                })
            },
            onChange(value){
                alert(value)
            }
        }

    }
</script>
<style scoped>
    .manage{

    }
</style>