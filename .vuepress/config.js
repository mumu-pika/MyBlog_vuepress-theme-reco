// 引入插件模块
const plugins = require('./config/plugins')

module.exports = {

  "title": "木木的秘密花园", //左上角网站标题
  "description": "mumu 's blog",  //网站描述，会在首次loading页面时加载
  "dest": "dist",  //vuepress build 的输出目录
  "head": [
    // 为document.head部分添加link标签
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    // 移动端适配
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],

  // 主题配置 （这里是在reco主题的基础上做自定义修改）
  "themeConfig": {
    // 封面格言
    "mottos": [{
      "zh": "愿你有诗，有梦，有坦荡荡的远方，敬往事一杯酒，过去不回头，未来不将就。",
      "en": "May you have poetry, dreams, and a magnanimous distance, a glass of wine to the past, no turning back in the past, and no future in the future."
    },
    {
      "zh": "保持对生活的热爱和喜悦，热心地过好每一天！",
      "en": "Keep the love and joy of life, and live every day enthusiastically!"
    },
    {
      "zh": "再坚持一下，一切都会好起来的。",
      "en": "Hang in there, and everything will be fine."
    },
    {
      "zh": "蒲公英，无牵无挂，无欲无求，风起而行，风静而安。",
      "en": "Dandelion, no worries, no desires, no desires, the wind rises and goes, the wind is quiet and peaceful."
    },
    {
      "zh": "生活不是等待风暴过去，而是学会在雨中翩翩起舞。",
      "en": "Life is not about waiting for the storm to pass, but learning to dance in the rain."
    },
    {
      "zh": "一心一明月，一树一年华",
      "en": "One heart, one bright moon, one tree year by year"
    },
    {
      "zh": "拥抱你爱的人是最好的感觉~",
      "en": "Hugging the person you love is the best feeling~"
    }
    ],
    "mottosStyle" : {
      "color": "#ff91d5ff"
    },
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
        "api"
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

    // 其他部分
    "type": "blog", // 设置好网站首页，会显示HomeBlog.vue。如果注释掉，会显示Home.vue组件。
    "bgImage": './images/avlon.jpg', //背景图片设置
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
    "codeTheme": "tomorrow" //代码块中代码的样式，这里的主题选取自PrismJS中的prism-themes

  },
  // 插件配置 (这里将插件分离出去，详见./config/plugins)
  plugins,
  "markdown": {
    "lineNumbers": true //显示行号
  }
}