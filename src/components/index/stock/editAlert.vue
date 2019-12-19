<template>
    <div class="editAlert" v-bind:style="{'top': (height / 2) + 'px', 'left': (width / 2) + 'px'}" v-loading="loading">
      <i>请输入需要修改的价格内容</i>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="价格内容：" prop="content">
          <el-input v-model="ruleForm.content" placeholder="请输入商品的价格进行修改"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button1" type="success" v-on:click="onSubmit('ruleForm')">修改</el-button>
          <el-button class="button2" type="info" v-on:click="$emit('closeAndEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'editAlert',
  components: {},
  props: ['contentWidth', 'contentHeight', 'editContent'],
  created () {
    this.getLength()
  },
  data () {
    return {
      loading: false,
      ruleForm: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入需要修改的价格内容', trigger: 'blur' }
        ]
      },
      width: 0,
      height: 0
    }
  },
  computed: {},
  watch: {
    contentWidth () {
      this.getLength()
    },
    contentHeight () {
      this.getLength()
    }
  },
  methods: {
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid, field) => {
        if (valid) {
          this.loading = true
          this.$axios({
            method: 'post',
            url: '/v1/stock/changePrice',
            auth: {
              username: this.$store.getters.token_getters,
              password: ''
            },
            data: {
              'price': this.ruleForm.content,
              'serialNumber': this.editContent
            }
          }).then(res => {
            if (res.status === 201) {
              this.loading = false
              this.$message.success('修改成功')
              this.$emit('closeAndEditSucceed')
            }
          })
        } else {
          setTimeout(() => {
            if (field.content) {
              this.$message.error(field.content[0].message)
            }
          }, 200)
          return false
        }
      })
    },
    getLength () {
      let width
      if (this.contentWidth < 680) {
        width = 0
      } else {
        width = this.contentWidth - 680
      }
      this.width = width
      let height
      if (this.contentHeight < 120) {
        height = 0
      } else {
        height = this.contentHeight - 120
      }
      this.height = height
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
.editAlert
  position absolute
  padding 10px 0 0 20px
  width 700px
  height 130px
  background-color rgb(249,249,251)
  border-radius 20px
  z-index 120
  box-shadow: 5px 5px 10px #888888
  > i
    position absolute
    left 240px
    padding 0 0 10px 0
    font-size 20px
    font-style normal
  .el-form
    position absolute
    top 60px
    margin 0 20px 0 20px
    .el-form-item__content
      .el-input
        width 375px
</style>
