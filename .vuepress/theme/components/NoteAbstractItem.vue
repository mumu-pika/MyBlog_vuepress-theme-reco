<!-- 单个文档的单独小组件 -->

<template>
  <div class="abstract-item" @click="$router.push(item.path)">
    <reco-icon v-if="item.frontmatter.sticky" icon="reco-sticky" />
    <div class="cover">
      <img-lazy
        class="cover-img"
        :src="
          item.frontmatter.cover ||
          this.$themeConfig.covers[Math.floor(Math.random()*this.$themeConfig.covers.length)] || '../images/lighthouse.webp'
        "
        :alt="item.title"
      />
    </div>
    <!-- 文章标题 -->
    <div class="title">
      <reco-icon v-if="item.frontmatter.keys" icon="reco-lock" />
      <router-link :to="item.path">{{ item.title }}</router-link>
    </div>
    <!-- 文章摘要 -->
    <!-- 注意这里的v-html, 可以解析html结构 -->
    <div class="abstract" v-html="item.excerpt"></div>
    <PageInfo :pageInfo="item" :currentTag="currentTag"> </PageInfo>
  </div>
</template>

<script>
import { defineComponent } from "vue-demi";
import { RecoIcon } from "@vuepress-reco/core/lib/components";
import PageInfo from "./PageInfo";
export default defineComponent({
  components: { PageInfo, RecoIcon },
  props: ["item", "currentPage", "currentTag"],
});
</script>

<style lang="stylus" scoped>
.abstract-item
  position: relative
  margin: 0 auto 2rem
  padding: 1rem 2rem
  width: 100%
  overflow: hidden
  border-radius: $borderRadius
  box-shadow: var(--box-shadow)
  box-sizing: border-box
  transition: all 0.3s
  background-color: var(--background-color)
  cursor: pointer
  > *
    pointer-events: auto
  .cover
    max-width: 20rem
    flex: 1
    overflow: hidden
    border-radius: 0.5rem
  .cover-img
    width: 100%
    border-radius: 0.5rem
    max-width: 20rem
    transition: 1s ease-out
  .cover-img:hover
    transform: scale3d(1.1, 1.1, 1)
  .reco-sticky
    position: absolute
    top: 0
    left: 0
    display: inline-block
    color: $accentColor
    font-size: 2.4rem
  &:hover
    box-shadow: var(--box-shadow-hover)
  // 文章标题样式
  .title
    position: relative
    display: inline-block
    // 注意！！一定要给元素加上width，不然溢出部分不会显示省略号
    width: 50vw
    font-size: 1.2rem
    line-height: 2rem
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
    a
      color: var(--text-color)
    .reco-lock
      font-size: 1.28rem
      color: $accentColor
    &:after
      content: ''
      position: absolute
      width: 100%
      height: 2px
      bottom: 0
      left: 0
      background-color: $accentColor
      visibility: hidden
      -webkit-transform: scaleX(0)
      transform: scaleX(0)
      transition: 0.3s ease-in-out
    &:hover a
      color: $accentColor
    &:hover:after
      visibility: visible
      -webkit-transform: scaleX(1)
      transform: scaleX(1)
  .tags
    .tag-item
      &.active
        color: $accentColor
      &:hover
        color: $accentColor
@media (max-width: $MQMobile)
  .tags
    display: block
    margin-top: 1rem
    margin-left: 0 !important
</style>
