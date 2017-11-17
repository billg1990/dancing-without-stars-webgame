import Vue from 'vue'
import Router from 'vue-router'
import Greeting from '@/components/Greeting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Greeting',
      component: Greeting
    }
  ]
})
