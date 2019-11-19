<template>
  <div class="about">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row>
          <el-col :span="8"><img :src="item.imageUrl" alt=""></el-col>
          <el-col :span="8" class="theateinfo">
            <h1>{{item.name}}</h1>
            <div >导演:{{item.director}}</div>
            <div>主演:{{item.actors}}</div>
            <div>类型:{{item.type}}</div>
            <div>国家/地区:{{item.country}}</div>
            <div>季数:{{item.season}}</div>
            <div>总集数:{{item.number}}</div>
            <div>剧情简介:{{item.desc}}</div>
          </el-col>
        </el-row>
        <el-row>
          <h2>在线播放资源</h2>
          <div>
            <el-tabs v-model="activeName"  type="border-card">
              <el-tab-pane label="第一季" name="first">
                <el-table

                        :data="tableData"
                        style="width: 100%">
                  <el-table-column
                          prop="date"
                          label="日期"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="name"
                          label="姓名"
                          width="180">
                  </el-table-column>
                  <el-table-column
                          prop="address"
                          label="地址">
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="第二季" name="second">第二季</el-tab-pane>
            </el-tabs>
          </div>
        </el-row>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">2</div></el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
      name:"about",
      props:['item'],
      data(){
          return{
              activeName:'first',
              tableData: [{
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
              }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
              }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
              }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
              }]
          }
      },
      created(){
          window.console.log(this)
      }
  }
</script>
<style scoped>
  .theateinfo /deep/ div{
   margin-bottom: 20px;
  }
</style>
