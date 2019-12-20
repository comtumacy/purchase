<template>
    <div class="indexHeaders">
      <el-row>
        <el-col class="title">
          <span>进销存管理系统--李鹏</span>
        </el-col>
        <el-col class="select" v-bind:style="{'left': selectLeft + 'px'}">
          <el-input placeholder="请输入所需要搜索的内容" v-model="input" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="类型">
              <el-option label="库存" value="库存"></el-option>
              <el-option label="销量" value="销量"></el-option>
              <el-option label="进货" value="进货"></el-option>
              <el-option label="退货" value="退货"></el-option>
              <el-option label="用户" value="用户"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" v-bind:style="{'padding': '9px 17px 9px 17px'}" v-on:click="search()"></el-button>
          </el-input>
        </el-col>
        <el-col>
          <el-popover
            placement="bottom"
            title="用户编辑"
            width="200"
            trigger="hover"
            content="修改用户的昵称及密码"
            class="popover"
            v-on:click.native="dialogVisible = true">
            <span class="user" v-bind:style="{'left': userLeft + 'px'}" slot="reference" >欢迎：{{ getUser() }}</span>
          </el-popover>
        </el-col>
        <el-col>
          <el-button class="button" type="danger" size="small" v-on:click="outLogin()" v-bind:style="{'left': buttonLeft + 'px'}">退出登录</el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="用户信息修改提示"
        :visible.sync="dialogVisible"
        modal
        width="30%"
        height="20%">
        <span slot="footer" class="dialog-footer">
          <el-button type="success" v-on:click="changeDrawerTitle(1)">修改昵称</el-button>
          <el-button type="primary" v-on:click="changeDrawerTitle(2)">修改密码</el-button>
          <el-button v-on:click="dialogVisible = false">取消修改</el-button>
        </span>
      </el-dialog>
      <el-drawer
        :title="drawerTitle"
        :visible.sync="drawerSign"
        direction="rtl"
        size="20%">
        <el-form
          :inline="true"
          :model="ruleForm1"
          :rules="rules1"
          ref="ruleForm1"
          class="demo-form-inline"
          v-if="ruleFromSign === 1"
          v-bind:style="{'margin-left': '30px'}">
          <el-row>
            <el-form-item label="昵称：" prop="name">
              <el-input
                v-model="ruleForm1.name"
                placeholder="请输入昵称"
                v-bind:style="{'width': '250px'}">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button class="button1" type="success" v-on:click="onSubmit1('ruleForm1')">修改</el-button>
              <el-button class="button2" type="info" v-on:click="drawerClose()">取消</el-button>
            </el-form-item>
          </el-row>
        </el-form>
        <el-form
          :inline="true"
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          class="demo-form-inline"
          v-if="ruleFromSign === 2"
          v-bind:style="{'margin-left': '40px'}">
          <el-row>
            <el-form-item label="新密码：" prop="password">
              <el-input
                v-model="ruleForm2.password"
                placeholder="请输入新密码"
                v-bind:style="{'width': '250px'}">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="验证码：" prop="code">
              <el-input
                v-model="ruleForm2.code"
                placeholder="请输入验证码"
                v-bind:style="{'width': '250px'}">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button class="button3" type="info" v-on:click="getCode()">获取验证码</el-button>
              <el-button class="button3" type="success" v-on:click="onSubmit2('ruleForm2')">修改</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-drawer>
    </div>
</template>

<script>
export default {
  name: 'indexHeaders',
  components: {},
  props: ['widthNow'],
  created () {
    this.selectWidthSet()
    this.userWidthSet()
    this.buttonWidthSet()
  },
  data () {
    return {
      select: '',
      input: '',
      selectLeft: 0,
      userLeft: 0,
      buttonLeft: 0,
      dialogVisible: false,
      drawerSign: false,
      drawerTitle: '',
      ruleFromSign: 0,
      codeToken: '',
      ruleForm1: {
        name: ''
      },
      rules1: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ]
      },
      ruleForm2: {
        password: '',
        code: ''
      },
      rules2: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {
    // 监听当前宽度，动态控制三个组件的宽度
    widthNow () {
      this.selectWidthSet()
      this.userWidthSet()
      this.buttonWidthSet()
    }
  },
  methods: {
    // 全局搜索组件，往外父组件传值，父组件控制子页面打开，传搜索值进入子页面的子组件，并控制子页面的搜索函数进行搜索获取数据
    search () {
      if (this.select === '') {
        this.$message.error('请选择搜索类型')
      } else if (this.input === '') {
        this.$message.error('请输入搜索内容')
      } else {
        this.$emit('searchSentSelect', this.select)
        this.$emit('searchSentInput', this.input)
      }
    },
    // 从vuex获取昵称
    getUser () {
      return this.$store.getters.username_getters
    },
    // 退出登录，清空vuex的token
    outLogin () {
      this.$store.dispatch('token_actions', 'null')
      this.$router.push('/login')
    },
    // 动态控制宽度
    selectWidthSet () {
      if (this.widthNow < 1715) {
        this.selectLeft = 350
      } else {
        this.selectLeft = 0.4687 * this.widthNow
      }
    },
    // 动态控制宽度
    userWidthSet () {
      if (this.widthNow < 1715) {
        this.userLeft = 900
      } else {
        this.userLeft = 0.7873 * this.widthNow
      }
    },
    //
    buttonWidthSet () {
      if (this.widthNow < 1715) {
        this.buttonLeft = 1050
      } else {
        this.buttonLeft = 0.8776 * this.widthNow
      }
    },
    // 动态控制宽度
    changeDrawerTitle (val) {
      if (val === 1) {
        this.ruleFromSign = 1
        this.drawerTitle = '修改昵称'
      } else {
        this.ruleFromSign = 2
        this.drawerTitle = '修改密码'
      }
      this.dialogVisible = false
      this.drawerSign = true
    },
    // 关闭侧边框控制
    drawerClose () {
      this.drawerSign = false
    },
    // 更改昵称
    onSubmit1 (ruleForm1) {
      this.$refs[ruleForm1].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/v1/user/changeName',
            auth: {
              username: this.$store.getters.token_getters,
              password: ''
            },
            data: {
              'token': this.$store.getters.token_getters,
              'name': this.ruleForm1.name
            }
          })
            .then(res => {
              if (res.data.error_code === 0) {
                this.$alert('昵称修改成功，即将退出登录', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'success',
                      message: `请重新登录`
                    })
                    this.outLogin()
                  }
                })
              }
            })
        } else {
          setTimeout(() => {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }, 200)
        }
      })
    },
    // 更改密码
    onSubmit2 (ruleForm2) {
      this.$refs[ruleForm2].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: `/v1/user/changePassword/${this.codeToken}`,
            auth: {
              username: this.$store.getters.token_getters,
              password: ''
            },
            data: {
              'code': this.ruleForm2.code
            }
          })
            .then(res => {
              if (res.data.error_code === 0) {
                this.$alert('修改密码成功，即将退出登录', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'success',
                      message: `请重新登录`
                    })
                    this.outLogin()
                  }
                })
              } else if (res.data.error_code === 1001) {
                this.$message.error('验证码不正确')
              } else if (res.data.error_code === 1002) {
                this.$message.error('验证码过期')
              }
            })
        } else {
          setTimeout(() => {
            this.$message.error('输入错误，请再次检查您输入的内容')
          }, 200)
        }
      })
    },
    // 获取邮箱的验证码
    getCode () {
      if (this.ruleForm2.password === '') {
        this.$message.error('请输入新密码之后再获取验证码')
      } else {
        this.$axios({
          method: 'post',
          url: `/v1/user/validation`,
          auth: {
            username: this.$store.getters.token_getters,
            password: ''
          },
          data: {
            'account': this.$store.getters.account_getters,
            'password': this.ruleForm2.password
          }
        }).then(res => {
          this.$message.success('获取验证码成功')
          this.codeToken = res.data.token
        })
      }
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
.indexHeaders
  position absolute
  top 0
  left 130px
  right 0
  height 80px
  overflow hidden
  .title
    margin-top 25px
    margin-left 20px
    width auto
    font-size 24px
    font-family "Microsoft YaHei"
  .select
    position absolute
    top 20px
    width 500px
    .el-input-group__prepend
      .el-input__inner
        width 80px
  .popover
    cursor pointer
    .user
      position absolute
      top 22px
      width 150px
      font-size 20px
      font-family "Microsoft YaHei"
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
  .button
    position absolute
    top 20px
  .el-drawer__wrapper
    .el-drawer__container
      .el-drawer
        .el-drawer__header
          > span
            font-size 24px
        .el-drawer__body
          .el-form
            margin-top 40px
            .el-form-item
              .el-form-item__label
                padding 0
              .el-form-item__content
                margin-left 30px
                .el-button
                  margin-top 20px
                  width 130px
</style>
