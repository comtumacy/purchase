<template>
  <div class="404" id="notFound">
    <img class="img" alt="Vue logo" :src="img()">
  </div>
</template>

<script>
export default {
  name: '404',
  components: {},
  props: [],
  created () {
    this.goToIndex()
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    img () {
      return require('./404.jpg')
    },
    goToIndex () {
      this.$message.error('即将跳转回首页')
      setTimeout(() => {
        this.$router.push('/shopIndex/shopIndexChildIndex')
      }, 3000)
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
#notFound
  position fixed
  top 0
  left 0
  right 0
  overflow hidden
  > img
    width 100%
    height 100%
</style>
