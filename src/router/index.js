/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import DocGen from '../components/DocGen'
import SampleCode from '../components/SampleCode'
import Others from '../components/Others'
import ElementGraph from '../components/showElementsGraph'
import APIInfo from '../components/APIInfo'
import Info from '../components/Info'

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
      path: '/APIInfo/:msgKey',
      name: 'APIInfo',
      component: APIInfo
    },
    {
      path: '/Info',
      name: 'Info',
      component: Info
    },

    {
      path: '/ElementGraph/:id',
      name: 'ElementGraph',
      component: ElementGraph
    },
  ]
})
