<template>
    <div class="profit">
      <el-row class="profitRow" v-bind:style="{'left': ((contentWidth - 140) / 2) + 'px'}">
        <el-col class="profitCol1">
          <i class="icon-folder-download"></i>
        </el-col>
        <el-col class="profitCol2">
          <span>收支详情</span>
        </el-col>
      </el-row>
      <div class="chart1" ref="chart1" v-bind:style="{'left': (contentWidth * 0.02234) + 'px', 'top': (contentHeight * 0.14423) + 'px'}"></div>
      <div class="chart2" ref="chart2" v-bind:style="{'left': (contentWidth * 0.26815) + 'px', 'top': (contentHeight * 0.14423) + 'px'}"></div>
      <div class="chart3" ref="chart3" v-bind:style="{'left': (contentWidth * 0.51396) + 'px', 'top': (contentHeight * 0.14423) + 'px'}"></div>
      <div class="chart4" ref="chart4" v-bind:style="{'left': (contentWidth * 0.75977) + 'px', 'top': (contentHeight * 0.14423) + 'px'}"></div>
      <div class="earn">
        <el-row class="earnRow" v-bind:style="{'left': ((contentWidth - 120) / 2) + 'px'}">
          <el-col class="earnCol">
            <span>盈亏详情</span>
          </el-col>
        </el-row>
        <div class="content" id="content1" v-bind:style="{'left': (contentWidth * 0.04469) + 'px'}">
          <span>盈亏总计</span>
          <br>
          <i v-set-position>{{ earnAll }}元</i>
        </div>
        <div class="content" id="content2" v-bind:style="{'left': (contentWidth * 0.22905) + 'px'}">
          <span>今日盈亏</span>
          <br>
          <i v-set-position>{{ earnToday }}元</i>
        </div>
        <div class="content" id="content3" v-bind:style="{'left': (contentWidth * 0.41340) + 'px'}">
          <span>昨日盈亏</span>
          <br>
          <i v-set-position>{{ earnYesterday }}元</i>
        </div>
        <div class="content" id="content4" v-bind:style="{'left': (contentWidth * 0.59776) + 'px'}">
          <span>本月盈亏</span>
          <br>
          <i v-set-position>{{ earnThisMonth }}元</i>
        </div>
        <div class="content" id="content5" v-bind:style="{'left': (contentWidth * 0.78212) + 'px'}">
          <span>上月盈亏</span>
          <br>
          <i v-set-position>{{ earnLastMonth }}元</i>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'profit',
  components: {},
  props: ['contentWidth', 'contentHeight', 'widthNow', 'heightNow'],
  created () {
    this.drawPieToday()
    this.drawPieYesterday()
    this.drawPieThisMonth()
    this.drawPieLastMonth()
    this.getContent()
  },
  data () {
    return {
      todayProfit: 0,
      todayExpenditure: 0,
      yesterdayProfit: 0,
      yesterdayExpenditure: 0,
      lastMonthProfit: 0,
      lastMonthExpenditure: 0,
      thisMonthProfit: 0,
      thisMonthExpenditure: 0,
      earnAll: 0,
      earnToday: 0,
      earnYesterday: 0,
      earnThisMonth: 0,
      earnLastMonth: 0
    }
  },
  computed: {},
  watch: {
    todayProfit () {
      this.drawPieToday()
    },
    todayExpenditure () {
      this.drawPieToday()
    },
    yesterdayProfit () {
      this.drawPieYesterday()
    },
    yesterdayExpenditure () {
      this.drawPieYesterday()
    },
    thisMonthProfit () {
      this.drawPieThisMonth()
    },
    thisMonthExpenditure () {
      this.drawPieThisMonth()
    },
    lastMonthProfit () {
      this.drawPieLastMonth()
    },
    lastMonthExpenditure () {
      this.drawPieLastMonth()
    }
  },
  methods: {
    getContent () {
      // today1
      this.$axios({
        method: 'get',
        url: '/v1/profits/TodayProfits',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumProfits) {
          this.todayProfit = parseInt(res.data.sumProfits)
        }
      })
      // today2
      this.$axios({
        method: 'get',
        url: '/v1/cost/TodaySpending',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumPrice) {
          this.todayExpenditure = parseInt(res.data.sumPrice)
        }
      })
      // yesterday1
      this.$axios({
        method: 'get',
        url: '/v1/profits/YesterdayProfits',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumProfits) {
          this.yesterdayProfit = parseInt(res.data.sumProfits)
        }
      })
      // yesterday2
      this.$axios({
        method: 'get',
        url: '/v1/cost/YesterdaySpending',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumPrice) {
          this.yesterdayExpenditure = parseInt(res.data.sumPrice)
        }
      })
      // thisMonth1
      this.$axios({
        method: 'get',
        url: '/v1/profits/thisMonthProfits',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumProfits) {
          this.thisMonthProfit = parseInt(res.data.sumProfits)
        }
      })
      // thisMonth2
      this.$axios({
        method: 'get',
        url: '/v1/cost/thisMonthSpending',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumPrice) {
          this.thisMonthExpenditure = parseInt(res.data.sumPrice)
        }
      })
      // lastMonth1
      this.$axios({
        method: 'get',
        url: '/v1/profits/lastMonthProfits',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumProfits) {
          this.lastMonthProfit = parseInt(res.data.sumProfits)
        }
      })
      // lastMonth2
      this.$axios({
        method: 'get',
        url: '/v1/cost/lastMonthSpending',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.sumPrice) {
          this.lastMonthExpenditure = parseInt(res.data.sumPrice)
        }
      })
      // earnAll
      this.$axios({
        method: 'get',
        url: '/v1/earn/allEarn',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.allearn) {
          this.earnAll = res.data.allearn
        }
      })
      // earnToday
      this.$axios({
        method: 'get',
        url: '/v1/earn/todayEarn',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.earn) {
          this.earnToday = res.data.earn
        }
      })
      // earnYesterday
      this.$axios({
        method: 'get',
        url: '/v1/earn/yesterdayEarn',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.earn) {
          this.earnYesterday = res.data.earn
        }
      })
      // earnThisMonth
      this.$axios({
        method: 'get',
        url: '/v1/earn/thisMonthEarn',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.earn) {
          this.earnThisMonth = res.data.earn
        }
      })
      // earnLastMonth
      this.$axios({
        method: 'get',
        url: '/v1/earn/lostMonthEarn',
        auth: {
          username: this.$store.getters.token_getters,
          password: ''
        }
      }).then(res => {
        if (res.data.earn) {
          this.earnLastMonth = res.data.earn
        }
      })
    },
    drawPieToday () {
      if (this.$refs.chart1) {
        let myChart = this.$echarts.init(this.$refs.chart1)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '今日收支情况',
            textStyle: {
              fontSize: 25
            },
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['今日收入', '今日支出']
          },
          series: [
            {
              name: '收支来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: this.todayProfit, name: '今日收入' },
                { value: this.todayExpenditure, name: '今日支出' }
              ]
            }
          ],
          color: ['#f5f01a', '#f9ad4d']
        })
      }
    },
    drawPieYesterday () {
      if (this.$refs.chart2) {
        let myChart = this.$echarts.init(this.$refs.chart2)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '昨日收支情况',
            textStyle: {
              fontSize: 25
            },
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['昨日收入', '昨日支出']
          },
          series: [
            {
              name: '收支来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: this.yesterdayProfit, name: '昨日收入' },
                { value: this.yesterdayExpenditure, name: '昨日支出' }
              ]
            }
          ],
          color: ['#6ec53a', '#009043']
        })
      }
    },
    drawPieThisMonth () {
      if (this.$refs.chart3) {
        let myChart = this.$echarts.init(this.$refs.chart3)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '本月收支情况',
            textStyle: {
              fontSize: 25
            },
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['本月收入', '本月支出']
          },
          series: [
            {
              name: '收支来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: this.thisMonthProfit, name: '本月收入' },
                { value: this.thisMonthExpenditure, name: '本月支出' }
              ]
            }
          ],
          color: ['#9bd1dd', '#00acc8']
        })
      }
    },
    drawPieLastMonth () {
      if (this.$refs.chart4) {
        let myChart = this.$echarts.init(this.$refs.chart4)
        // 绘制图表
        myChart.setOption({
          title: {
            text: '上月收支情况',
            textStyle: {
              fontSize: 25
            },
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['上月收入', '上月支出']
          },
          series: [
            {
              name: '收支来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: this.lastMonthProfit, name: '上月收入' },
                { value: this.lastMonthExpenditure, name: '上月支出' }
              ]
            }
          ],
          color: ['#f54520', '#c20428']
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawPieToday()
      this.drawPieYesterday()
      this.drawPieThisMonth()
      this.drawPieLastMonth()
    })
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  directives: {
    setPosition: {
      inserted: function (el) {
        el.focus()
        el.style.left = `${((300 - el.scrollWidth) / 2)}px`
      },
      componentUpdated: function (el) {
        el.focus()
        el.style.left = `${((300 - el.scrollWidth) / 2)}px`
      }
    }
  }
}
</script>

<style lang="stylus">
.profit
  width 100%
  height 100%
  background-color rgb(245,245,245)
  .profitRow
    top 10px
    width 140px
    font-size 28px
    .profitCol1
      width auto
    .profitCol2
      width auto
  .chart1
    position absolute
    width 400px
    height 400px
    background-color white
    border-radius 20px
    z-index 130
  .chart2
    position absolute
    width 400px
    height 400px
    background-color white
    border-radius 20px
    z-index 130
  .chart3
    position absolute
    width 400px
    height 400px
    background-color white
    border-radius 20px
    z-index 130
  .chart4
    position absolute
    width 400px
    height 400px
    background-color white
    border-radius 20px
    z-index 130
  .earn
    .earnRow
      position absolute
      top 540px
      width 140px
      font-size 28px
      .profitCol
        width auto
    .content
      width 300px
      height 200px
      background-color white
      border-radius 20px
      top 600px
      > span
        padding-left 95px
        font-size 28px
        font-family Microsoft YaHei
      > i
        position absolute
        margin-top 40px
        font-style normal
        font-size 45px
</style>
