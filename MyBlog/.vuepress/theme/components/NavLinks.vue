<!-- 顶部导航栏的导航内容, 布局偏右 -->
<template>
  <div ref="wrapper" class="navLinksContainer">
    <nav ref="content" class="nav-links" v-if="userLinks.length || repoLink">
      <!-- user links -->
      <div
        class="nav-item"
        v-for="item in userLinks"
        :key="item.link"
      >
        <!-- 下拉链接 -->
        <DropdownLink v-if="item.type === 'links'" :item="item" />
        <NavLink v-else :item="item" />
      </div>

      <!-- repo link -->
      <a
        v-if="repoLink"
        :href="repoLink"
        class="repo-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <reco-icon :icon="`reco-${repoLabel.toLowerCase()}`" />
        {{ repoLabel }}
        <OutboundLink />
      </a>
    </nav>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, nextTick } from "vue-demi";
import { RecoIcon } from "@vuepress-reco/core/lib/components";
import DropdownLink from "@theme/components/DropdownLink";
import { resolveNavLinkItem } from "@theme/helpers/utils";
import NavLink from "@theme/components/NavLink";
import { useInstance } from "@theme/helpers/composable";
// import Scroll from './Scroll.vue'

import BScroll from "better-scroll";

export default defineComponent({
  components: { NavLink, DropdownLink, RecoIcon, BScroll },

  setup(props, ctx) {
    const instance = useInstance();

    const userNav = computed(() => {
      return instance.$themeLocaleConfig.nav || instance.$themeConfig.nav || [];
    });

    const nav = computed(() => {
      const locales = instance.$site.locales || {};

      if (locales && Object.keys(locales).length > 1) {
        const currentLink = instance.$page.path;
        const routes = instance.$router.options.routes;
        const themeLocales = instance.$themeConfig.locales || {};
        const languageDropdown = {
          text: instance.$themeLocaleConfig.selectText || "Languages",
          items: Object.keys(locales).map((path) => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === instance.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(instance.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some((route) => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          }),
        };

        return [...userNav.value, languageDropdown];
      }

      // blogConfig 的处理，根绝配置自动添加分类和标签
      const blogConfig = instance.$themeConfig.blogConfig || {};
      const isHasCategory = userNav.value.some((item) => {
        if (blogConfig.category) {
          return item.text === (blogConfig.category.text || "分类");
        } else {
          return true;
        }
      });
      const isHasTag = userNav.value.some((item) => {
        if (blogConfig.tag) {
          return item.text === (blogConfig.tag.text || "标签");
        } else {
          return true;
        }
      });

      if (
        !isHasCategory &&
        Object.hasOwnProperty.call(blogConfig, "category")
      ) {
        const category = blogConfig.category;
        const $categories = instance.$categories;
        userNav.value.splice(parseInt(category.location || 2) - 1, 0, {
          items: $categories.list.map((item) => {
            item.link = item.path;
            item.text = item.name;
            return item;
          }),
          text: category.text || instance.$recoLocales.category,
          // 设置类型
          type: "links",
          icon: "reco-category",
        });
      }

      if (!isHasTag && Object.hasOwnProperty.call(blogConfig, "tag")) {
        const tag = blogConfig.tag;
        userNav.value.splice(parseInt(tag.location || 3) - 1, 0, {
          link: "/tag/",
          text: tag.text || instance.$recoLocales.tag,
          type: "links",
          icon: "reco-tag",
        });
      }

      return userNav.value;
    });

    const userLinks = computed(() => {
      return (instance.nav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    });

    const repoLink = computed(() => {
      const { repo } = instance.$themeConfig;

      if (repo) {
        return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`;
      }

      return "";
    });

    const repoLabel = computed(() => {
      if (!instance.repoLink) return "";
      if (instance.$themeConfig.repoLabel) {
        return instance.$themeConfig.repoLabel;
      }

      const repoHost = instance.repoLink.match(/^https?:\/\/[^/]+/)[0];
      const platforms = ["GitHub", "GitLab", "Bitbucket"];
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (new RegExp(platform, "i").test(repoHost)) {
          return platform;
        }
      }

      return "Source";
    });

    onMounted(() => {
      // 保证在DOM渲染完毕后初始化better-scroll
      // 其实我们在这里把 this.$nextTick 替换成 setTimeout(fn, 20) 也是可以的
      // （20 ms 是一个经验值，每一个 Tick 约为 17 ms），对用户体验而言都是无感知的。
      setTimeout(() => {
        initScroll()
      }, 20);
    });

    // 滚动条函数
    function initScroll() {
      // if (!instance.$refs.wrapper) {
      //   return;
      // }
      // 下面这两行可以针对于列表数据为动态时候设置
      // let width = userLinks.value.length * 100; // 动态计算出滚动区域的大小，产生滚动的原因是滚动区域宽度大于父盒子宽度
      // instance.$refs.content.style.width = width + "px"; // 修改滚动区域的宽度
      nextTick(() => {
        if (!instance.scroll) {
          // 如果有wrapper, 进行better-scroll的初始化
          instance.scroll = new BScroll(instance.$refs.wrapper, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false //是否阻止默认事件，比如事件的委托
          });
        } else {
          instance.scroll.refresh(); //如果dom结构发生改变调用该方法, 更新
        }
      });
    }

    return { userNav, nav, userLinks, repoLink, repoLabel, initScroll };
  },
});
</script>

<style lang="stylus">

@media (min-width: $MQNarrow)
  .navLinksContainer
    width: 46vw
    // 注意，这里的hidden是必要的，保证能够滚动
    overflow: hidden
    // 这里设置hover:visible是为了.nav-item中的.dropdown-wrapper里的nav-dropdown能够显示
    &:hover
      overflow: visible
    .nav-links
      display: inline-block
      a
        line-height: 1.4rem
        color: var(--text-color)
        &:hover, &.router-link-active
          color: $accentColor
          .iconfont
            color: $accentColor
      .nav-item
        position: relative
        display: inline-block
        margin-left: 1.5rem
        line-height: 2rem
        &:first-child
          margin-left: 0
      .repo-link
        margin-left: 1.5rem


@media (max-width: $MQNarrow)
  .navLinksContainer
    width: 46vw
    // 注意，这里的hidden是必要的，保证能够滚动
    overflow: hidden
    // 这里设置hover:vsible是为了.nav-item中的.dropdown-wrapper里的nav-dropdown能够显示
    &:hover
      overflow: visible
    .nav-links
      display: inline-block
      a
        line-height: 1.4rem
        color: var(--text-color)
      &:hover, &.router-link-active
        color: $accentColor
        .iconfont
          color: $accentColor
      .nav-item
        position: relative
        display: inline-block
        margin-left: 2rem
        line-height: 2rem

@media (min-width: $MQMobile)
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom: -2px
</style>
