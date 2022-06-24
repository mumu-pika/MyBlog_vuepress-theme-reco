<!-- 页面加载页组件 取自node_modules@vuepress-reco/vuepress-plugin-loading-page-->
<!-- 原主题插件地址：https://www.npmjs.com/package/@vuepress-reco/vuepress-plugin-loading-page -->
<template>
  <div id="loader-wrapper">
    <!-- 吃豆豆显示区域 -->
    <!-- <div class="loader-main">
      <div v-for="item in 4" :key="`out${item}`">
      </div>
    </div> -->
    <!-- 标题区域 -->
    <div class="loadingTipsContainer" v-if="$frontmatter.home">
      <h3 class="title">{{$site.title || $localeConfig.title}}</h3>
      <p class="description">{{$site.description || $localeConfig.description}}</p>
    </div>
    <div class="loadingImageContainer">
        <img src="../images/pikachu-running.gif"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue-demi";

// import { useInstance } from '@theme/helpers/composable'

export default defineComponent({

})
</script>


<style lang="stylus" scoped>
#loader-wrapper
  background var(--background-color)
  // 吃豆豆的css3实现
  .loader-main
    position:fixed;
    width:120px;
    height:40px;
    top:65%;
    left:50%;
    // z-index:555;
    transform: translate(-50%, -50%)
    div
      &:nth-child(2){ animation:pacman-balls 1s 0s infinite linear; }
      &:nth-child(3){ animation:pacman-balls 1s 0.33s infinite linear; }
      &:nth-child(4){ animation:pacman-balls 1s 0.66s infinite linear; }
      &:nth-child(5){ animation:pacman-balls 1s 0.99s infinite linear; }
      &:first-of-type
        width:0px;
        height:0px;
        border-right:25px solid transparent;
        border-top:25px solid $accentColor;
        border-left:25px solid $accentColor;
        border-bottom:25px solid $accentColor;
        border-radius:25px;
        animation:rotate_pacman_half_up 0.5s 0s infinite;
      &:nth-child(2)
        width:0px;
        height:0px;
        border-right:25px solid transparent;
        border-top:25px solid $accentColor;
        border-left:25px solid $accentColor;
        border-bottom:25px solid $accentColor;
        border-radius:25px;
        animation:rotate_pacman_half_down 0.5s 0s infinite;
        margin-top:-50px;
      &:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6)
        background-color:$accentColor;
        width:15px;
        height:15px;
        border-radius:100%;
        margin:2px;
        width:10px;
        height:10px;
        position:absolute;
        transform:translate(0,-6.25px);
        top:25px;
        left:100px;
  .loadingTipsContainer
    display: flex
    // 设置主轴方向，这样弹性盒子中的元素才会垂直换行
    flex-direction: column
    justify-content: center
    align-items: center
    text-align center
    box-sizing: border-box
    position: fixed
    width:30rem
    top: 30%
    left: 50%
    transform: translate(-50%, -50%)
    .title
      margin auto
      text-align center
      color $textColor
      color var(--text-color)
      font-size 2.2rem
      box-sizing: border-box;
      padding: 0 10px;
      text-shadow 0 2px 10px rgba(0,0,0,0.2)
    .description
      margin auto
      text-align center
      color $textColor
      color var(--text-color)
      font-size 22px
      box-sizing: border-box;
      padding: 0 10px;
      text-shadow 0 2px 10px rgba(0,0,0,0.2);
  .loadingImageContainer
    position:fixed
    top:46%
    left: 50%
    transform: translate(-50%, -50%);
    display: flex
    justify-content: center
    align-items: center
    width: 10rem
    height: 10rem
    margin 2rem auto
    text-align center
    img
      width: 6rem
      height: 4rem

  @keyframes pacman-balls
    75%{opacity:0.7;}
    100%{-webkit-transform:translate(-100px,-6.25px);transform:translate(-100px,-6.25px);}
  @keyframes rotate_pacman_half_up
    0%{-webkit-transform:rotate(270deg);transform:rotate(270deg);}
    50%{-webkit-transform:rotate(360deg);transform:rotate(360deg);}
    100%{-webkit-transform:rotate(270deg);transform:rotate(270deg);}
  @keyframes rotate_pacman_half_down
    0%{-webkit-transform:rotate(90deg);transform:rotate(90deg);}
    50%{-webkit-transform:rotate(0deg);transform:rotate(0deg);}
    100%{-webkit-transform:rotate(90deg);transform:rotate(90deg);}
</style>
