/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import DocGen from '../components/DocGen'
import SampleCode from '../components/SampleCode'
import Others from '../components/Others'
import ElementGraph from '../components/showElementsGraph'
import APIInfo from '../components/APIInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DocGen',
      component: DocGen
    },
    {
      path: '/SampleCode',
      name: 'SampleCode',
      component: SampleCode
    },
    {
      path: '/Others',
      name: '/Others',
      component: Others
    },
    {
      path: '/APIInfo',
      name: 'APIInfo',
      component: APIInfo
    },
    {
      path: '/ElementGraph/:id',
      name: 'ElementGraph',
      component: ElementGraph
    },
  ]
})
