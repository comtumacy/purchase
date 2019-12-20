<template>
    <div class="adminAlert" v-bind:style="{'top': (height / 2) + 'px', 'left': (width / 2) + 'px'}" v-loading="loading">
      <i>请选择你需要执行的操作</i>
      <el-button class="button" id="button1" type="danger" v-on:click="onSubmit('封禁')">封禁</el-button>
      <el-button class="button" id="button2" type="success" v-on:click="onSubmit('解封')">解封</el-button>
      <el-button class="button" id="button3" type="info" v-on:click="$emit('closeAndEdit')">取消</el-button>
    </div>
</template>

<script>
export default {
  name: 'adminAlert',
  components: {},
  props: ['contentWidth', 'contentHeight', 'editContent'],
  created () {
    this.getLength()
  },
  data () {
    return {
      loading: false
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
    onSubmit (val) {
      if (val === '封禁') {
        this.$axios({
          method: 'post',
          url: `/v1/admin/deleteUsers/${this.editContent}`,
          auth: {
            username: this.$store.getters.token_getters,
            password: ''
          }
        }).then(res => {
          this.$emit('closeAndEditSucceed')
          if (res.data.error_code === 0) {
            this.$message.success('封禁成功')
          }
        })
      } else {
        this.$axios({
          method: 'post',
          url: `/v1/admin/relieveUsers/${this.editContent}`,
          auth: {
            username: this.$store.getters.token_getters,
            password: ''
          }
        }).then(res => {
          this.$emit('closeAndEditSucceed')
          if (res.data.error_code === 0) {
            this.$message.success('解封成功')
          }
        })
      }
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
.adminAlert
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
  .button
    position relative
    top 50px
    left 100px
    width 150px
  #button1
    margin-left -20px
    margin-right 20px
  #button2
    margin-right 20px
</style>
