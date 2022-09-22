/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import { interceptRouterError, fixRouterError404 } from '@theme/helpers/other'
import { install } from 'vue-demi'
import { addLinkToHead } from '@theme/helpers/utils'
import { registerCodeThemeCss } from '@theme/helpers/other'

import ImgLazy from 'vuepress-plugin-img-lazy/ImgLazy'

export default ({
  Vue,
  siteData,
  isServer,
  router
}) => {
  install(Vue)
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)

  // 全局指令
  /*
  参考：https://www.jianshu.com/p/394c487d81d7
  自定义指令 v-trueImg
  作用；
    判断当前图片是否能够加载成功, 如果不能加载成功, 使用默认的图片；
    如果加载成功，用加载成功的图片去替换默认图片
*/
//   Vue.directive('v-trueImg', async function (el, binding) {//指令名称为：v-trueImg
//     let imgURL = binding.value;//获取图片地址
//     if (imgURL) {
//       let exist = await imageIsExist(imgURL);
//       if (exist) {
//         el.setAttribute('src', imgURL);
//       }
//     }
//   })

//   /**
//  * 检测图片是否存在
//  * @param url
//  */
//   let imageIsExist = function (url) {
//     return new Promise((resolve) => {
//       var img = new Image();
//       img.onload = function () {
//         if (this.complete == true) {
//           resolve(true);
//           img = null;
//         }
//       }
//       // 如果图片加载失败，则图片置空，这个时候就会显示默认的图片
//       img.onerror = function () {
//         resolve(false);
//         img = null;
//       }
//       img.src = url;
//     })
//   }


  // 图片懒加载注册
  Vue.component(ImgLazy.name, ImgLazy)  //registered as global components
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
