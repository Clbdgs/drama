<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in result" :key="item.value">
        {{item.actors}}
      </el-col>
    </el-row>
    <button type="button" @click="getJson">从后端取json</button>
    <div>{{json}}</div>
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
             this.result =res.data.req;
             window.console.log(res.data.req)
          })
      }
  }
}
</script>
