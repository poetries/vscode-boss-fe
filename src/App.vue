<template>
  <div id="app">
    <transition :name="direction">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      direction: ''
    }
  },
  mounted () {
  },
  watch: {
    $route (to, from) {
      // 如果前端页面进行刷新，则无需加入transition动画
      if (from.name === null) {
        return
      }
      if (to.meta.index < from.meta.index) {
        this.direction = 'slide-right'
      } else {
        if (!to.meta.index) {
          this.direction = ''
          return
        }
        this.direction = 'slide-left'
      }
    }
  }
}
</script>
<style lang="less">
  // 当手机屏幕宽度超过 480px, 横屏浏览时的样式
  // @media (min-width: 480px) and (orientation: landscape) {
  //   html::before {
  //     width: 100%;
  //     height: 100%;
  //     z-index: 99999;
  //     position: fixed;
  //     top: 0;
  //     left: 0;
  //     content: '';
  //     background: #333;
  //   }
  //   body:before {
  //     background-image: url('./assets/images/orientation.png');
  //     background-repeat: no-repeat;
  //     background-size: 100% auto;
  //     background-position: 50%;
  //     content: '';
  //     height: 200px;
  //     width: 100px;
  //     z-index: 99999;
  //     margin: -140px 0 0 -50px;
  //     position: absolute;
  //     color: #fff;
  //     top: 50%;
  //     left: 50%;
  //   }
  //   body:after {
  //     content: '\4e3a\4e86\66f4\597d\7684\4f53\9a8c\ff0c\8bf7\5c06\624b\673a\7ad6\8fc7\6765';
  //     position: absolute;
  //     top: 50%;
  //     text-align: center;
  //     height: 30px;
  //     left: 0;
  //     font-size: 18px;
  //     z-index: 99999;
  //     width: 100%;
  //     color: #fff;
  //     margin-top: 35px;
  //   }
  // }
  body,
  html {
    height: 100%;
    width: 100%;
  }
  html {
    font-size: 16Px;
  }
  body {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    padding-top: constant(safe-area-inset-top);
    /**为导航栏+状态栏的高度 88px  */
    padding-left: constant(safe-area-inset-left);
    /**如果未竖屏时为0       */
    padding-right: constant(safe-area-inset-right);
    /**如果未竖屏时为0   */
    padding-bottom: constant(safe-area-inset-bottom);
    /**为底下圆弧的高度 34px   */
    overflow-x: hidden !important;
    max-width: 1200PX !important;
    margin: 0 auto !important;
  }
  body,
  div,
  img,
  span {
    box-sizing: border-box;
  }
  .slide-right-enter-active,
  .slide-left-enter-active,
  .slide-right-leave-active,
  .slide-left-leave-active {
    transition: all 0.5s;
    will-change: transform;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-right-leave-active,
  .slide-right-leave-to {
    transform: translateX(100%);
  }
  .slide-right-enter-to,
  .slide-right-leave {
    transform: translateX(0);
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-leave-active,
  .slide-left-leave-to {
    transform: translateX(-100%);
  }
  .slide-left-enter-to,
  .slide-left-leave {
    transform: translateX(0);
  }
  .van-nav-bar .van-icon {
    color: #2C2A2D !important;
  }
  .van-empty .van-empty__image {
    width: 320px;
    height: 160px;
  }
  .van-tabs__line {
    background-color: #6DBCDD !important;
    height: 2PX !important;
  }
  .van-skeleton {
    padding: 20px !important;
  }
  .cube-pullup-wrapper .before-trigger span {
    color: #999;
    font-size: 12PX;
  }
  .ant-tabs-nav .ant-tabs-tab {
    color: #fff;
  }
  .ant-page-header-heading-title {
    color: #fff !important;
  }
  .anticon.anticon-arrow-left {
    color: #fff !important;
  }
  .ant-page-header.ant-page-header-ghost {
    border: none !important;
  }
</style>
