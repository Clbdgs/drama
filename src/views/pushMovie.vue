/* eslint-disable */
<template id="pushTheate">
    <div>
        <el-dialog title="新建" :visible="visiable" @close="handleClose">
            <el-form ref="form" :model="form"  size="small" :label-position="labelPosition" label-width="120px">
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
                <el-form-item label="剧情描述">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="图片" >
                    <el-upload
                            drag
                            action="#"
                            :limit="5"
                            ref="upload"
                            :multiple="true"
                            :auto-upload="false"
                            list-type="picture"
                            :before-upload="beforeAvatarUpload"
                            :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="handlePush">发布</el-button>
                <el-button >取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        template:"#pushTheate",
        props:{
            showDlg:{
                type:Boolean,
                default:false
            },
            parentData:{
                type:Object,
                default:{}
            }
        },
        data(){
            return{
                cacheForm:{},
                upLoadUrl:"http://127.0.0.1:4000/api/upload",
                form: {
                    name: '',
                    director: '',
                    actors: "",
                    country: '',
                    type: '',
                    season:"",
                    time: '',
                    number: '',
                    score: '',
                    resource:"",
                    imageUrl:"",
                    desc:""
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
        computed:{
          visiable:function () {
              return this.showDlg
          }
        },
        watch:{
            parentData:function (val,oldVal) {
                this.form = val;
                this.cacheForm = JSON.parse(JSON.stringify(this.form));
            }
        },
        methods: {
            handleClose(){
                this.$emit('update:showDlg',false);
            },
            onSubmit(){
                // 获取到 上传的所有文件，它是一个数组
                const fileArray = this.$refs.upload.uploadFiles;
                // 实例化FormData对象
                const fd = new FormData();
                // 遍历文件数组，将所有文件存入fd中
                for(let i = 0; i < fileArray.length; i++) {
                    // 在这里数组每一项的.raw才是你需要的文件，有疑惑的可以打印到控制台看一下就清楚了
                    fd.append('avatar', fileArray[i].raw);
                }
                // 发送HTTP请求，发送数据
                return this.$http({
                    url: this.upLoadUrl,
                    method: 'post',
                    data: fd,
                })
            },
            async handlePush(){
                var pushData= Object.assign({},{},{});
                pushData.id = this.form._id;
                //判断是否为更新状态
                if(true){

                    //新数据和老数据比较去做局部更新
                    for( let prop in this.form){
                        if(this.cacheForm.hasOwnProperty(prop)){
                            if(this.cacheForm[prop] != this.form[prop]){
                                pushData[prop] = this.form[prop]
                            }
                        }

                    }
                    console.log('----',pushData);
                    this.$http.post('http://127.0.0.1:4000/api/nc/editTheate',pushData).then(res=>{
                        window.console.log(res);
                    })
                }
                return
                var res  = await this.onSubmit();
                this.form.imageUrl = res.data.fileUrl;
                this.$http.post('http://127.0.0.1:4000/api/nc/theate',this.form).then(res=>{
                    window.console.log(res);
                })
                this.$emit('update:showDlg',false);
            },
            beforeAvatarUpload(file){
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isLt2M
            },
            onChange(value){

            }
        }

    }
</script>
<style scoped>
  .manage{

    }
</style>