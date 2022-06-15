/* eslint-disable no-proto */
import { addLinkToHead } from './utils'
export function getOneColor () {
  const tagColorArr = [
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#abbd81',
    '#849b87',
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#f26d6d',
    '#67cc86',
    '#fb9b5f',
    '#3498db'
  ]
  const index = Math.floor(Math.random() * tagColorArr.length)
  return tagColorArr[index]
}

// 注册Code代码主题的样式的函数, 需要去enhanceApp.js中去注册
export function registerCodeThemeCss (theme = 'tomorrow') {
  const themeArr = ['tomorrow', 'funky', 'okaidia', 'solarizedlight', 'default']
  // const href = `//prismjs.com/themes/prism${themeArr.indexOf(theme) > -1 ? `-${theme}` : ''}.css`
  const href = `https://cdn.jsdelivr.net/npm/prismjs@1.21.0/themes/prism${themeArr.indexOf(theme) > -1 ? `-${theme}` : ''}.css`
  addLinkToHead(href)
}

export function interceptRouterError (router) {
  // 获取原型对象上的 push 函数
  const originalPush = router.__proto__.push
  // 修改原型对象中的p ush 方法
  router.__proto__.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
  }
}

export function fixRouterError404 (router) {
  router.beforeEach((to, from, next) => {
    // 解决非ASCII文件名的路由, 防止 404
    const decodedPath = decodeURIComponent(to.path)
    if (decodedPath !== to.path) {
      next(Object.assign({}, to, {
        fullPath: decodeURIComponent(to.fullPath),
        path: decodedPath
      }))
    } else {
      next()
    }
  })
}

// 随机获取一种背景颜色
export function getOneBgc () {
  const backgroundColorArr = [
    '#fff3f3',
    '#fcebe7',
    '#fdeedf',
    '#f5fde4',
    '#baa6a6',
    '#fff9da',
    '#e8fcee',
    '#f9e8fe',
    '#dff0fa'
  ]
  const index = Math.floor(Math.random() * backgroundColorArr.length)
  return backgroundColorArr[index]
}