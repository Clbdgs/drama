<template>
    <div >
        <div class="manage">
            <el-row>
                <el-col :span="4">
                    <el-menu
                            default-active="1"
                            @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>电视剧管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-2"><router-link :to="{name: 'edit'}">发布</router-link></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
                <el-col :span="20">
                    <router-view/>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name:"manage",
        data(){
            return{

            }
        },
        methods: {
            handleClose(key, keyPath){
                window.console.log(key, keyPath)
            }
        }
    }
</script>
<style scoped>
.manage{

}
</style>