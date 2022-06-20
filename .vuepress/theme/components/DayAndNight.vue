<!-- 切换模式 -->
<template>
  <div id="dayNightSwitch" class="generalWrapper">
    <a @click="updateMode" class="click">
      <div :class="currentMode === 'dark' ? ['onOff'] : ['onOff', 'daySwitch']">
        <div class="star star1"></div>
        <div class="star star2"></div>
        <div class="star star3"></div>
        <div class="star star4"></div>
        <div class="star star5"></div>
        <div class="star sky"></div>
        <div class="sunMoon">
          <div class="crater crater1"></div>
          <div class="crater crater2"></div>
          <div class="crater crater3"></div>
          <div class="cloud part1"></div>
          <div class="cloud part2"></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
  import applyMode from './Mode/applyMode'

  export default {
    name: "DayAndNight",
    data () {
      return {
        currentMode: 'light'
      }
    },
    // 为了在保证 modePicker 在 SSR 中正确开关，并实现管理，Mode 组件将负责 modePicker 关闭的情况
    mounted() {
      // modePicker 开启时默认使用用户主动设置的模式
      this.currentMode = localStorage.getItem('mode') || this.$themeConfig.mode || 'light'

      // Dark and Light autoswitches
      // 为了避免在 server-side 被执行，故在 Vue 组件中设置监听器
      var that = this
      window.matchMedia('(prefers-color-scheme: dark)').addListener(() => {
        that.$data.currentMode === 'auto' && applyMode(that.$data.currentMode)
      })
      window.matchMedia('(prefers-color-scheme: light)').addListener(() => {
        that.$data.currentMode === 'auto' && applyMode(that.$data.currentMode)
      })

      applyMode(this.currentMode)
    },
    methods: {
      selectMode (mode) {
        if (mode !== this.currentMode) {
          this.currentMode = mode
          applyMode(mode)
          localStorage.setItem('mode', mode)
        }
      },
      updateMode() {
        if (this.currentMode === 'light') {
          let mode = 'dark'
          this.currentMode = mode
          applyMode(mode)
          localStorage.setItem('mode', mode)
        } else {
          let mode = 'light'
          this.currentMode = mode
          applyMode(mode)
          localStorage.setItem('mode', mode)
        }
      },
    }
  }
</script>

<style lang="css" scoped>
  #dayNightSwitch {
    align-self: center;
    line-height: 1rem;
    margin: auto 1rem;
    opacity: 0.65;
  }

  #dayNightSwitch .onOff {
    /* background: #324164; */
    width: 3rem;
    height: 25px;
    border-radius: 25px;
    box-shadow: 0 15px 10px -10px rgba(255, 255, 255, 0.2),
    0px 5px 10px rgba(247, 246, 246, 0.236);
    border: 2px solid #0a286f;
    overflow: hidden;
    position: relative;
  }

  #dayNightSwitch .onOff * {
    transition: all 0.4s ease;
  }

  #dayNightSwitch .onOff.daySwitch {
    border: 2px solid #6b52bf;
    /* box-shadow: 0 15px 10px -10px rgba(255, 255, 255, 0.173),
    0px 5px 10px rgba(255, 213, 0, 0.791); */
  }

  #dayNightSwitch .onOff.daySwitch .sky {
    width: 65px;
    height: 25px;
    border-radius: 25px;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(0px, 0px);
    animation: none !important;
  }

  #dayNightSwitch .onOff.daySwitch .sunMoon {
    background: #fee378;
    border: 2px solid #d9b31c;
    left: calc(100% - 23px);
  }

  #dayNightSwitch .onOff.daySwitch .sunMoon .crater {
    transform: scale(0) !important;
  }

  #dayNightSwitch .onOff.daySwitch .sunMoon .cloud {
    opacity: 1;
    transform: translatex(0px);
    transition-delay: 0.2s;
    animation: cloudAnim 2.5s linear infinite;
  }

  #dayNightSwitch .onOff .sunMoon {
    background: #e7d488;
    height: 16px;
    width: 16px;
    border-radius: 100%;
    border: 2px solid #ccc091;
    position: absolute;
    left: 3px;
    top: 2.5px;
  }

  #dayNightSwitch .onOff .sunMoon .crater {
    background: #ccc091;
    width: 5px;
    height: 5px;
    border-radius: 13px;
    position: absolute;
    left: 50%;
    top: 20%;
  }

  #dayNightSwitch .onOff .sunMoon .crater.crater1 {
    left: 30%;
    top: 45%;
    transform: scale(0.5);
  }

  #dayNightSwitch .onOff .sunMoon .crater.crater2 {
    left: 55%;
    top: 60%;
    transform: scale(0.7);
  }

  /* 第二块云朵 */
  #dayNightSwitch .onOff .sunMoon .cloud {
    background: rgb(255, 255, 255);
    border-radius: 3px;
    position: absolute;
    opacity: 0;
    transform: translatex(-20px);
    transition-delay: 0s;
  }

  #dayNightSwitch .onOff .sunMoon .cloud.part1 {
    width: 20px;
    height: 2px;
    left: -12px;
    top: calc(50% - 1.5px);
  }

  #dayNightSwitch .onOff .sunMoon .cloud.part1:before {
    content: '';
    background: rgb(255, 255, 255);
    border-radius: 3px;
    position: absolute;
    width: 1px;
    height: 2px;
    left: 40%;
    top: -100%;
  }

  /* 第一块云朵 */
  #dayNightSwitch .onOff .sunMoon .cloud.part1:after {
    content: '';
    background: rgb(255, 255, 255);
    border-radius: 3px;
    position: absolute;
    width: 15px;
    height: 2px;
    left: 20%;
    top: -200%;
  }

  #dayNightSwitch .onOff .sunMoon .cloud.part2 {
    width: 3px;
    height: 3px;
    left: -1px;
    top: calc(50% + 0.3px);
  }

  /* 第三块云朵 */
  #dayNightSwitch .onOff .sunMoon .cloud.part2:before {
    content: '';
    background: rgb(255, 255, 255);
    border-radius: 3px;
    position: absolute;
    width: 18px;
    height: 2px;
    left: -8px;
    top: 100%;
  }

  #dayNightSwitch .onOff .star {
    background: #86dcf6;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(20px, 5px);
  }

  #dayNightSwitch .onOff .star.star1 {
    transform: translate(10px, 15px) scale(0.3);
    animation: starAnim1 3s -2.4s linear infinite;
  }

  #dayNightSwitch .onOff .star.star2 {
    transform: translate(15px, -7px) scale(0.6);
    animation: starAnim2 3s -1.1s linear infinite;
  }

  #dayNightSwitch .onOff .star.star3 {
    transform: translate(35px, -12px) scale(0.9);
    animation: starAnim3 3s -1.5s linear infinite;
  }

  #dayNightSwitch .onOff .star.star4 {
    transform: translate(30px, 12px) scale(0.4);
    animation: starAnim4 3s -1.9s linear infinite;
  }

  #dayNightSwitch .onOff .star.star5 {
    transform: translate(0px, 0px) scale(0.6);
    animation: starAnim5 3s -2.8s linear infinite;
  }

  #dayNightSwitch .onOff .star.sky {
    animation: skyAnim 3s -0.4s linear infinite;
  }

  .click {
    cursor:pointer
  }
  @keyframes starAnim1 {
    0% {
      transform: translate(5px, 30px) scale(0.3);
    }
    20% {
      transform: translate(8px, 17px) scale(0.3);
    }
    50% {
      transform: translate(10px, 0px) scale(0.3);
    }
    80% {
      transform: translate(8px, -17px) scale(0.3);
    }
    100% {
      transform: translate(5px, -30px) scale(0.3);
    }
  }

  @keyframes starAnim2 {
    0% {
      transform: translate(10px, 30px) scale(0.6);
    }
    20% {
      transform: translate(13px, 17px) scale(0.6);
    }
    50% {
      transform: translate(15px, 0px) scale(0.6);
    }
    80% {
      transform: translate(13px, -17px) scale(0.6);
    }
    100% {
      transform: translate(10px, -30px) scale(0.6);
    }
  }

  @keyframes starAnim3 {
    0% {
      transform: translate(30px, 30px) scale(0.9);
    }
    20% {
      transform: translate(33px, 17px) scale(0.9);
    }
    50% {
      transform: translate(35px, 0px) scale(0.9);
    }
    80% {
      transform: translate(33px, -17px) scale(0.9);
    }
    100% {
      transform: translate(30px, -30px) scale(0.9);
    }
  }

  @keyframes starAnim4 {
    0% {
      transform: translate(25px, 30px) scale(0.4);
    }
    20% {
      transform: translate(28px, 17px) scale(0.4);
    }
    50% {
      transform: translate(30px, 0px) scale(0.4);
    }
    80% {
      transform: translate(28px, -17px) scale(0.4);
    }
    100% {
      transform: translate(25px, -30px) scale(0.4);
    }
  }

  @keyframes starAnim5 {
    0% {
      transform: translate(0px, 30px) scale(0.6);
    }
    20% {
      transform: translate(3px, 17px) scale(0.6);
    }
    50% {
      transform: translate(5px, 0px) scale(0.6);
    }
    80% {
      transform: translate(3px, -17px) scale(0.6);
    }
    100% {
      transform: translate(0px, -30px) scale(0.6);
    }
  }

  @keyframes skyAnim {
    0% {
      transform: translate(15px, 30px) scale(1);
    }
    20% {
      transform: translate(18px, 17px) scale(1);
    }
    50% {
      transform: translate(20px, 0px) scale(1);
    }
    80% {
      transform: translate(18px, -17px) scale(1);
    }
    100% {
      transform: translate(15px, -30px) scale(1);
    }
  }

  @keyframes cloudAnim {
    0% {
      transform: translatex(0px);
    }
    14% {
      transform: translatex(5px);
    }
    56% {
      transform: translatex(-10px);
    }
    100% {
      transform: translatex(0px);
    }
  }
</style>