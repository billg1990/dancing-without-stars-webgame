import Vue from 'vue'
import Router from 'vue-router'
import Greeting from '@/components/Greeting'
import IndexPage from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Greeting',
      component: Greeting
    },
    {
      path: '/index/:name',
      name: 'IndexPage',
      component: IndexPage
    }
  ]
})
