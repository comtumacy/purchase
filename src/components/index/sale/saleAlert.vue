<template>
    <div class="saleAlert" v-bind:style="{'top': (height / 2) + 'px', 'left': (width / 2) + 'px'}" v-loading="loading">
      <i>请输入销售商品信息</i>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="商品编号：" prop="serialNumber">
          <el-input v-model="ruleForm.serialNumber" placeholder="请输入商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品数量：" prop="number">
          <el-input v-model="ruleForm.number" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button class="button1" type="success" v-on:click="onSubmit('ruleForm')" v-bind:style="{'width': '180px'}">销售</el-button>
          <el-button class="button2" type="info" v-on:click="$emit('closeAndSale')" v-bind:style="{'width': '180px'}">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'saleAlert',
  components: {},
  props: ['contentWidth', 'contentHeight'],
  created () {
    this.getLength()
  },
  data () {
    return {
      loading: false,
      ruleForm: {
        serialNumber: '',
        number: ''
      },
      rules: {
        serialNumber: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      },
      width: 0,
      height: 0
    }
  },
  computed: {},
  watch: {
    // 动态控制元素位置
    contentWidth () {
      this.getLength()
    },
    contentHeight () {
      this.getLength()
    }
  },
  methods: {
    // 提交按钮事件
    onSubmit (ruleForm) {
      this.$refs[ruleForm].validate((valid, field) => {
        if (valid) {
          this.loading = true
          this.$axios({
            method: 'post',
            url: `/v1/product/${this.ruleForm.serialNumber}/${this.ruleForm.number}/sales`,
            auth: {
              username: this.$store.getters.token_getters,
              password: ''
            },
            data: {
              'serialNumber': this.ruleForm.serialNumber,
              'number': this.ruleForm.number
            }
          }).then(res => {
            this.loading = false
            this.$emit('closeAndSaleSucceed')
            if (res.status === 201) {
              if (res.data.error_code === 0) {
                this.$message.success('商品销售成功')
              }
            } else if (res.status === 4002) {
              this.$message.error('商品库存不足')
            } else {
              this.$message.error('商品编号不存在')
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
    // 动态布局
    getLength () {
      let width
      if (this.contentWidth < 580) {
        width = 0
      } else {
        width = this.contentWidth - 580
      }
      this.width = width
      let height
      if (this.contentHeight < 300) {
        height = 0
      } else {
        height = this.contentHeight - 300
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
.saleAlert
  position absolute
  padding 10px 0 0 20px
  width 570px
  height 250px
  background-color rgb(249,249,251)
  border-radius 20px
  z-index 120
  box-shadow: 5px 5px 10px #888888
  > i
    position absolute
    left 200px
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
    .button
      display block
      margin-left 90px
</style>
