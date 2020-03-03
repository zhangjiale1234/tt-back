<template>
  <div class="login">
    <div class="container">
      <img
        src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1583131273&di=9f75b96b1da8f7c17a165bf6f1528422&src=http://a3.att.hudong.com/68/61/300000839764127060614318218_950.jpg"
        alt
        class="avatar"
      />
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="number">
          <el-input
            type="text"
            v-model="ruleForm.number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/myapi/api.js'
export default {
  data () {
    return {
      ruleForm: {
        number: 'le123',
        pass: '1234'
      }
    }
  },
  methods: {
    async  submitForm () {
      if (this.ruleForm.number.trim() === '' || this.ruleForm.pass.trim() === '') {
        this.$message('请输入正确的账号或密码')
      } else {
        // 收集账号密码
        const data = {
          username: this.ruleForm.number,
          password: this.ruleForm.pass
        }
        const res = await login(data)
        console.log(res)
        if (res.data.statusCode !== 200 && res.data.message !== '登录成功') {
          this.$message(res.data.message)
        } else {
          localStorage.setItem('token', res.data.data.token)
          this.$message({
            message: '登陆成功,正在跳转请稍后',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push({ name: 'Index' })
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
