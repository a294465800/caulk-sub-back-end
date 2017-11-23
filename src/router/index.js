import Vue from 'vue'
import Router from 'vue-router'
import Common from '@/assets/js/common.js'

// components
import Login from '@/components/login/login'
import Index from '@/components/index/index'
import IndexContent from '@/components/index/indexContent'
import ReservationList from '@/components/reservation/reservationList'
import MasterList from '@/components/master/masterList'
import MasterApplyList from '@/components/master/masterApplyList'
import Company from '@/components/company/company'

Vue.use(Router)
Vue.prototype.$common = Common

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
    }, 
    // {
    //   path: 'reservation/list',
    //   name: 'ReservationList',
    //   component: ReservationList
    // }, {
    //   path: 'master/list',
    //   name: 'MasterList',
    //   component: MasterList
    // }, {
    //   path: 'master/apply/list',
    //   name: 'MasterApplyList',
    //   component: MasterApplyList
    // },
     {
      path: 'company',
      name: 'Company',
      component: Company
    }]
  }]
})
