import Vue from 'vue'
import Router from 'vue-router'
import axios01 from '@/components/axios01'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'axios01',
      component: axios01
    }
  ]
})
