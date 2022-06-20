<template>
  <div
    class="comments-wrapper"
    v-show="isShowComments">
    <ClientOnly>
      <component
        :is="componentName"
        :options="options" />
    </ClientOnly>
  </div>
</template>

<script>
import Valine from './Valine.vue'
export default {
  name: 'Comments',
  components: { Valine },
  props: {
    isShowComments: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // eslint-disable-next-line no-undef
      commentsOptions: ''
    }
  },
  computed: {
    solution () {
      const {
        commentsOptions: { solution: slt },
        $themeConfig: { valineConfig},
        $themeLocaleConfig: { valineConfig: valineLocalConfig, vssueConfig: vssueLocalConfig }
      } = this

      let solution = ''
      if (slt !== undefined) {
        solution = slt
      } else if (valineLocalConfig !== undefined || valineConfig !== undefined) {
        solution = 'valine'
      }
      return solution
    },
    options () {
      const {
        commentsOptions: { options: opt },
        $themeConfig: { valineConfig },
        $themeLocaleConfig: { valineConfig: valineLocalConfig }
      } = this

      if (opt !== undefined) {
        return opt
      } else if (valineLocalConfig !== undefined || valineConfig !== undefined) {
        return valineLocalConfig || valineConfig
      }
      return null
    },
    componentName () {
      const solution = this.solution
      return solution === 'valine' ? 'Valine' :  ''
    }
  },
  mounted () {
    this.$themeConfig.commentsSolution = this.solution
  }
}
</script>
