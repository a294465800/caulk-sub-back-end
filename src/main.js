// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

/**
 * 全局路由钩子
 * @param {object} to
 * @param {object} from
 * @param {object} next
 */
router.beforeEach((to, from, next) => {
  if (sessionStorage.username) {
    if (to.name === 'Login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (to.name !== 'Login') {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
