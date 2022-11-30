---
title: 木木的秘密花园网站搭建
date: 2022-06-10
tags:
- notes
categories:
 - website
---

::: warning 摘要
在vue-theme-reco主题的基础上，木木去做了自定义的修改及美化，在深入了解主题的组成之后，也期望能在此书写属于自己的coding世界！
:::


![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)

::: tip 关于使用的主题
主题为[Vuepress-theme-reco主题](https://vuepress-theme-reco.recoluan.com/)。

其实还有一个可能更为优秀的主题[vuepress-theme-vdoing主题](https://doc.xugaoyi.com/),
有许多资源也是参考来自于这里。

对于更深入的去配置的话, 是需要去对应的vuepress社区中, 对应的[vuepress文档](https://vuepress.vuejs.org/)

更多细节可以去源码看看。
:::

### 配置config.js
::: warning 配置
  网站大致的配置都是在.vuepress目录下的config.js文件中。
  这里我拆分出几个模块:
  *  plugins     需要安装的插件
  *  mottos      封面的格言
  *  covers      博客列表中每一项的小缩略图
  *  heroImages  封面背景大图

  配置文件还需要配置好全局的head, 根据vuepress文档那样配置就可以。

  其他的比方说添加额外的页面之类的就需要深入去研究下theme目录了。
:::
``` javascript
// 引入模块
const plugins = require('./config/plugins')
const mottos = require('./config/mottos')
const covers = require('./config/covers')
const heroImages = require('./config/heroImages')

module.exports = {
  title: '木木的秘密花园', //左上角网站标题
  description: "mumu 's blog", //网站描述，会在首次loading页面时加载
  dest: 'dist', //vuepress build 的输出目录
  head: [
    // DNS 预解析 dns-prefetch , 是为了优化图片加载的速度
    ['link', { rel: 'dns-prefetch', href: 'https://s2.loli.net' }],
    // 为document.head部分添加link标签
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // deploying a manifest
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    // 移动端优化，（搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，优化）
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ],
    // 百度SEO优化
    ['meta', { name: 'baidu-site-verification', content: 'code-CekZJFvXZM' }],
    [
      'meta',
      {
        name: 'description',
        content:
          '【木木的秘密花园】这里是木木的个人博客, 分享前端开发、个人生活的博客。欢迎来交换友链~ 一起学习进步！'
      }
    ],
    [
      'meta',
      { name: 'keywords', content: '博客_vuepress搭建个人博客_reco主题' }
    ],
    // 添加script标签
    // 每日一词的script标签 https://www.jinrishici.com/
    [
      'script',
      {
        src: 'https://sdk.jinrishici.com/v2/browser/jinrishici.js',
        charset: 'utf-8'
      }
    ]
  ],

  // 主题配置 （这里是在reco主题的基础上做自定义修改）
  themeConfig: {
    // 首页封面格言
    mottos: mottos,
    mottosStyle: {
      color: '#ffe8f6'
    },
    //首页封面大图, 注意这里传递的是一个数组
    heroImages: heroImages,

    // 博客文章封面图
    covers: covers,

    // 顶部导航栏配置
    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: 'TimeLine',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: 'Docs',
        icon: 'reco-message',
        items: [
          {
            text: '记事本',
            link: '/docs/'
          }
        ]
      },
      {
        text: 'About',
        icon: 'reco-account',
        link: '/about/'
      },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/mumu-pika',
            icon: 'reco-github'
          },
          {
            text: '微信公众号',
            link: 'https://mp.weixin.qq.com/s/tYV7BDCiLxyetAP6U44EYw',
            icon: 'reco-wechat'
          },
          {
            text: '语雀',
            link: 'https://www.yuque.com/u28791688',
            icon: 'reco-coding'
          }
        ]
      }
    ],
    // 左侧侧边栏配置
    sidebar: {
      '/docs/': ['', 'theme', 'markdown', 'dailymotto']
    },
    // 右侧侧边栏全局开启
    subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    // 博客配置
    blogConfig: {
      category: {
        location: 2, //在导航栏菜单中从左至右所占的位置，默认2
        text: 'Category' //默认文案 “分类”
      },
      tag: {
        location: 3, //在导航栏菜单中从左至右所占的位置，默认3
        text: 'Tag' //默认文案 “标签”
      }
    },
    // 友情链接
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com'
      },
      {
        title: 'ssw’s Blog',
        desc: 'ssw’s Blog',
        logo: 'http://ssw.fit/pic/vehicle.jpeg',
        link: 'http://ssw.fit/'
      }
    ],
    // 社交信息
    socials: {
      github: 'https://github.com/GodLikeZeal', //github
      gitlub: false, //gitlub
      gitee: 'https://gitee.com/GodLikeZeal', //gitee
      jianshu: 'https://www.jianshu.com/u/e2d051b6d2e9', //简书
      zhihu: 'https://www.zhihu.com/people/qian-ge-diao-63', //知乎
      toutiao: false, //知乎
      juejin: 'https://juejin.im/user/2796746683716990', //掘金
      segmentfault: 'https://segmentfault.com/u/zeal_5eecb699bdb08', //思否
      csdn: false, //CSDN
      wechat: '你的微信', //微信
      qq: '你的QQ' //QQ
    },

    // 其他部分
    type: 'blog', // 设置好网站首页，会显示HomeBlog.vue。如果注释掉，会显示Home.vue组件。
    // "bgImage": 'https://cdn.jsdelivr.net/gh/mumu-pika/MyBlogCDN/images/anime/wait.jpg', //背景图片设置，由heroImages代替
    anchorImage: './images/pika.gif', //触发下拉图片设置
    logo: '/logo.png', //导航栏左侧logo
    search: true, //顶部搜索栏，true表示开启搜索
    searchMaxSuggestions: 10, //输入所要搜索的内容之后，搜索提示的最大数量
    startYear: '2022', //项目开始时间
    lastUpdated: 'Last Updated', //最后更新的时间，显示在博客或文档底部
    author: 'mumu', //网站搭建者名称
    authorAvatar: '/avatar.png', //网站搭建者avatar，会显示在首页
    record: "mumu 's blog", // 记录，可以记录网站访问量，这里暂时先写description
    startYear: '2022', //底部网站运行开始时间
    codeTheme: 'tomorrow', //代码块中代码的样式，这里的主题选取自PrismJS中的prism-themes
    // 配置评论valine的appId和appKey, 我这边自定义配置写在Valine.vue中
    valineConfig: {},
    smoothScroll: true //启用页面滚动效果
  },
  // 插件配置 (这里将插件分离出去，详见./config/plugins)
  plugins,
  markdown: {
    lineNumbers: true //显示行号
  }
}

```


### 主题初始的readme.md
``` json
home: true
heroText: 木木的秘密花园~
tagline: 古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。
heroImage: /hero.jpg
heroImageStyle: {
  maxWidth: '600px',
  width: '100%',
  display: block,
  margin: '6rem auto 2rem',
  background: '#fff',
  borderRadius: '1rem',
}
# bgImageStyle: {
#   height: '450px'
# }

isShowTitleInHome: false
actionText: Guide
actionLink: /blogs/other/guide
features:
- title: Yesterday
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题
- title: Today
  details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
- title: Tomorrow
  details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
- title: Wishes
  details: 木木很感激一路上的经历，前路的同行者们，谢谢有你们分享的技术！

```
