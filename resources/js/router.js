import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '@/store'

import Admin from '@/views/admin/Base'
import dashboard from '@/views/admin/pages/dashboard/router'
import category from '@/views/admin/pages/category/router'
import product from '@/views/admin/pages/product/router'
import type from '@/views/admin/pages/type/router'
import unit from '@/views/admin/pages/unit/router'
import supplier from '@/views/admin/pages/supplier/router'
import article from '@/views/admin/pages/article/router'
import Login from '@/views/Login'
import Register from '@/views/Register'

import Home from '@/views/home/Base'
import index from '@/views/home/pages/index/router'
import faq from '@/views/home/pages/faq/router'
import contact from '@/views/home/pages/contact/router'
import about from '@/views/home/pages/about/router'
import promotion from '@/views/home/pages/promotion/router'
import product_home from '@/views/home/pages/product/router'
import article_home from '@/views/home/pages/article/router'
import product_detail from '@/views/home/pages/product-detail/router'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      index,
      faq,
      contact,
      product_home,
      article_home,
      product_detail,
      about,
      promotion
    ]
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      dashboard,
      category,
      product,
      type,
      unit,
      supplier,
      article,
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { unAuthen: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { unAuthen: true }
  },
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  store.dispatch('auth/checkUserLogin').then(res => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!res.flag) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.unAuthen)) {
      if(!res.flag) {
        next()
      } else {
        next({
          path: '/admin',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  })
})
export default router