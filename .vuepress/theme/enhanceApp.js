/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import { interceptRouterError, fixRouterError404 } from '@theme/helpers/other'
import { install } from 'vue-demi'
import { addLinkToHead } from '@theme/helpers/utils'
import { registerCodeThemeCss } from '@theme/helpers/other'

export default ({
  Vue,
  siteData,
  isServer,
  router
}) => {
  install(Vue)
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  // if (!isServer) {
  //   addScriptToHead('//kit.fontawesome.com/51b01de608.js')
  //   registerCodeThemeCss(siteData.themeConfig.codeTheme)
  // }
  if (!isServer) {
    addLinkToHead('//at.alicdn.com/t/font_1030519_2ciwdtb4x65.css')
    registerCodeThemeCss(siteData.themeConfig.codeTheme)
  }
  interceptRouterError(router)
  fixRouterError404(router)
}
