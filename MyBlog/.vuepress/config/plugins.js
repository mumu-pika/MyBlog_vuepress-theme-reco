// 这里封装博客所需要用到的插件

module.exports = [
  // 使用来自依赖包的插件
  //如果插件名以 vuepress-plugin- 开头，你可以使用缩写来省略这个前缀

  // live2D看板娘插件  https://github.com/vuepress-reco/vuepress-plugin-kan-ban-niang
  // 因为加载可能会有问题产生，故暂不使用看板娘插件
  // [
  //     '@vuepress-reco/vuepress-plugin-kan-ban-niang',
  //     {
  //         // theme仅包含一个值是默认为此主题并隐藏更换主题按钮
  //         // theme为多个值时初始化默认为第一个主题，点击更换主题按钮随机更换数组内的其他主题
  //         theme: ['koharu','blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
  //         clean: false,  // 标识是否隐藏右侧信息
  //         messages: {
  //             welcome: '再次遇见你啦!',
  //             home: '一闪一闪亮晶晶，满天都是小星星~~',
  //             theme: '呦吼！想看看我的小伙伴们嘛！',
  //             close: '愿你出走半生，归来仍是少年。'
  //         },
  //         modelStyle: {
  //           position: "fixed",
  //           right: "5vw",
  //           bottom: "0",
  //           opacity: "0.9",
  //           zIndex: 99999
  //         }
  //     }
  // ],

  //为博客文章自动随机添加名人名言或其他，可自定义样式和内容的插件。 https://github.com/zpj80231/vuepress-plugin-boxx
  [
    'vuepress-plugin-boxx'
  ],

  // 添加动态标题的插件  https://github.com/moefyit/vuepress-plugin-dynamic-title
  [
    'vuepress-plugin-dynamic-title',
    {
      showIcon: '/favicon.ico',
      showText: '(/≧▽≦/)花园朵朵开~',
      hideIcon: '/failure.ico',
      hideText: '(●—●) oh No！不要走！',
      recoverTime: 2000,
    }
  ],

  //光标效果的插件 https://github.com/moefyit/vuepress-plugin-cursor-effects
  [
    'vuepress-plugin-cursor-effects',
    // {
    //     size: 2, // size of the particle, default: 2
    //     shape: ['star' | 'circle'], // shape of the particle, default: 'star'
    //     zIndex: 999999999, // z-index property of the canvas, default: 999999999
    // }
  ],

  // 气泡效果的插件 https://github.com/chenxuan0000/vue-canvas-effect/blob/master/document/README.md
  [
    // 'vue-canvas-effect'
  ],

  // 背景樱花特效 https://github.com/JabinPeng/vuepress-plugin-sakura
  [
    'vuepress-plugin-sakura',
    {
      num: 16,  // 默认数量
      show: true, //  是否显示
      zIndex: -1,   // 层级
      img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '...'     // 绝对路径
      }
    }
  ],

  // Vuepress 音乐播放器插件 https://github.com/vuepress-reco/vuepress-plugin-bgm-player
  [
    '@vuepress-reco/vuepress-plugin-bgm-player',
    {
      audios: [
        // 本地资源播放
        // {
        //     name: 'sorrow',
        //     artist: 'hill',
        //     url:'/audio/music/sorrow/hil - Sorrow.mp3',
        //     cover:'/audio/music/sorrow/sorrowCover.jpg'
        // },
        // 网络资源获取
        {
          name: '夜空中最亮的星',
          artist: '逃跑计划',
          url: 'https://music.163.com/song/media/outer/url?id=25706282',
          cover: 'http://p1.music.126.net/Eef2K2KV9dT3XUA6_Ve-Rw==/109951165543196748.jpg?param=130y130'
        },
        {
          name: '最初的梦想',
          artist: '我想和你唱',
          url: 'https://music.163.com/song/media/outer/url?id=479422062',
          cover: 'http://p1.music.126.net/9FhJLS1BrJdXAUJ2qjyJSg==/19212866183896782.jpg?param=130y130'
        },
        {
          name: '屋顶',
          artist: '周杰伦 / 温岚',
          url: 'https://music.163.com/song/media/outer/url?id=5257138',
          cover: 'http://p1.music.126.net/81BsxxhomJ4aJZYvEbyPkw==/109951165671182684.jpg?param=130y130'
        },
      ],
      autoplay: false, //是否自动播放
      autoShrink: true, //是否自动缩小
      floatPosition: 'left', //指定浮窗模式浮动在哪一侧
      // 播放器位置
      position: {
        left: '1rem',
        bottom: '1rem',
        'z-index': '99999'
      }
    }
  ],

  // 评论插件 这里选用valine, 主题已经预配置好，见 index.js
  // https://www.npmjs.com/package/@vuepress-reco/vuepress-plugin-comments
  // [
  //     '@vuepress-reco/vuepress-plugin-comments'
  // ],

  // 图片懒加载
  // https://github.com/tolking/vuepress-plugin-img-lazy
  [
    'vuepress-plugin-img-lazy'
  ],

  // 代码块复制代码功能 掘金风格
  // https://www.npmjs.com/package/vuepress-plugin-nuggets-style-copy
  [
    "vuepress-plugin-nuggets-style-copy",
    {
      copyText: "复制",
      tip: {
        content: "复制成功!"
      }
    }
  ],
  // 猫耳置顶插件
  // https://github.com/MisakaTAT/GoTop
  // [
  //   'vuepress-plugin-go-top'
  // ],

  // PWA插件
  // https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/plugin-pwa
  [
    '@vuepress/plugin-pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: "新的异世界挑战出现！",
        buttonText: "冒险！冲！"
      }
    }
  ],
]