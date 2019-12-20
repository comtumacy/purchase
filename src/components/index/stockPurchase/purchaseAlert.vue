<template>
    <div class="purchaseAlert" v-bind:style="{'top': (height / 2) + 'px', 'left': (width / 2) + 'px'}" v-loading="loading">
      <i>请输入进货商品信息</i>
      <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-form-inline">
        <el-form-item label="商品编号：" prop="serialNumber">
          <el-input v-model="ruleForm.serialNumber" placeholder="请输入商品编号"></el-input>
        </el-form-item>
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌：" prop="brand">
          <el-input v-model="ruleForm.brand" placeholder="请输入商品品牌"></el-input>
        </el-form-item>
        <el-form-item label="商品尺寸：" prop="size">
          <el-input v-model="ruleForm.size" placeholder="请输入商品尺寸"></el-input>
        </el-form-item>
        <el-form-item label="商品数量：" prop="number">
          <el-input v-model="ruleForm.number" placeholder="请输入商品数量"></el-input>
        </el-form-item>
        <el-form-item label="商品原价：" prop="originalPrice">
          <el-input v-model="ruleForm.originalPrice" placeholder="请输入商品原价"></el-input>
        </el-form-item>
        <el-form-item label="商品售价：" prop="price">
          <el-input v-model="ruleForm.price" placeholder="请输入商品售价"></el-input>
        </el-form-item>
        <el-form-item label="存储仓库：" prop="place">
          <el-input v-model="ruleForm.place" placeholder="请输入存储仓库"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button class="button1" type="success" v-on:click="onSubmit('ruleForm')" v-bind:style="{'width': '220px'}">添加</el-button>
          <el-button class="button2" type="info" v-on:click="$emit('closeAndEdit')" v-bind:style="{'width': '220px'}">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'purchaseAlert',
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
        name: '',
        brand: '',
        size: '',
        number: '',
        originalPrice: '',
        price: '',
        place: ''
      },
      rules: {
        serialNumber: [
          { required: true, message: '请输入商品编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入商品品牌', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入商品尺寸', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        originalPrice: [
          { required: true, message: '请输入商品原价', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品售价', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '请输入存储仓库', trigger: 'blur' }
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
            url: '/v1/product',
            auth: {
              username: this.$store.getters.token_getters,
              password: ''
            },
            data: {
              'serialNumber': this.ruleForm.serialNumber,
              'name': this.ruleForm.name,
              'brand': this.ruleForm.brand,
              'size': this.ruleForm.size,
              'number': this.ruleForm.number,
              'originalPrice': this.ruleForm.originalPrice,
              'price': this.ruleForm.price,
              'place': this.ruleForm.place
            }
          }).then(res => {
            if (res.status === 201) {
              this.loading = false
              this.$message.success('商品进货成功')
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
      if (this.contentHeight < 620) {
        height = 0
      } else {
        height = this.contentHeight - 620
      }
      this.height = height
    }
  },
  mounted () {},
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  }
}
</script>

<style lang="stylus">
.purchaseAlert
  position absolute
  padding 10px 0 0 20px
  width 570px
  height 630px
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
      margin-left 20px
</style>
