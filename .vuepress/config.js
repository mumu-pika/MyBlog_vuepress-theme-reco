// 引入模块
const plugins = require('./config/plugins')
const mottos = require('./config/mottos')
const covers = require('./config/covers')
const heroImages = require('./config/heroImages')

module.exports = {
  "title": "木木的秘密花园", //左上角网站标题
  "description": "mumu 's blog",  //网站描述，会在首次loading页面时加载
  "dest": "public",  //vuepress build 的输出目录
  "head": [
    // 为document.head部分添加link标签
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    // 移动端优化，（搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，优化）
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    // 添加script标签
    // 每日一词的script标签 https://www.jinrishici.com/
    [
      "script",
      {
        "src": "https://sdk.jinrishici.com/v2/browser/jinrishici.js",
        "charset": "utf-8"
      }
    ]
  ],

  // 主题配置 （这里是在reco主题的基础上做自定义修改）
  "themeConfig": {
    // 首页封面格言
    "mottos": mottos,
    "mottosStyle": {
      "color": "#ffe8f6"
    },
    //首页封面大图, 注意这里传递的是一个数组
    "heroImages": heroImages,

    // 博客文章封面图
    "covers": covers,

    // 顶部导航栏配置
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
      {
        "text": "About",
        "icon": "reco-account",
        "link": "/about/",

      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/mumu-pika",
            "icon": "reco-github"
          }
        ]
      }
    ],
    // 左侧侧边栏配置
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "dailymotto"
      ]
    },
    // 博客配置
    "blogConfig": {
      "category": {
        "location": 2,   //在导航栏菜单中从左至右所占的位置，默认2
        "text": "Category"  //默认文案 “分类”
      },
      "tag": {
        "location": 3, //在导航栏菜单中从左至右所占的位置，默认3
        "text": "Tag" //默认文案 “标签”
      }
    },
    // 友情链接
    "friendLink": [
      {
        "title": "午后南杂",
        "desc": "Enjoy when you can, and endure when you must.",
        "email": "1156743527@qq.com",
        "link": "https://www.recoluan.com"
      },
      {
        "title": "vuepress-theme-reco",
        "desc": "A simple and beautiful vuepress Blog & Doc theme.",
        "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        "link": "https://vuepress-theme-reco.recoluan.com"
      }
    ],
    // 社交信息
    "socials":{
      "github" : "https://github.com/GodLikeZeal", //github
      "gitlub" : false, //gitlub
      "gitee" : "https://gitee.com/GodLikeZeal", //gitee
      "jianshu" : "https://www.jianshu.com/u/e2d051b6d2e9", //简书
      "zhihu" : "https://www.zhihu.com/people/qian-ge-diao-63", //知乎
      "toutiao" : false, //知乎
      "juejin": "https://juejin.im/user/2796746683716990", //掘金
      "segmentfault" : "https://segmentfault.com/u/zeal_5eecb699bdb08", //思否
      "csdn" : false, //CSDN
      "wechat" : "你的微信", //微信
      "qq" : "你的QQ" //QQ
    },

    // 其他部分
    "type": "blog", // 设置好网站首页，会显示HomeBlog.vue。如果注释掉，会显示Home.vue组件。
    // "bgImage": 'https://cdn.jsdelivr.net/gh/mumu-pika/MyBlogCDN/images/anime/wait.jpg', //背景图片设置，由heroImages代替
    "anchorImage": './images/pika.gif', //触发下拉图片设置
    "logo": "/logo.png", //导航栏左侧logo
    "search": true,  //顶部搜索栏，true表示开启搜索
    "searchMaxSuggestions": 10, //输入所要搜索的内容之后，搜索提示的最大数量
    "startYear": '2022',     //项目开始时间
    "lastUpdated": "Last Updated",  //最后更新的时间，显示在博客或文档底部
    "author": "mumu", //网站搭建者名称
    "authorAvatar": "/avatar.png", //网站搭建者avatar，会显示在首页
    "record": "mumu 's blog", // 记录，可以记录网站访问量，这里暂时先写description
    "startYear": "2022", //底部网站运行开始时间
    "codeTheme": "tomorrow", //代码块中代码的样式，这里的主题选取自PrismJS中的prism-themes
    // 配置评论valine的appId和appKey, 我这边自定义配置写在Valine.vue中
    "valineConfig": {},

  },
  // 插件配置 (这里将插件分离出去，详见./config/plugins)
  plugins,
  "markdown": {
    "lineNumbers": true //显示行号
  }
}