<template>
    <div class="sale" v-loading="loading">
      <el-row class="saleRow" v-bind:style="{'left': ((contentWidth - 140) / 2) + 'px'}">
        <el-col class="saleCol1">
          <i class="icon-folder-upload"></i>
        </el-col>
        <el-col class="saleCol2">
          <span>销售管理</span>
        </el-col>
      </el-row>
      <el-table
        class="table"
        :data="data"
        border
        :style="{'width': contentWidth + 'px'}"
        :height="(parseInt(contentHeight) - 170)">
        <el-table-column
          prop="salesDeta"
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
          prop="profit"
          label="商品利润（元）"
          width="150"
          header-align="center"
          align="center"
          :resizable="false">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品售价（元）"
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
        <saleAlert
          v-show="saleSign"
          @closeAndSale="closeAndSale"
          @closeAndSaleSucceed = "closeAndSaleSucceed"
          v-bind:contentWidth="contentWidth"
          v-bind:contentHeight="contentHeight">
        </saleAlert>
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
          <el-button class="saleButton" v-on:click="handleEdit()">销售</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import saleAlert from './saleAlert'
export default {
  name: 'sale',
  components: {
    saleAlert
  },
  props: ['contentWidth', 'contentHeight', 'widthNow', 'heightNow', 'searchSelect', 'searchInput'],
  created () {
    this.getContent()
  },
  data () {
    return {
      data: [],
      loading: false,
      saleSign: false,
      pageAllNumber: 0,
      pageNow: 1,
      pageSize: 10,
      options: [{
        value: '/v1/sales/showSales',
        label: '销售记录'
      }, {
        value: '/v1/sales/TodaySales',
        label: '今日出售'
      }, {
        value: '/v1/sales/showYesterdaySales',
        label: '昨日出售'
      }],
      value: '/v1/sales/showSales',
      input: '销售记录',
      dataSign: 1
    }
  },
  computed: {},
  watch: {
    value () {
      this.getContent()
    },
    // 监听对象未发生变化前就执行一遍，调用搜索函数
    searchSelect: {
      handler: function (newValue) {
        if (newValue === '销售') {
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
    // 编辑框打开，根据类型不同获取不同的数据
    handleEdit () {
      this.saleSign = true
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.search()
      }
    },
    // 关闭编辑框不做更改
    closeAndSale () {
      this.saleSign = false
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.search()
      }
    },
    // 关闭编辑框并获取新数据刷新页面，根据当前的数据类型刷新
    closeAndSaleSucceed () {
      this.saleSign = false
      if (this.dataSign === 1) {
        this.getContent()
      } else {
        this.search()
      }
    },
    // 删除
    handleDelete (val) {
      this.$confirm('是否删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url: '/v1/sales/deleteSales',
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
    // 控制翻页获取新页数据，根据数据类型获取
    handleCurrentChange (val) {
      this.pageNow = val
      this.getContent()
    },
    // 控制每页个数，根据数据类型获取
    handleSizeChange (val) {
      this.pageSize = val
      this.getContent()
    },
    // 搜索
    search () {
      this.loading = true
      if (this.searchInput === '') {
        this.$message.error('请输入搜索内容')
      } else {
        this.$axios({
          method: 'post',
          url: `/v1/search/sales/${this.pageNow}/${this.pageSize}`,
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
.sale
  top 0
  left 0
  right 0
  width 100%
  height 100%
  background-color rgb(245,245,245)
  .saleRow
    top 10px
    width 140px
    font-size 28px
    .saleCol1
      width auto
    .saleCol2
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
      .saleButton
        width 100px
</style>
