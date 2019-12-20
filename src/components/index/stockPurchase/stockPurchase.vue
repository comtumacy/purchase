<template>
  <div class="stockPurchase" v-loading="loading">
    <el-row class="stockPurchaseRow" v-bind:style="{'left': ((contentWidth - 140) / 2) + 'px'}">
      <el-col class="stockPurchaseCol1">
        <i class="icon-folder-download"></i>
      </el-col>
      <el-col class="stockPurchaseCol1">
        <span>进货管理</span>
      </el-col>
    </el-row>
    <el-table
      class="table"
      :data="data"
      border
      :style="{'width': contentWidth + 'px'}"
      :height="(parseInt(contentHeight) - 170)">
      <el-table-column
        prop="stockDeta"
        label="进货日期"
        width="250"
        header-align="center"
        align="center"
        :resizable="false"
        fixed>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        header-align="center"
        width="500"
        align="center"
        :resizable="false"
        :show-overflow-tooltip=true>
      </el-table-column>
      <el-table-column
        prop="serialNumber"
        label="商品编号"
        width="200"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        prop="brand"
        label="商品品牌"
        width="150"
        header-align="center"
        align="center"
        :resizable="false"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="number"
        label="商品数量"
        width="150"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        label="商品原价（元）"
        width="150"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        prop="size"
        label="商品尺寸"
        width="150"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        prop="sumPrice"
        label="商品总价（元）"
        width="200"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        header-align="center"
        align="center"
        :resizable="false"
        fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <transition :duration="{enter:900,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <purchaseAlert
        v-show="editSign"
        @closeAndEdit="closeAndEdit"
        @closeAndEditSucceed = "closeAndEditSucceed"
        v-bind:contentWidth="contentWidth"
        v-bind:contentHeight="contentHeight">
      </purchaseAlert>
    </transition>
    <div class="bottomContent">
      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="pageAllNumber"
          layout="sizes, prev, pager, next, jumper"
          class="favoritesPage">
        </el-pagination>
      </div>
      <div class="select">
        <span>选择日期：</span>
        <el-select v-model="value" placeholder="请选择进货日期">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="input">
        <span>搜索内容：</span>
        <el-input v-model="searchInput" placeholder="请输入内容"></el-input>
        <el-button class="inputButton" v-on:click="search()">搜索</el-button>
        <el-button class="purchaseButton" v-on:click="handleEdit()">进货</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import purchaseAlert from './purchaseAlert'
export default {
  name: 'stockPurchase',
  components: {
    purchaseAlert
  },
  props: ['contentWidth', 'contentHeight', 'widthNow', 'heightNow', 'searchSelect', 'searchInput'],
  created () {
    this.getContent()
  },
  data () {
    return {
      data: [],
      loading: false,
      editSign: false,
      pageAllNumber: 0,
      pageNow: 1,
      pageSize: 10,
      options: [{
        value: '/v1/spending/showSpending',
        label: '进货记录'
      }, {
        value: '/v1/spending/showTodaySpending',
        label: '今日进货'
      }, {
        value: '/v1/spending/showYesterdaySpending',
        label: '昨日进货'
      }],
      value: '/v1/spending/showSpending',
      input: '进货记录',
      dataSign: 1
    }
  },
  computed: {},
  watch: {
    value () {
      this.getContent()
    },
    searchSelect: {
      handler: function (newValue) {
        if (newValue === '进货') {
          console.log(1)
          setTimeout(() => {
            this.search()
          }, 500)
        }
      },
      immediate: true
    }
  },
  methods: {
    getContent () {
      this.loading = true
      this.$axios({
        method: 'get',
        url: `${this.value}/${this.pageNow}/${this.pageSize}`,
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        this.data = res.data.content
        this.pageAllNumber = res.data.pageInfo.allPageNumber * this.pageSize
        this.loading = false
        this.dataSign = 1
      })
    },
    handleEdit () {
      this.editSign = true
    },
    closeAndEdit () {
      this.editSign = false
    },
    closeAndEditSucceed () {
      this.editSign = false
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.search()
      }
    },
    handleDelete (val) {
      this.$confirm('是否删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url: '/v1/spending/deleteSpending',
          auth: {
            username: this.$store.getters.token_getters,
            password: ''
          },
          data: {
            'serialNumber': this.data[val].serialNumber
          }
        }).then(res => {
          if (res.status === 201) {
            this.$message.success('删除成功')
            this.getContent()
          }
        }).catch(() => {
          this.$message.error('删除失败，请检查你的网络连接')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (val) {
      this.pageNow = val
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.search()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.search()
      }
    },
    search () {
      this.loading = true
      if (this.searchInput === '') {
        this.$message.error('请输入搜索内容')
      } else {
        this.$axios({
          method: 'post',
          url: `/v1/search/spending/${this.pageNow}/${this.pageSize}`,
          auth: {
            username: this.$store.getters.token_getters,
            password: ''
          },
          data: {
            'q': this.searchInput
          }
        }).then(res => {
          this.data = res.data.content
          this.pageAllNumber = res.data.pageInfo.allPageNumber * this.pageSize
          this.loading = false
          this.dataSign = 2
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
.stockPurchase
  top 0
  left 0
  right 0
  width 100%
  height 100%
  background-color rgb(245,245,245)
  .stockPurchaseRow
    top 10px
    width 140px
    font-size 28px
    .stockPurchaseCol1
      width auto
    .stockPurchaseCol2
      width auto
  .table
    top 20px
  .bottomContent
    position relative
    display flex
    justify-content flex-start
    top 50px
    left 50px
    white-space nowrap
    .page
      margin-right 50px
      width auto
      bottom 40px
    .select
      margin-right 50px
      width auto
      bottom 40px
      > span
        font-size 20px
        font-family "Microsoft YaHei"
    .input
      margin-right 50px
      width 300px
      bottom 40px
      white-space nowrap
      > span
        font-size 20px
        font-family "Microsoft YaHei"
      .inputButton
        left 10px
        margin-left 20px
        width 100px
      .purchaseButton
        width 100px
</style>
