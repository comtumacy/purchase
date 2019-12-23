<template>
    <div class="login">
      <div v-bind:class="{'loginBackgroundOpacity': registerSign === true, 'loginBack': true}">
        <img :src="getLoginJpg()" alt="" class="getLoginJpg">
        <img :src="getLogo()" alt="" class="getLogo">
        <div class="loginRegister">
          <el-row v-on:click.native="openRegister()">
            <el-col>
              <i class="icon-user-plus"></i>
              <span>立即注册</span>
            </el-col>
          </el-row>
        </div>
        <span class="loginTitle">进&nbsp;销&nbsp;存&nbsp;管&nbsp;理&nbsp;系&nbsp;统</span>
        <div class="loginBackground">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-bind:style="{'margin-top': '20px'}">
            <el-form-item label="邮箱" prop="account">
              <el-input v-model="ruleForm.account" v-bind:style="{'width': '250px'}"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="secret">
              <el-input v-model="ruleForm.secret" show-password v-bind:style="{'width': '250px'}"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-row>
                <el-col :span="12">
                  <el-input v-model="ruleForm.captcha" id="captchaInput"></el-input>
                </el-col>
                <el-col :span="12">
                  <img id="registerVerificationCodeImg" v-bind:src="'data:image/png;base64,' + captchaImg" v-on:click="refreshCaptchaImg()">
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <el-row>
            <el-button class="loginButton" type="success" v-on:click="submitForm()">登 录</el-button>
          </el-row>
        </div>
      </div>
      <transition :duration="{enter:800,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <register
          v-show="registerSign"
          v-bind:registerWidth="registerWidth"
          v-bind:registerHeight="registerHeight"
          @closeRegister="closeRegister">
        </register>
      </transition>
    </div>
</template>

<script>
import register from '../register/register'
export default {
  name: 'login',
  components: {
    register
  },
  props: [],
  created () {
    this.getLength()
    this.getCaptchaImg()
  },
  data () {
    return {
      widthNow: 0,
      heightNow: 0,
      registerWidth: 0,
      registerHeight: 0,
      captchaImg: '',
      ctoken: '',
      ruleForm: {
        account: '',
        secret: '',
        captcha: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码应为 4 个字符', trigger: 'blur' }
        ]
      },
      registerSign: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取验证码
    getCaptchaImg () {
      this.$axios({
        method: 'post',
        url: 'http://139.155.33.105/goodsApi/user/verification_code'
      }).then(res => {
        this.ctoken = res.headers.ctoken
        this.captchaImg = res.data.base64
      }).catch(() => {
        this.$message.error('获取验证码图片失败，请检查你的网络连接')
      })
    },
    // 刷新验证码
    refreshCaptchaImg () {
      this.getCaptchaImg()
      setTimeout(() => {
        this.$message.info('刷新验证码')
      }, 1000)
    },
    // 动态布局
    getLength () {
      let widthNow = document.documentElement.clientWidth
      let heightNow = document.documentElement.clientHeight
      this.widthNow = widthNow
      this.heightNow = heightNow
      let width
      if (widthNow > 440) {
        width = (widthNow / 2) - 220
        this.registerWidth = width
      } else {
        this.registerWidth = width
      }
      let height
      if (heightNow > 200) {
        height = (heightNow / 2) - 200
        this.registerHeight = height
      } else {
        this.registerHeight = height
      }
    },
    // 获取主页背景图片
    getLoginJpg () {
      return require('./login.jpg')
    },
    // 获取LOGO图片
    getLogo () {
      return require('./logo.jpg')
    },
    // 提交按钮事件
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/v1/user/token',
            data: {
              'account': this.ruleForm.account,
              'secret': this.ruleForm.secret
            }
          })
            .then(res => {
              if (res.status === 201) {
                this.$message.success('登录成功，即将进入系统')
                this.$store.dispatch('token_actions', res.data.token)
                this.$store.dispatch('account_actions', this.ruleForm.account)
                // console.log(res.data.token)
                this.$store.dispatch('username_actions', res.data.nickname)
                this.$store.dispatch('isSuper_actions', res.data.auth)
                setTimeout(() => {
                  this.$router.push('/index')
                }, 1000)
              } else if (res.status === 400) {
                if (res.data.msg.account) {
                  this.$message.error(res.data.msg.account[0])
                } else {
                  this.$message.error('密码错误')
                }
              } else {
                this.$message.error('密码错误')
              }
            })
        } else {
          this.$message.error('输入错误，请再次检查您输入的内容')
        }
      })
    },
    // 打开注册框
    openRegister () {
      this.registerSign = true
    },
    // 关闭注册框
    closeRegister () {
      this.registerSign = false
    }
  },
  mounted () {
    window.onresize = () => {
      this.getLength()
    }
    document.onkeydown = () => {
      let _key = window.event.keyCode
      if (_key === 13) {
        this.submitForm()
      }
    }
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}
</script>

<style lang="stylus">
.login
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  overflow hidden
  .loginBackgroundOpacity
    opacity: 0.5
    transition all 0.8s
  .loginBack
    .getLogo
      position absolute
      top 20px
      left 20px
      width 80px
      height 80px
    .loginRegister
      position absolute
      top 20px
      right 30px
      color white
      cursor pointer
      .icon-user-plus
        margin-right 5px
    .loginTitle
      position absolute
      top 230px
      right 380px
      color white
      font-size 32px
      font-family "Microsoft YaHei"
    .loginBackground
      position absolute
      margin-top 20px
      top 300px
      right 300px
      width 430px
      border-radius 20px
      background-color rgba(255,255,255,1)
      box-shadow: 5px 5px 10px rgba(0,0,0,0.6)
      .demo-ruleForm
        width 200px
      .loginButton:hover
        background-color rgb(19,121,195)
        transition all 0.4s
      .loginButton:active
        background-color rgb(0,40,146)
        transition all 0.4s
      .loginButton
        margin-left 100px
        margin-bottom 20px
        width 250px
        background-color rgb(0,40,146)
        border-color white
      #captchaInput
        width 120px
      #registerVerificationCodeImg
        margin-left 80px
        left 50px
        width 120px
        height 36px
        border-radius 10px
</style>
