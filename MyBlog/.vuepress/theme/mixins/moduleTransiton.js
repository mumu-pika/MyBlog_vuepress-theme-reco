export default {
  data () {
    return {
      // recoShowModule 标识是否显示Moudule
      recoShowModule: false
    }
  },
  mounted () {
    this.recoShowModule = true
  },
  watch: {
    '$route' (newV, oldV) {
      // 如果路由跳转路径为当前路径，则不做跳转处理，直接返回
      if (newV.path === oldV.path) return

      // 如果跳转，则隐藏当前Module
      this.recoShowModule = false

      setTimeout(() => {
        this.recoShowModule = true
      }, 200)
    }
  }
}
