<template>
  <div class="comments-wrapper" v-show="isShowComments">
    <ClientOnly>
      <div class="commentBoardContainer">
        <p class="commentBoardText">tips: 留言填上邮箱可以收到邮件反馈~</p>
      </div>
      <component :is="componentName" :options="options" />
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
  data() {
    return {
      // eslint-disable-next-line no-undef
      commentsOptions: ''
    }
  },
  computed: {
    solution() {
      const {
        commentsOptions: { solution: slt },
        $themeConfig: { valineConfig },
        $themeLocaleConfig: {
          valineConfig: valineLocalConfig,
          vssueConfig: vssueLocalConfig
        }
      } = this

      let solution = ''
      if (slt !== undefined) {
        solution = slt
      } else if (
        valineLocalConfig !== undefined ||
        valineConfig !== undefined
      ) {
        solution = 'valine'
      }
      return solution
    },
    options() {
      const {
        commentsOptions: { options: opt },
        $themeConfig: { valineConfig },
        $themeLocaleConfig: { valineConfig: valineLocalConfig }
      } = this

      if (opt !== undefined) {
        return opt
      } else if (
        valineLocalConfig !== undefined ||
        valineConfig !== undefined
      ) {
        return valineLocalConfig || valineConfig
      }
      return null
    },
    componentName() {
      const solution = this.solution
      return solution === 'valine' ? 'Valine' : ''
    }
  },
  mounted() {
    this.$themeConfig.commentsSolution = this.solution
  }
}
</script>

<style lang="stylus" scoped>
.commentBoardContainer
  display flex
  justify-content: center
  border-bottom 2px solid skyblue
  .commentBoardText
    color #fc5531
</style>
