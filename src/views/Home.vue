<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in result" :key="item.value" class="image">
        <img  :src="item.imageUrl" alt=""  @click="goDetail(item)">
        <span>{{item.name}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'home',
    data(){
      return{
          result:[]
      }
    },
  computed: {
      json(){
          return this.$store.state.json;
      }
  },
  created:function () {
      this.getTheate()
  },
  methods: {
      getJson(){
          this.$store.dispatch("getJson");
      },

      getTheate(){
          this.$http.get('http://127.0.0.1:4000/api/nc/theate/all').then(res=>{
             this.result = res.data.req;
             window.console.log(res.data.req)
          })
      },
      goDetail(item){
          this.$router.push({name:'about',params: {item:item}})
      }
  }
}
</script>
<style scoped>
   .image img{
    width:100%;
    height:100%;
  }
</style>