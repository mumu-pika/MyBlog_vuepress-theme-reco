<!-- 留言板组件 -->
<template>
  <!-- 公共布局 -->
  <Common :sidebar="false">
    <div class="theme-container">
      <div class="container">
        <a href="" onclick="return push('/test1') ">push test1</a>
        <button onClick="push('/test2')">push test2</button>
        <button onClick="replace('/test3')">replace test3</button>
        <button onClick="back()">&lt;= 回退历史</button>
        <button onClick="forword()">前进历史 =&gt;</button>
      </div>
    </div>
  </Common>
</template>

<script>
// <script type="text/javascript" src="https://cdn.bootcss.com/history/4.7.2/history.js"/>
import Common from "@theme/components/Common";
import ModuleTransition from "@theme/components/ModuleTransition";
import Comments from "@theme/components/Comments/Comments.vue";

export default {
  name: "RouterBasics",
  components: { Common, ModuleTransition, Comments },

  computed: {},

  methods: {
    push (path) {
      // 压入历史记录
			history.push(path)
      // 禁止a标签跳转
			return false
		},
    replace (path) {
			history.replace(path)
		},
    back() {
			history.goBack()
		},
    forword() {
			history.goForward()
		}

  },
  mounted() {
    // 这个history 最终操作了BOM身上的history
		// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API，在一些旧的浏览器不支持用history去操作浏览器的history
    // 浏览器的历史记录是栈的结构
		let history = History.createHashHistory() //方法二，hash值（锚点）锚点跳转不会引起页面的刷新，但是能够留下历史记录
  },

  watch: {},
};
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
<style lang="stylus" scoped>
@require '../styles/mode.styl'
.container
  position: relative
  margin-top: 3.6rem  //这里3.6rem是顶部导航栏的高度
  display: flex
  flex-direction: column
  text-align: center
  justify-content: center
  align-items: center
  padding: 0 2rem
  height: 90vh

</style>