import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login'
import Index from '@/components/index/index'
import IndexContent from '@/components/index/indexContent'
import ReservationList from '@/components/reservation/reservationList'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/',
    component: Index,
    children: [{
      path: '',
      name: 'Index',
      component: IndexContent
    }, {
      path: 'reservation/list',
      name: 'ReservationList',
      component: ReservationList
    }]
  }]
})
