<template>
  <div class="indexChild">
    <div id="setWidthAndHeight">
      <el-popover
        placement="bottom"
        title="查看报表"
        width="200"
        trigger="hover"
        content="点击查看销售品牌报表"
        class="popover1">
        <div class="content1" v-bind:style="{'left': '70px'}" slot="reference" v-on:click="clickChangeDraw(0)">
          <span class="title1">查看报表</span>
          <span class="title2">销售品牌报表</span>
        </div>
      </el-popover>
      <el-popover
        placement="bottom"
        title="查看报表"
        width="200"
        trigger="hover"
        content="点击查看销售名称报表"
        class="popover2">
        <div class="content2" v-bind:style="{'left': '500px'}" slot="reference" v-on:click="clickChangeDraw(1)">
          <span class="title1">查看报表</span>
          <span class="title2">销售名称报表</span>
        </div>
      </el-popover>
      <el-popover
        placement="bottom"
        title="查看报表"
        width="200"
        trigger="hover"
        content="点击查看进货品牌报表"
        class="popover3">
        <div class="content3" v-bind:style="{'left': '930px'}" slot="reference" v-on:click="clickChangeDraw(2)">
          <span class="title1">查看报表</span>
          <span class="title2">进货品牌报表</span>
        </div>
      </el-popover>
      <el-popover
        placement="bottom"
        title="查看报表"
        width="200"
        trigger="hover"
        content="点击查看进货名称报表"
        class="popover4">
        <div class="content4" v-bind:style="{'left': '1360px'}" slot="reference" v-on:click="clickChangeDraw(3)">
          <span class="title1">查看报表</span>
          <span class="title2">进货名称报表</span>
        </div>
      </el-popover>
      <div class="chart1" ref="chart1"></div>
      <div class="chart2" ref="chart2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexChild',
  components: {},
  props: ['contentWidth', 'contentHeight', 'widthNow', 'heightNow'],
  created () {
    this.drawLine1(0)
    this.drawLine2(0)
    this.getContent1(0)
    this.getContent2(0)
  },
  data () {
    return {
      url1: ['/v1/report/thisMonthSalesBrandReport', '/v1/report/thisMonthSalesNameReport', '/v1/report/thisMonthSpendingBrandReport', '/v1/report/thisMonthSpendingNameReport'],
      url2: ['/v1/report/lostMonthSalesBrandReport', '/v1/report/lastMonthSalesNameReport', '/v1/report/lostMonthSpendingBrandReport', '/v1/report/lastMonthSpendingNameReport'],
      name: ['销售品牌报表', '销售名称报表', '进货品牌报表', '进货名称报表'],
      data1: [],
      data2: [],
      legend1: [
        ['', '本月数量（件）'],
        ['', '本月数量（件）'],
        ['', '本月数量（件）'],
        ['', '本月数量（件）']
      ],
      legend2: [
        ['', '上月数量（件）'],
        ['', '上月数量（件）'],
        ['', '上月数量（件）'],
        ['', '上月数量（件）']
      ],
      val: 0
    }
  },
  computed: {},
  watch: {
    // 监听data1数据并重绘图1
    data1 () {
      let val = this.val
      this.drawLine1(val)
    },
    // 监听data2数据并重绘图2
    data2 () {
      let val = this.val
      this.drawLine2(val)
    }
  },
  methods: {
    // 获取图1数据
    getContent1 (val) {
      // this.loading = true
      this.$axios({
        method: 'get',
        url: this.url1[val],
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        this.data1.push(this.legend1[val])
        for (let i = 0; i < res.data.length; i++) {
          this.data1.push([`${res.data[i].name}`, `${res.data[i].number}`])
        }
        // this.loading = false
      })
    },
    // 获取图2数据
    getContent2 (val) {
      this.$axios({
        method: 'get',
        url: this.url2[val],
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        this.data2.push(this.legend2[val])
        for (let i = 0; i < res.data.length; i++) {
          this.data2.push([`${res.data[i].name}`, `${res.data[i].number}`])
        }
        // this.loading = false
      })
    },
    // 绘制图1
    drawLine1 (val) {
      let title1 = ['本月销售品牌报表', '本月销售名称报表', '本月进货品牌报表', '本月进货名称报表']
      if (this.$refs.chart1) {
        let myChart = this.$echarts.init(this.$refs.chart1)
        // 绘制图表
        myChart.setOption({
          legend: {
            show: true,
            textStyle: {
              fontSize: 18
            }
          },
          tooltip: {
            show: true
          },
          title: {
            top: 10,
            left: 10,
            show: true,
            text: title1[val],
            textStyle: {
              fontSize: 25
            }
          },
          dataset: {
            source: this.data1
          },
          xAxis: {
            name: '名称',
            nameTextStyle: {
              fontSize: 20
            },
            type: 'category',
            axisLabel: {
              fontSize: 18
            }
          },
          yAxis: {
            axisLabel: {
              fontSize: 20
            }
          },
          series: [
            { type: 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    let colorList = [ '#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB' ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        })
      }
    },
    // 绘制图2
    drawLine2 (val) {
      let title2 = ['上月销售品牌报表', '上月销售名称报表', '上月进货品牌报表', '上月进货名称报表']
      if (this.$refs.chart2) {
        let myChart = this.$echarts.init(this.$refs.chart2)
        // 绘制图表
        myChart.setOption({
          legend: {
            show: true,
            textStyle: {
              fontSize: 18
            }
          },
          tooltip: {
            show: true
          },
          title: {
            left: 10,
            top: 10,
            show: true,
            text: title2[val],
            textStyle: {
              fontSize: 25
            }
          },
          dataset: {
            source: this.data2
          },
          xAxis: {
            name: '名称',
            nameTextStyle: {
              fontSize: 20
            },
            type: 'category',
            axisLabel: {
              fontSize: 18
            }
          },
          yAxis: {
            axisLabel: {
              fontSize: 20
            }
          },
          series: [
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: function (params) {
                    let colorList = [ '#C33531', '#EFE42A', '#64BD3D', '#EE9201', '#29AAE3', '#B74AE5', '#0AAF9F', '#E89589', '#16A085', '#4A235A', '#C39BD3 ', '#F9E79F', '#BA4A00', '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#3498DB' ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ]
        })
      }
    },
    // 点击切换图数据，清空data数据并加装新数据，再绘图
    clickChangeDraw (val) {
      this.val = val
      for (let i = this.data1.length - 1; i >= 0; i--) {
        this.$delete(this.data1, i)
      }
      for (let i = this.data2.length - 1; i >= 0; i--) {
        this.$delete(this.data2, i)
      }
      this.getContent1(val)
      this.getContent2(val)
      this.drawLine1(val)
      this.drawLine2(val)
    }
  },
  mounted () {
    // 挂载点：异步加载绘制图
    let val = this.val
    this.$nextTick(() => {
      this.drawLine1(val)
    })
    this.$nextTick(() => {
      this.drawLine2(val)
    })
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
.indexChild
  top 0
  left 0
  right 0
  width 100%
  height 100%
  background-color rgb(245,245,245)
  overflow auto
  #setWidthAndHeight
    position relative
    .popover1
      .content1:hover
        background-color rgb(247,155,103)
        transition all 0.4s
      .content1
        position absolute
        top 50px
        left 100px
        width 360px
        height 150px
        border-radius 10px
        background-color rgb(252,133,86)
        cursor pointer
        .title1
          padding 2px
          font-size 20px
          font-family "Microsoft YaHei"
          background-color rgb(247,155,103)
          color white
          border-radius 5px
        .title2
          position absolute
          top 50px
          left 55px
          font-size 40px
          color white
    .popover2
      .content2:hover
        background-color rgb(249,198,80)
        transition all 0.4s
      .content2
        position absolute
        top 50px
        left 200px
        width 360px
        height 150px
        border-radius 10px
        background-color rgb(248,187,57)
        cursor pointer
        .title1
          padding 2px
          font-size 20px
          font-family "Microsoft YaHei"
          background-color rgb(249,198,80)
          color white
          border-radius 5px
        .title2
          position absolute
          top 50px
          left 55px
          font-size 40px
          color white
    .popover3
      .content3:hover
        background-color rgb(98,202,108)
        transition all 0.4s
      .content3
        position absolute
        top 50px
        left 300px
        width 360px
        height 150px
        border-radius 10px
        background-color rgb(71,192,86)
        cursor pointer
        .title1
          padding 2px
          font-size 20px
          font-family "Microsoft YaHei"
          background-color rgb(98,202,108)
          color white
          border-radius 5px
        .title2
          position absolute
          top 50px
          left 55px
          font-size 40px
          color white
    .popover4
      .content4:hover
        background-color rgb(119,156,219)
        transition all 0.4s
      .content4
        position absolute
        top 50px
        left 400px
        width 360px
        height 150px
        border-radius 10px
        background-color rgb(91,143,212)
        cursor pointer
        .title1
          padding 2px
          font-size 20px
          font-family "Microsoft YaHei"
          background-color rgb(119,156,219)
          color white
          border-radius 5px
        .title2
          position absolute
          top 50px
          left 55px
          font-size 40px
          color white
    .chart1
      position absolute
      top 230px
      left 60px
      width 800px
      height 570px
      background-color white
      border-radius 20px
      z-index 130
    .chart2
      position absolute
      top 230px
      left 930px
      width 800px
      height 570px
      background-color white
      border-radius 20px
      z-index 130
</style>
