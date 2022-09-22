<!-- 博客首页组件 -->
<template>
  <div class="home-blog">
    <div class="hero" :style="{ ...bgImageStyle }">
      <!-- heroImage区域，包含了heroImage、heroText和tagline -->
      <!-- <div class="heroImageContainer">
        <ModuleTransition>
          <img
            class="hero-img"
            v-if="recoShowModule && $frontmatter.heroImage"
            :style="heroImageStyle || {}"
            :src="$withBase($frontmatter.heroImage)"
            alt="hero"
          />
        </ModuleTransition>

        <ModuleTransition delay="0.04">
          <h1 v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p v-if="recoShowModule && $frontmatter.tagline !== null" class="description">
            {{ $frontmatter.tagline || $description || 'Welcome to your own blog site!!' }}
          </p>
        </ModuleTransition>
      </div> -->
      <!-- 自定义封面格言区域 -->
      <div class="mottosContainer" :style="mottosStyle || {}">
        <ModuleTransition delay="0.04">
          <h1
            class="fzzj"
            v-if="recoShowModule && $frontmatter.heroText !== null"
          >
            {{
              mottos.zh ||
              $frontmatter.heroText ||
              $title ||
              "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。"
            }}
          </h1>
        </ModuleTransition>
        <ModuleTransition delay="0.08">
          <p
            class="kalam"
            v-if="recoShowModule && $frontmatter.heroText !== null"
          >
            {{
              mottos.en ||
              $frontmatter.heroText ||
              $title ||
              "古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。"
            }}
          </p>
        </ModuleTransition>
        <!-- 动态下拉 -->
        <a href="#anchor" class="anchorContainer scroll-down bounce-enter-active down-arrow">
          <img class="anchorImg" :src="anchorImageUrl" alt="anchor" />
        </a>
      </div>
      <!-- 气泡效果结构 -->
      <div id="bubbles" class="bubblesContainer">
      </div>
    </div>

    <!-- 首页左侧博客内容展示区域 -->
    <ModuleTransition delay="0.16">
      <div id="anchor" v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract
            :data="$recoPosts"
            @paginationChange="paginationChange"
          />
        </div>

        <!-- 首页右侧信息展示区域 -->
        <div class="info-wrapper">
          <PersonalInfo />
          <h4>
            <reco-icon icon="reco-category" /> {{ $recoLocales.category }}
          </h4>
          <ul class="category-wrapper">
            <li
              class="category-item"
              v-for="(item, index) in this.$categories.list"
              :key="index"
            >
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span
                  class="post-num"
                  :style="{ backgroundColor: getOneColor() }"
                  >{{ item.pages.length }}</span
                >
              </router-link>
            </li>
          </ul>
          <hr />
          <h4 v-if="$tags.list.length !== 0">
            <reco-icon icon="reco-tag" /> {{ $recoLocales.tag }}
          </h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4
            v-if="
              $themeConfig.friendLink && $themeConfig.friendLink.length !== 0
            "
          >
            <reco-icon icon="reco-friend" /> {{ $recoLocales.friendLink }}
          </h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom />
    </ModuleTransition>
  </div>
</template>

<script>
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  onMounted,
} from "vue-demi";
import TagList from "@theme/components/TagList";
import FriendLink from "@theme/components/FriendLink";
import NoteAbstract from "@theme/components/NoteAbstract";
import { ModuleTransition, RecoIcon } from "@vuepress-reco/core/lib/components";
import PersonalInfo from "@theme/components/PersonalInfo";
import { getOneColor } from "@theme/helpers/other";
import { useInstance } from "@theme/helpers/composable";
import { circleMagic } from "@theme/helpers/utils";

export default defineComponent({
  components: {
    NoteAbstract,
    TagList,
    FriendLink,
    ModuleTransition,
    PersonalInfo,
    RecoIcon,
  },
  setup(props, ctx) {
    const instance = useInstance();

    const state = reactive({
      recoShow: false,
      heroHeight: 0,
    });

    const recoShowModule = computed(
      () => instance && instance.$parent.recoShowModule
    );

    const heroImageStyle = computed(
      () => instance.$frontmatter.heroImageStyle || {}
    );

    // 设置封面格言样式，并暴露出去给config.js来让用户设置
    const mottosStyle = computed(() => instance.$themeConfig.mottosStyle || {});

    // 原先的背景封面图片
    // const bgImageStyle = computed(() => {
    //   // const url = instance.$frontmatter.bgImage
    //   //   ? instance.$withBase(instance.$frontmatter.bgImage)
    //   //   : require('../../images/home-bg.jpg')  //这里设置默认封面图
    //   const url = instance.$themeConfig.bgImage
    //     ? instance.$withBase(instance.$themeConfig.bgImage)
    //     : require("../../images/bg.svg"); //如果用户没有设置背景图，设置主题默认封面图

    //   const initBgImageStyle = {
    //     textAlign: "center",
    //     overflow: "hidden",
    //     background: `url(${url}) center/cover no-repeat `,
    //   };
    //   // 获取用户自定义的样式，优先更高
    //   const { bgImageStyle } = instance.$frontmatter;

    //   return bgImageStyle
    //     ? { ...initBgImageStyle, ...bgImageStyle }
    //     : initBgImageStyle;
    // });

    // 自定义修改的背景图片设置, 随机产生一张图片
    const bgImageStyle = computed(() => {
      const url = instance.$themeConfig.heroImages[Math.floor(Math.random()*instance.$themeConfig.heroImages.length)]
        ? instance.$withBase(instance.$themeConfig.heroImages[Math.floor(Math.random()*instance.$themeConfig.heroImages.length)])
        : require("../../images/wait.jpg"); //如果用户没有设置背景图，设置主题默认封面图

      const initBgImageStyle = {
        textAlign: "center",
        overflow: "hidden",
        background: `url(${url}) center/cover no-repeat `,
      };
      // 获取用户自定义的样式，优先更高
      const { bgImageStyle } = instance.$frontmatter;

      return bgImageStyle
        ? { ...initBgImageStyle, ...bgImageStyle }
        : initBgImageStyle;
    });

    // 封面格言
    const mottos = computed(() => {
      return instance.$themeConfig.mottos[new Date().getDay()];
    });

    // anchorImage的来源url
    const anchorImageUrl = computed(() => {
      return instance.$themeConfig.anchorImage
        ? instance.$withBase(instance.$themeConfig.anchorImage)
        : require("../../images/pika.gif"); //如果用户没有设置，则显示默认动态图片
    });

    onMounted(() => {
      // 添加气泡效果的组件
      // import('vue-canvas-effect/src/components/bubbles').then(module =>{
      //   this.bubbles = module.default
      // })
      state.heroHeight = document.querySelector(".hero").clientHeight;
      state.recoShow = true;
      // 气泡效果
      circleMagic({
        radius: 15,
        density: 0.3,
        // color: "rgba(255,255,255, .4)",
        color: "random", //气泡随机颜色
        clearOffset: 0.2,
      });
    });

    return {
      recoShowModule,
      heroImageStyle,
      bgImageStyle,
      ...toRefs(state),
      getOneColor,
      mottos,
      mottosStyle,
      anchorImageUrl,
    };
  },
  methods: {
    paginationChange(page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight);
      }, 100);
    },
    getPagesByTags(tagInfo) {
      this.$router.push({ path: tagInfo.path });
    },
  },
});
</script>

<style lang="stylus">
// 封面整体区域
.home-blog
  padding: 0
  margin: 0 auto
  // 导航栏下方背景图区域
  .hero
    // margin-top xxx 距离页面顶部导航栏高度大小的距离
    // margin: $navbarHeight auto 0
    position: relative
    box-sizing: border-box
    padding: 0 20px
    height: 100vh
    display: flex
    align-items: center
    justify-content: center
    // 封面heroImage图（非背景大图）
    .hero-img
      max-width: 300px
      margin: 0 auto 1.5rem
    h1
      margin: 20rem auto 1.8rem
      font-size: 2.5rem
    .description
      margin: 1.8rem auto
      font-size: 1.6rem
      line-height: 1.3
    // 封面格言区域
    .mottosContainer
      display: block
      text-align: center
      // 字体颜色设置
      color: #CC3299
      font-size: 2.4rem
      h1
        margin: 20rem auto 1.8rem
        font-size: 4rem
      .anchorImg
        max-width: 200px
        width: 6rem
        height: 4rem
        display: block
        background: #fff
        border-radius: 2rem
    // 气泡效果区域
    .bubblesContainer
      position: absolute
      height: 100%
      width: 100%
      z-index 1
    .anchorContainer
      position relative
      z-index: 10

  // 背景图下方的文档内容区域
  .home-blog-wrapper
    display: flex
    align-items: flex-start
    margin: 0 auto
    padding: 3rem
    max-width: $homePageWidth
    .blog-list
      flex: auto
      width: 0
      .abstract-wrapper
        .abstract-item:last-child
          margin-bottom: 0px
    .info-wrapper
      position: -webkit-sticky
      position: sticky
      top: 4.4rem
      overflow: hidden
      transition: all 0.3s
      margin-left: 15px
      flex: 0 0 300px
      height: auto
      box-shadow: var(--box-shadow)
      border-radius: $borderRadius
      box-sizing: border-box
      padding: 0 15px
      background: var(--background-color)
      &:hover
        box-shadow: var(--box-shadow-hover)
      h4
        color: var(--text-color)
      .category-wrapper
        list-style: none
        padding-left: 0
        .category-item
          margin-bottom: 0.4rem
          padding: 0.4rem 0.8rem
          transition: all 0.5s
          border-radius: $borderRadius
          box-shadow: var(--box-shadow)
          background-color: var(--background-color)
          &:hover
            transform: scale(1.04)
            a
              color: $accentColor
          a
            display: flex
            justify-content: space-between
            align-items: center
            color: var(--text-color)
            .post-num
              width: 1.6rem
              height: 1.6rem
              text-align: center
              line-height: 1.6rem
              border-radius: $borderRadius
              background: #eee
              font-size: 13px
              color: #fff
@media (max-width: $MQMobile)
  .home-blog
    .hero
      position: relative
      box-sizing: border-box
      height: 100vh
      display: flex
      align-items: center
      justify-content: center
      // 封面格言区域
      .mottosContainer
        display: block
        text-align: center
        // 字体颜色设置
        color: #CC3299
        font-size: 1.2rem
        h1
          margin: 8rem auto 1.8rem
          font-size: 1.6rem
        .anchorImg
          max-width: 200px
          width: 100%
          display: block
          background: #fff
          border-radius: 2rem
      img
        max-height: 210px
        margin: 2rem auto 1.2rem
      h1
        margin: 0 auto 1.8rem
        font-size: 2rem
      .description
        font-size: 1.2rem
      .action-button
        font-size: 1rem
        padding: 0.6rem 1.2rem
    .home-blog-wrapper
      display: block !important
      .blog-list
        width: auto
      .info-wrapper
        // display none!important
        margin-left: 0
        .personal-info-wrapper
          display: none
@media (max-width: $MQMobileNarrow)
  .home-blog
    .hero
      position: relative
      box-sizing: border-box
      height: 40vh
      display: flex
      align-items: center
      justify-content: center
      // 封面格言区域
      .mottosContainer
        display: none
      img
        max-height: 210px
        margin: 2rem auto 1.2rem
      h1
        margin: 0 auto 1.8rem
        font-size: 2rem
      h1, .description, .action
        // margin: 1.2rem auto;
      .description
        font-size: 1.2rem
      .action-button
        font-size: 1rem
        padding: 0.6rem 1.2rem
    .home-blog-wrapper
      display: block !important
      margin: 0 auto
      padding:  2rem
      .blog-list
        width: auto
      .info-wrapper
        // display none!important
        margin-left: 0
        .personal-info-wrapper
          display: none


// 封面动画下拉区域
.scroll-down
  display: block
  margin: 12rem auto 0 auto
  bottom: 6rem
  // width: 20px
  // height: 20px
  font-size: 20rem
  text-align: center
.bounce-enter-active
  animation: bounce-in 3s 2s infinite
// .bounce-leave-active
// animation: bounce-in 4s 2s reverse
@keyframes bounce-in
  0%
    transform: translateY(0)
  20%
    transform: translateY(0)
  50%
    transform: translateY(-4rem)
  80%
    transform: translateY(0)
  100%
    transform: translateY(0)
.down-arrow
  width: 100px
  height: 100px
</style>