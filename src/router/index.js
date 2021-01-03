/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'topicList',
    component: () =>
      import(/* webpackChunkName: "topicList" */ '@/views/topicList.vue'),
    meta: {
      title: '话题列表'
    }
  },
  {
    path: '/question-detail',
    name: 'questionDetail',
    component: () =>
      import(/* webpackChunkName: "questionDetail" */ '@/views/questionDetail.vue'),
    meta: {
      title: '问题详情'
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
