<template>
    <div class="register" v-bind:style="{'left': registerWidth + 'px', 'top': registerHeight + 'px'}">
      <i>账&nbsp;号&nbsp;注&nbsp;册</i>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-row>
          <el-form-item label="邮箱：" prop="account">
            <el-input
              v-model="ruleForm.account"
              placeholder="请输入邮箱"
              v-bind:style="{'width': '250px'}">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="密码：" prop="secret">
            <el-input
              v-model="ruleForm.secret"
              placeholder="请输入密码"
              v-bind:style="{'width': '250px'}">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="昵称：" prop="nickname">
            <el-input
              v-model="ruleForm.nickname"
              placeholder="请输入昵称"
              v-bind:style="{'width': '250px'}">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="电话：" prop="hone">
            <el-input
              v-model="ruleForm.hone"
              placeholder="请输入电话"
              v-bind:style="{'width': '250px'}">
            </el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button class="button1" type="success" v-on:click="onSubmit('ruleForm')">添加</el-button>
            <el-button class="button2" type="info" v-on:click="$emit('closeRegister')">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'register',
  components: {},
  props: ['registerWidth', 'registerHeight'],
  created () {
  },
  data () {
    return {
      ruleForm: {
        account: '',
        secret: '',
        nickname: '',
        hone: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 22, message: '长度在 2 到 22 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        hone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/v1/user',
            data: {
              'account': this.ruleForm.account,
              'secret': this.ruleForm.secret,
              'nickname': this.ruleForm.nickname,
              'hone': this.ruleForm.hone
            }
          })
            .then(res => {
              console.log(res)
              if (res.status === 201) {
                this.$message.success('登录成功，即将返回主页')
                // this.$store.dispatch('token_actions', res.headers.token)
                // this.$store.dispatch('username_actions', res.headers.username)
                // setTimeout(() => {
                //   this.$router.push('/')
                // }, 1000)
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
          console.log(this.ruleForm.content)
        } else {
          setTimeout(() => {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }, 200)
        }
      })
    }
  },
  mounted () {
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
.register
  position absolute
  padding-top 10px
  width 440px
  background-color white
  border-radius 20px
  box-shadow: 5px 5px 10px rgba(0,0,0,0.6)
  > i
    margin-left 150px
    font-size 28px
    font-family "Microsoft YaHei"
    font-style initial
  .demo-form-inline
    margin-top 20px
    margin-left 50px
    .el-row
      .el-form-item
        .el-form-item__content
          .button1:hover
            background-color rgb(19,121,195)
            transition all 0.4s
          .button1:active
            background-color rgb(0,40,146)
            transition all 0.4s
          .button1
            margin-left 24px
            width 140px
            background-color rgb(0,40,146)
            border-color white
          .button2
            width 140px
</style>
