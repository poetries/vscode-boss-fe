import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import filters from '@/utils/filters'
import VueLazyload from 'vue-lazyload'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 导入原子类
import './libs/styles/index.css'

// common css
import 'normalize.css/normalize.css'

Vue.use(Antd)

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-undef
  const VConsole = require('vconsole')
  new VConsole() // 初始化
}

Vue.config.productionTip = false

// 忽略微信自定义标签
Vue.config.ignoredElements = ['wx-open-launch-weapp', 'wx-open-launch-app']

// 实例化Vue的filter
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]))

// 导入mixin
// Vue.mixin(Mixins)


// 初始化
// MtaH5.init({
//   sid: '500732716', // 必填，统计用的appid
//   // cid: '', // 如果开启自定义事件，此项目为必填，否则不填
//   autoReport: 0, // 是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
//   senseHash: 1, // hash锚点是否进入url统计
//   senseQuery: 0, // url参数是否进入url统计
//   performanceMonitor: 1, // 是否开启性能监控
//   ignoreParams: [], // 开启url参数上报时，可忽略部分参数拼接上报
// })

// 坑位埋点指令
// Vue.directive('stat', {
//   bind(el, opt) {
//     el.addEventListener(
//       'click',
//       () => {
//         MtaH5.clickStat(opt.value.event, opt.value.params)
//       },
//       false,
//     )
//   },
// })

// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
  lazyComponent: true,
  dispatchEvent: true,
  error: require('./assets/images/fail.png'),
  loading: require('./assets/images/loading.png'),
  attempt: 3,
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach to', to)

  next()
})

router.afterEach((to) => {
  console.log('afterEach to', to)
  // MtaH5.pgv()
})

new Vue({
  router,
  // store,
  render: (h) => h(App),
}).$mount('#app')
