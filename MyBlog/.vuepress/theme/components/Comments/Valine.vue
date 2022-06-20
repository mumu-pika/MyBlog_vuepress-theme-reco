<!-- 评论区Valine 样式 -->
<!-- Leancloud官网 Serverless云服务  https://www.leancloud.cn/ -->
<!-- valine 官方文档地址：https://valine.js.org/configuration.html -->
<template>
  <div class="valine-wrapper">
    <!-- 诗词区域 -->
    <div class="poemContainer">
      <span class="poemContent fzzj">{{poem.poemContent}}</span>
      <span class="poemTitle">「{{poem.poemTitle}}」</span>
      <div class="poemInfoContainer">
        <span class="poemDynasty">{{poem.dynasty}}</span>
        <span class="poemPoet">{{poem.poet}}</span>
      </div>
    </div>
    <!-- valine区域 -->
    <!-- :style="{'color': getOneBgc()} -->
    <div id="valine">
      <!-- <span id="jinrishici-sentence">正在加载今日诗词....</span> -->
    </div>
  </div>
</template>
<script>
// import { getOneBgc } from '@theme/helpers/other'
const bilibiliEmoji = require("@theme/lib/bilibiliEmoji.js")

export default {
  name: "Valine",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data(){
    return {
      poem:{
        poemContent: "与君歌一曲，请君为我倾耳听",  //诗词内容
        poemTitle: "将进酒",    //诗词题目
        dynasty: '唐',         //诗词朝代
        poet: '李白',          //诗人或词人

      }
    }
  },
  mounted: function () {
    this.initValine();
  },
  methods: {
    // valine 官方文档地址：https://valine.js.org/configuration.html
    // Serverless云服务：https://www.leancloud.cn/
    // 今日诗词文档 https://www.jinrishici.com/
    initValine() {
      const Valine = require("valine");
      var that = this
      // 获取今日诗词
      jinrishici.load(function (result) {
        that.poem.poemContent = result.data.content
        that.poem.poemTitle = result.data.origin.title
        that.poem.dynasty = result.data.origin.dynasty
        that.poem.poet = result.data.origin.author
        // document.getElementById("veditor").setAttribute("placeholder", poem)
        // document.getElementById("poemContent").setAttribute("innerText", poem)
      });
      const valineOptions = {
        el: "#valine", //指定dom元素
        appId: "l1TQa0cVg7KMYNiBJnd5HBpk-9Nh9j0Va", //appId, 注册登录leanCloud后获取
        appKey: "S502GjMdAgHTdWwUoFSnEcsM", //appKey, 注册登录leanCloud后获取
        placeholder: "", //Comment box  placeholder
        notify: false,
        verify: false,
        avatar: "monsterid", //avatar 头像配置，Valine 目前使用的是Gravatar 作为评论列表头像。
        pageSize: 10, //评论列表分页，每页条数, 默认值为10
        visitor: true, //文章访问统计, 默认值为关闭false
        highlight: true, //代码高亮，默认值开启为true
        recordIP: false, //是否记录评论者IP, 默认值关闭为false
        path: window.location.pathname,
        // 表情title和图片映射
        emojiMaps: bilibiliEmoji,
        ...this.options,
      };

      new Valine(valineOptions);
    },
    // 随机获取一种背景颜色
    // getOneBgc
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        // 切换页面时刷新评论
        // this.$router.go(0)
        setTimeout(() => {
          this.initValine();
        }, 300);
      }
    },
  },
};
</script>

<style lang="stylus">
// 需引入wrapper.styl，做移动端适配
// @require '../../styles/wrapper.styl'

#valine.v
  .vbtn
    color: var(--text-color)
    font-weight: bold
    border: 1px solid #eaecef
    border-color: var(--border-color)
    // 鼠标悬停在按钮上
    &:hover
      color: $accentColor
      border-color: $accentColor
  // 评论区主要区域
  .vwrap
    background: rgba(255,255,255,0)
    background: var(--comment-background-color)
    border: 1px solid #eaecef
    border-radius: 2%
    border-color: var(--border-color)
    // 评论区域顶部用户信息输入区域
    .vheader .vinput
      border-bottom: 1px dashed var(--border-color)
      text-align: center
      font-size 1rem
      color: var(--comment-userInfo-color)
      &:focus
        border-bottom-color: $accentColor
      &:-internal-autofill-selected
        background-color: var(--code-color) !important
    // 评论输入框区域
    .vedit
      // 设置伪类，使得 背景图片半透明化
      &::before
        content: ''
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-image: url("https://cdn.jsdelivr.net/gh/mumu-pika/MyBlogCDN/images/anime/removebg/saberLion.png")
        background-size: contain
        background-repeat: no-repeat
        background-position: right
        opacity: 0.2
        z-index -1
      .vinput
        color: var(--comment-text-color)
        font-size: 1rem
  .vinfo
    padding-left: 0.6rem
  // 其他评论展示区域
  .vcard
    .vquote
      margin-left: 0
      border-left: none
    .vimg
      width: 2.8rem
      height: 2.8rem
      border-radius: 0.25rem
      border: none
    .vhead .vnick
      color: $accentColor
      &::before
        background: $accentColor
    // 上方用户信息展示
    .vh
      border-bottom: none
      // 用户系统展示
      .vhead .vsys
        color: var(--text-color)
        background: var(--comment-background-color)
      .vmeta
        margin-bottom: 1rem
        // 评论事件
        .vtime
            color: var(--text-color)
        .vat
          margin-right: 0.3rem
          background: rgba(27, 31, 35, 0.05)
          background: var(--code-color)
          border-radius: 0.25rem
          padding: 0 0.4rem
          color: var(--text-color)
          border: 1px solid #eaecef
          border-color: var(--border-color)
          &:hover
            color: $accentColor
            border-color: $accentColor
      .vcontent
        background: var(--comment-background-color)
        border-radius: 0.25rem
        margin: 0 0.3rem
        padding: 0.1rem 0.6rem 0.05rem 0.6rem
        p
          color: var(--text-color)
          .at
            color: $accentColor
        &.expand:before
          z-index: 1
          background: linear-gradient(180deg, rgba(255, 255, 255, 0), #fff)
          background: linear-gradient(180deg, rgba(255, 255, 255, 0), var(--background-color))
        &.expand:after
          color: $accentColor
          color: var(--text-color)
          background: #fff
          background: var(--background-color)
  .info
    padding-right: 0.6rem
  code, pre, .vbtn
    background: var(--background-color)
    color: var(--text-color)
  a
    color: $accentColor
    &::before
      background: $accentColor


@media (min-width: $MQNarrow)
  .valine-wrapper
    position relative
    font-size: 0.5rem
    // 诗词显示区域
    .poemContainer
      position absolute
      left: 50%
      top: 12rem
      transform: translate(-50%,-50%)
      width: 50rem
      height: 10rem
      color: var(--poem-color)
      background-color: transparent
      display: flex
      flex-direction: column
      text-align: center
      justify-content: center
      .poemContent
        flex-wrap: wrap
      .poemTitle
        font-size 1rem
      .poemInfoContainer
        display: inline
        font-size: 1rem
      span
        margin: 1rem 0
        &.poemContent
          font-size: 2.6rem



@media (max-width: $MQNarrow)
  .valine-wrapper
    position relative
   .poemContainer
    position absolute
    left: 50%
    top: 16rem
    transform: translate(-50%,-50%)
    width: 30rem
    height: 10rem
    color: var(--poem-color)
    background-color: transparent
    span.poemContent
      font-size: 1.8rem
      margin: 0.8rem 0
    .poemTitle
      font-size 0.8rem
    .poemInfoContainer
      display: inline
      font-size: 0.8rem

@media (max-width: $MQMobileNarrow)
  .valine-wrapper
    position relative
   .poemContainer
    position absolute
    left: 50%
    top: 18rem
    transform: translate(-50%,-50%)
    width: 10rem
    height: 10rem
    color: var(--poem-color)
    background-color: transparent
    span.poemContent
      font-size: 1.2rem
      margin: 0.5rem 0
    .poemTitle
      font-size 0.6rem
    .poemInfoContainer
      display: inline
      font-size: 0.6rem
</style>
