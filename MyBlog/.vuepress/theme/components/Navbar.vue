<!-- 顶部导航栏组件 -->
<template>
  <header class="navbar">
    <!-- 侧边栏菜单按钮 -->
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>
    <!-- 导航栏左侧网站信息，包括头像，网站名称等 -->
    <router-link
      :to="$localePath"
      class="home-link">
      <img
        class="logo"
        v-if="$themeConfig.logo"
        :src="$withBase($themeConfig.logo)"
        :alt="$siteTitle">
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle">{{ $siteTitle }}</span>
    </router-link>
    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}">
      <!-- 切换白天黑夜的模式 -->
      <!-- <Mode /> -->
      <DayAndNight />
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"/>
      <SearchBox v-else-if="$themeConfig.search !== false && $frontmatter.search !== false"/>
      <!-- 导航栏主体部分，这里考虑引入better-scroll, 来解决导航栏移动端滚动-->
      <NavLinks class="can-hide"/>
    </div>
  </header>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue-demi'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton'
import NavLinks from '@theme/components/NavLinks'
import Mode from '@theme/components/Mode'
import { useInstance } from '@theme/helpers/composable'
import DayAndNight from '@theme/components/DayAndNight'

// 引入滚动条组件
import Scroll from "@theme/components/Scroll.vue"

export default defineComponent({
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, Mode, Scroll, DayAndNight },

  setup (props, ctx) {
    const instance = useInstance()
    const linksWrapMaxWidth = ref(null)

    const algolia = computed(() => {
      return instance.$themeLocaleConfig.algolia || instance.$themeConfig.algolia || {}
    })

    const isAlgoliaSearch = computed(() => {
      algolia.value && algolia.value.apiKey && algolia.value.indexName
    })

    function css (el, property) {
      // NOTE: Known bug, will return 'auto' if style value is 'auto'
      const win = el.ownerDocument.defaultView
      // null means not to return pseudo styles
      return win.getComputedStyle(el, null)[property]
    }

    onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
      const NAVBAR_VERTICAL_PADDING =
        parseInt(css(instance.$el, 'paddingLeft')) +
        parseInt(css(instance.$el, 'paddingRight'))

      const handleLinksWrapWidth = () => {
        if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapMaxWidth.value = null
        } else {
          linksWrapMaxWidth.value =
            instance.$el.offsetWidth -
            NAVBAR_VERTICAL_PADDING -
            (instance.$refs.siteName && instance.$refs.siteName.offsetWidth || 0)
        }
      }

      handleLinksWrapWidth()
      window.addEventListener('resize', handleLinksWrapWidth, false)
    })

    return { linksWrapMaxWidth, algolia, isAlgoliaSearch, css }
  }
})
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  box-shadow var(--box-shadow)
  background var(--background-color)
  a, span, img
    display inline-block
  .logo
    width $navbarHeight - 1.4rem
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
    border-radius 50%
  .site-name
    font-size 1.2rem
    font-weight 600
    color var(--text-color)
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    position absolute
    display flex
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    background var(--background-color)
    // 搜索框
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    width: 100vw
    padding-left 4rem
    // 当宽度不够，取消对导航栏内容展示
    a, span, img
    display inline-block
    .logo
      width $navbarHeight - 1.4rem
      height $navbarHeight - 1.4rem
      min-width $navbarHeight - 1.4rem
      margin-right 0.2rem
      vertical-align top
      border-radius 50%
    .site-name
      font-size 1rem
      font-weight 600
      color var(--text-color)
      position relative
    .can-hide
      display none
    .links
      padding-left 1.5rem
      box-sizing border-box
      white-space nowrap
      font-size 0.9rem
      position absolute
      display flex
      right 0.5rem
      top $navbar-vertical-padding
      background var(--background-color)

</style>
