<template>
  <div class="home">
      <el-container>
  <el-header class="header">
         <span class="icon-menu toggle-btn"></span>
            <span class="system-title">黑马头条后台管理系统</span>
            <div>
                <span  class="welcome">欢迎你:*** &nbsp;&nbsp;</span>
                <span>退出</span>
            </div>
  </el-header>
  <el-container>
    <el-aside width="200">
          <el-col :span="12">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#f00"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="addpost"><el-menu-item index="1-1">增添新文章</el-menu-item></router-link>
          <router-link to="editpost"><el-menu-item index="1-2">修改文章</el-menu-item></router-link>
        </el-menu-item-group>

      </el-submenu>
      <router-link to="usermanagement">
        <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      </router-link>

    </el-menu>
  </el-col>
    </el-aside>
    <el-container>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</el-container>

  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: white;
    margin-right: 10px;
  }
}
.el-menu-vertical-demo{
    width: 200px;
}
a{
  color: inherit;
  text-decoration: none;
}
</style>
