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
        v-model="form.content"
        @image-added="headleImgAdd"
        :useCustomImageHandler="true"></vue-editor>
    </div>
  </el-form-item>
   <el-form-item label="栏目">
    <el-checkbox style="margin:5px;"
     :label="item.name"
     border v-for="(item) in categories" :key="item.id"
     @change="headleCheckedChange(item.id)"></el-checkbox>
  </el-form-item>
  <el-form-item label="封面">
    <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
    <el-form-item label="类型">
      <el-radio v-model="radio" label="1">图片</el-radio>
    <el-radio v-model="radio" label="2">视频</el-radio>
  </el-form-item>
    <el-button type="success" round class="button" @click="sendPost">发布文章</el-button>
  </el-form>
    </div>
  </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { uploadFile } from '@/myapi/upload.js'
import { getCategoriesList, sendPosts } from '@/myapi/api.js'
export default {

  components: { VueEditor },
  data () {
    return {

      form: {
        title: '',
        content: '',
        // 栏目所需要的id
        categoriesId: []
        // 图片地址

      },
      // 获取栏目
      categories: [],
      // 图片封面id集合
      coverId: [],
      imageUrl: '',
      radio: '1'
    }
  },
  mounted () {
    getCategoriesList()
      .then(res => {
        this.categories = res.data.data.splice(2)
        console.log(this.categories)
      })
  },
  methods: {
    // 栏目多选
    headleCheckedChange (id) {
      const index = this.form.categoriesId.indexOf(id)
      if (index !== -1) {
        this.form.categoriesId.splice(index, 1)
      } else {
        this.form.categoriesId.push(id)
      }
      console.log(this.form.categoriesId)
    },
    // 富文本框上传图片
    headleImgAdd (file, Editor, cursorLocation) {
      console.log(file, Editor, cursorLocation)
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      const fromdata = new FormData()
      fromdata.append('file', file.raw)
      this.imageUrl = URL.createObjectURL(file.raw)
      uploadFile(fromdata)
        .then(res1 => {
          console.log(res1)
          if (res1.data.message === '文件上传成功') {
            this.coverId.push({ id: res1.data.data.id })
            console.log(this.coverId)
          }
        })
    },
    // 点击发布文章按钮
    async sendPost () {
      console.log(this.form.title, this.form.content)
      const data = {
        title: this.form.title,
        content: this.form.content,
        categories: this.form.categoriesId,
        cover: this.coverId,
        type: this.radio
      }
      const res = await sendPosts(data)
      console.log(res)
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
