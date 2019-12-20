<template>
  <div class="returnGood" v-loading="loading">
    <el-row class="returnGoodRow" v-bind:style="{'left': ((contentWidth - 140) / 2) + 'px'}">
      <el-col class="returnGoodCol1">
        <i class="icon-folder-download"></i>
      </el-col>
      <el-col class="returnGoodCol2">
        <span>退货管理</span>
      </el-col>
    </el-row>
    <el-table
      class="table"
      :data="data"
      border
      :style="{'width': contentWidth + 'px'}"
      :height="(parseInt(contentHeight) - 170)">
      <el-table-column
        prop="salesReturnDeta"
        label="退货日期"
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
        prop="place"
        label="商品产地"
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
      <returnAlert
        v-if="returnSign"
        @closeAndReturn="closeAndReturn"
        @closeAndReturnSucceed = "closeAndReturnSucceed"
        v-bind:contentWidth="contentWidth"
        v-bind:contentHeight="contentHeight">
      </returnAlert>
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
      <div class="input">
        <span>搜索内容：</span>
        <el-input v-model="searchInput" placeholder="请输入内容"></el-input>
        <el-button class="inputButton" v-on:click="search()">搜索</el-button>
        <el-button class="returnButton" v-on:click="handleEdit()">退货</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import returnAlert from './returnAlert'
export default {
  name: 'returnGood',
  components: {
    returnAlert
  },
  props: ['contentWidth', 'contentHeight', 'widthNow', 'heightNow', 'searchSelect', 'searchInput'],
  created () {
    this.getContent()
  },
  data () {
    return {
      data: [],
      loading: false,
      returnSign: false,
      pageAllNumber: 0,
      pageNow: 1,
      pageSize: 10,
      value: '退货记录',
      input: '退货记录',
      dataSign: 1
    }
  },
  computed: {},
  watch: {
    searchSelect: {
      handler: function (newValue) {
        if (newValue === '退货') {
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
        url: `/v1/salesReturn/showSalesReturn/${this.pageNow}/${this.pageSize}`,
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
      this.returnSign = true
    },
    closeAndReturn () {
      this.returnSign = false
    },
    closeAndReturnSucceed () {
      this.returnSign = false
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
          url: '/v1/salesReturn/deleteSalesReturn',
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
          url: `/v1/search/searchSalesReturn/${this.pageNow}/${this.pageSize}`,
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
.returnGood
  width 100%
  height 100%
  background-color rgb(245,245,245)
  .returnGoodRow
    top 10px
    width 140px
    font-size 28px
    .returnGoodCol1
      width auto
    .returnGoodCol2
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
      .returnButton
        width 100px
</style>
