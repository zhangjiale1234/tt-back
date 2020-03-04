<template>
  <div class="addPost">
      <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="">新增文章</a></el-breadcrumb-item>
</el-breadcrumb>
  <div class="main">
    <div class="title">
      <el-form ref="form" :model="form" label-width="80px" >
  <el-form-item label="标题">
    <el-input v-model="form.title" width="200px"></el-input>
  </el-form-item>
   <el-form-item label="内容">
      <div id="editor">
       <vue-editor
        v-model="content" :editorToolbar="customToolbar"
        @image-added="headleImgAdd"
        :useCustomImageHandler="true"></vue-editor>
    </div>
  </el-form-item>
   <el-form-item label="栏目">
    <el-checkbox v-model="checked1" label="娱乐" border></el-checkbox>
    <el-checkbox v-model="checked2" label="新闻" border></el-checkbox>
    <el-checkbox v-model="checked3" label="餐饮" border></el-checkbox>
    <el-checkbox v-model="checked4" label="明星" border></el-checkbox>
  </el-form-item>
  <el-form-item label="封面">
    <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
    <el-form-item label="类型">
      <el-radio v-model="radio" label="1">图片</el-radio>
  <el-radio v-model="radio" label="2">视频</el-radio>
  </el-form-item>
    <el-button type="success" round class="button">发布文章</el-button>
  </el-form>
    </div>
  </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {

  components: { VueEditor },
  data () {
    return {
      form: {
        title: '',
        content: false,
        checked1: false,
        checked2: false
        // 图片地址

      },
      imageUrl: '',
      radio: '1'
    }
  },
  mounted () {

  },
  methods: {
    // 富文本框上传图片
    headleImgAdd (file, Editor, cursorLocation) {
      console.log(file, Editor, cursorLocation)
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

  }
}
</script>

<style scoped lang = 'less'>
.title{
  width: 600px;
  margin: 20px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px solid #ccc;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    margin: 0 auto;
  }
</style>
