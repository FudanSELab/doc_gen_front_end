/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import DocGen from '../components/DocGen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DocGen',
      component: DocGen
    }
  ]
})
