<template>
  <div class="admin" v-loading="loading">
    <el-row class="adminRow" v-bind:style="{'left': ((contentWidth - 140) / 2) + 'px'}">
      <el-col class="adminCol1">
        <i class="icon-users"></i>
      </el-col>
      <el-col class="adminCol2">
        <span>用户管理</span>
      </el-col>
    </el-row>
    <el-table
      class="table"
      :data="data"
      border
      :style="{'width': contentWidth + 'px'}"
      :height="(parseInt(contentHeight) - 170)">
      <el-table-column
        prop="email"
        label="账号（邮箱）"
        header-align="center"
        align="center"
        :resizable="false"
        fixed>
      </el-table-column>
      <el-table-column
        prop="id"
        label="用户ID"
        header-align="center"
        width="200"
        align="center"
        :resizable="false"
        :show-overflow-tooltip=true>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="200"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户身份（2：管理员；1：普通用户）"
        width="350"
        header-align="center"
        align="center"
        :resizable="false">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        header-align="center"
        align="center"
        :resizable="false"
        fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index)" type="info" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.$index)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        <el-button class="inputButton" v-on:click="search">搜索</el-button>
      </div>
    </div>
    <transition :duration="{enter:900,leave:800}" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <adminAlert
        v-show="editSign"
        @closeAndEdit="closeAndEdit"
        @closeAndEditSucceed = "closeAndEditSucceed"
        v-bind:contentWidth="contentWidth"
        v-bind:contentHeight="contentHeight"
        v-bind:editContent="editContent">
      </adminAlert>
    </transition>
  </div>
</template>

<script>
import adminAlert from './adminAlert'
export default {
  name: 'admin',
  components: {
    adminAlert
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
      editContent: '',
      pageAllNumber: 0,
      pageNow: 1,
      pageSize: 10,
      dataSign: 1
    }
  },
  computed: {},
  watch: {
    searchSelect: {
      handler: function (newValue) {
        if (newValue === '用户') {
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
        url: `/v1/admin/showUsers/${this.pageNow}/${this.pageSize}`,
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
    handleEdit (val) {
      this.editSign = true
      this.editContent = this.data[val].id
    },
    handleDelete (val) {
      this.$confirm('是否删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        // this.$axios({
        //   method: 'post',
        //   url: '/v1/stock/id',
        //   auth: {
        //     username: this.$store.getters.token_getters,
        //     password: ''
        //   },
        //   data: {
        //     'serialNumber': this.data[val].serialNumber
        //   }
        // }).then(res => {
        //   if (res.status === 201) {
        //     this.$message.success('删除成功')
        //     this.getContent()
        //   }
        // }).catch(() => {
        //   this.$message.error('删除失败，请检查你的网络连接')
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
      if (this.searchInput === '') {
        this.$message.error('请输入搜索内容')
      } else {
        this.loading = true
        this.$axios({
          method: 'post',
          url: `/v1/search/searchUser/${this.pageNow}/${this.pageSize}`,
          auth: {
            username: this.$store.getters.token_getters,
            password: ''
          },
          data: {
            'name': this.searchInput
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
.admin
  top 0
  left 0
  right 0
  width 100%
  height 100%
  background-color rgb(245,245,245)
  .adminRow
    top 10px
    width 150px
    font-size 28px
    .adminCol1
      width auto
    .adminCol2
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
      width auto
      bottom 40px
      white-space nowrap
      > span
        font-size 20px
        font-family "Microsoft YaHei"
      .inputButton
        left 10px
        margin-left 20px
        width 100px
</style>
