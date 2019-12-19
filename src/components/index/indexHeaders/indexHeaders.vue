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
          <span class="user" v-bind:style="{'left': userLeft + 'px'}">欢迎：{{ getUser() }}</span>
        </el-col>
        <el-col>
          <el-button class="button" type="danger" size="small" v-on:click="outLogin()" v-bind:style="{'left': buttonLeft + 'px'}">退出登录</el-button>
        </el-col>
      </el-row>
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
      buttonLeft: 0
    }
  },
  computed: {},
  watch: {
    widthNow () {
      this.selectWidthSet()
      this.userWidthSet()
      this.buttonWidthSet()
    }
  },
  methods: {
    search () {},
    getUser () {
      return this.$store.getters.username_getters
    },
    outLogin () {
      this.$store.dispatch('token_actions', 'null')
      this.$router.push('/login')
    },
    selectWidthSet () {
      if (this.widthNow < 1715) {
        this.selectLeft = 350
      } else {
        this.selectLeft = 0.4687 * this.widthNow
      }
    },
    userWidthSet () {
      if (this.widthNow < 1715) {
        this.userLeft = 900
      } else {
        this.userLeft = 0.7873 * this.widthNow
      }
    },
    buttonWidthSet () {
      if (this.widthNow < 1715) {
        this.buttonLeft = 1050
      } else {
        this.buttonLeft = 0.8776 * this.widthNow
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
</style>
