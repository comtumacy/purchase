<template>
    <div class="index">
      <div class="indexMenu">
        <el-menu
          :default-active=active
          class="menu"
          @select="selectMenu"
          background-color="#545c64"
          active-text-color="rgb(115,199,248)"
          text-color="rgb(184,192,201)"
          v-bind:style="{'height': heightNow + 'px'}">
          <el-row class="menuLogo">
            <el-col>
              <img :src="getLogo()" alt="" class="logoJpg">
            </el-col>
          </el-row>
          <el-menu-item index="indexChildSign">
            <i class="icon-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="stockSign">
            <i class="icon-database"></i>
            <span slot="title">库存</span>
          </el-menu-item>
          <el-menu-item index="stockPurchaseSign">
            <i class="icon-folder-download"></i>
            <span slot="title">进货</span>
          </el-menu-item>
          <el-menu-item index="saleSign">
            <i class="icon-folder-upload"></i>
            <span slot="title">销售</span>
          </el-menu-item>
          <el-menu-item index="returnGoodSign">
            <i class="icon-sad"></i>
            <span slot="title">退货</span>
          </el-menu-item>
          <el-menu-item index="profitSign">
            <i class="icon-coin-yen"></i>
            <span slot="title">收支</span>
          </el-menu-item>
          <el-menu-item index="adminSign">
            <i class="icon-users"></i>
            <span slot="title">用户</span>
          </el-menu-item>
        </el-menu>
      </div>
      <indexHeaders
        v-bind:widthNow="widthNow"
        @searchSentSelect="searchGetSelect"
        @searchSentInput="searchGetInput">
      </indexHeaders>
      <div class="content" v-bind:style="{'width': contentWidth + 'px'}">
        <Tabs
          type="card"
          closable
          :animated="false"
          :value="tabValue"
          @on-tab-remove="handleTabRemove">
          <TabPane label="首页" v-if="indexChildSign" name="indexChildSign" v-bind:style="{'height': contentHeight + 'px'}">
            <indexChild
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></indexChild>
          </TabPane>
          <TabPane label="库存" v-if="stockSign" name="stockSign" v-bind:style="{'height': contentHeight + 'px'}">
            <stock
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"
              v-bind:searchSelect="searchSelect"
              v-bind:searchInput="searchInput"></stock>
          </TabPane>
          <TabPane label="进货" v-if="stockPurchaseSign" name="stockPurchaseSign" v-bind:style="{'height': contentHeight + 'px'}">
            <stockPurchase
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"
              v-bind:searchSelect="searchSelect"
              v-bind:searchInput="searchInput"></stockPurchase>
          </TabPane>
          <TabPane label="销售" v-if="saleSign" name="saleSign" v-bind:style="{'height': contentHeight + 'px'}">
            <sale
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"
              v-bind:searchSelect="searchSelect"
              v-bind:searchInput="searchInput"></sale>
          </TabPane>
          <TabPane label="退货" v-if="returnGoodSign" name="returnGoodSign" v-bind:style="{'height': contentHeight + 'px'}">
            <returnGood
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"
              v-bind:searchSelect="searchSelect"
              v-bind:searchInput="searchInput"></returnGood>
          </TabPane>
          <TabPane label="收支" v-if="profitSign" name="profitSign" v-bind:style="{'height': contentHeight + 'px'}">
            <profit
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"></profit>
          </TabPane>
          <TabPane label="用户" v-if="adminSign" name="adminSign" v-bind:style="{'height': contentHeight + 'px'}">
            <admin
              v-bind:contentWidth="contentWidth"
              v-bind:contentHeight="contentHeight"
              v-bind:widthNow="widthNow"
              v-bind:heightNow="heightNow"
              v-bind:searchSelect="searchSelect"
              v-bind:searchInput="searchInput"></admin>
          </TabPane>
        </Tabs>
      </div>
    </div>
</template>

<script>
import indexHeaders from './indexHeaders/indexHeaders'
import indexChild from './indexChild/indexChild'
import stock from './stock/stock'
import stockPurchase from './stockPurchase/stockPurchase'
import sale from './sale/sale'
import returnGood from './returnGood/returnGood'
import profit from './profit/profit'
import admin from './admin/admin'
export default {
  name: 'index',
  components: {
    indexHeaders,
    indexChild,
    stock,
    stockPurchase,
    sale,
    returnGood,
    profit,
    admin
  },
  props: [],
  created () {
    this.getLength()
  },
  data () {
    return {
      active: '0',
      widthNow: 0,
      heightNow: 0,
      contentWidth: 0,
      contentHeight: 0,
      searchSelect: '',
      searchInput: '',
      loading: false,
      tabValue: 'indexChildSign',
      indexChildSign: true,
      stockSign: false,
      stockPurchaseSign: false,
      saleSign: false,
      returnGoodSign: false,
      profitSign: false,
      adminSign: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    getLength () {
      let widthNow = document.documentElement.clientWidth
      let heightNow = document.documentElement.clientHeight
      this.widthNow = widthNow
      this.heightNow = heightNow
      if (widthNow < 130) {
        this.contentWidth = 0
      } else {
        this.contentWidth = widthNow - 130
      }
      if (heightNow < 112) {
        this.contentHeight = 0
      } else {
        this.contentHeight = heightNow - 112
      }
    },
    selectMenu (index) {
      this.tabValue = index
      if (index === 'indexChildSign') {
        this.indexChildSign = true
      } else if (index === 'stockSign') {
        this.stockSign = true
      } else if (index === 'stockPurchaseSign') {
        this.stockPurchaseSign = true
      } else if (index === 'saleSign') {
        this.saleSign = true
      } else if (index === 'returnGoodSign') {
        this.returnGoodSign = true
      } else if (index === 'profitSign') {
        this.profitSign = true
      } else if (index === 'adminSign') {
        if (this.$store.getters.isSuper_getters === 1) {
          this.$alert('抱歉，管理员才能进入用户管理页面', '提示', {
            confirmButtonText: '确定',
            callback: () => {
            }
          })
        } else {
          this.adminSign = true
        }
      }
    },
    getLogo () {
      return require('../login/logo.jpg')
    },
    handleTabRemove (index) {
      if (index === 'indexChildSign') {
        this.indexChildSign = false
      } else if (index === 'stockSign') {
        this.stockSign = false
      } else if (index === 'stockPurchaseSign') {
        this.stockPurchaseSign = false
      } else if (index === 'saleSign') {
        this.saleSign = false
      } else if (index === 'returnGoodSign') {
        this.returnGoodSign = false
      } else if (index === 'profitSign') {
        this.profitSign = false
      } else if (index === 'adminSign') {
        this.adminSign = false
      }
    },
    searchGetSelect (val) {
      this.searchSelect = val
      if (val === '库存') {
        this.selectMenu('stockSign')
      } else if (val === '进货') {
        this.selectMenu('stockPurchaseSign')
      } else if (val === '销售') {
        this.selectMenu('saleSign')
      } else if (val === '退货') {
        this.selectMenu('profitSign')
      } else if (val === '用户') {
        this.selectMenu('adminSign')
      }
    },
    searchGetInput (val) {
      this.searchInput = val
    }
  },
  mounted () {
    window.onresize = () => {
      this.getLength()
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
.index
  top 0
  left 0
  right 0
  bottom 0
  .indexMenu
    position absolute
    top 0
    left 0
    width 130px
    .el-menu-item
      height 70px
      font-size 20px
      > i
        margin-right 10px
    .menu
      .menuLogo
        height 80px
        font-size 20px
        .el-col
          width auto
          .logoJpg
            margin-top 20px
            margin-left 38px
            font-size 30px
            width 50px
            height 50px
  .content
    position absolute
    left 130px
    top 80px
    .ivu-tabs
      .ivu-tabs-bar
        margin-bottom 0
        background-color rgb(226,226,226)
</style>
