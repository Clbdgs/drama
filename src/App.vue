<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
          <el-menu-item index="2">美剧</el-menu-item>
          <el-menu-item index="3">日剧</el-menu-item>
          <el-menu-item index="4">TVB</el-menu-item>
          <el-menu-item index="5"><router-link to="/manage">管理</router-link></el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',

            };
        },
        methods: {
            handleSelect(key, keyPath) {
                window.console.log(key, keyPath);
            }
        }
    }
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
