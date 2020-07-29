// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as d3 from 'd3'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(d3)
Vue.config.productionTip = false
Vue.filter('msgFormat', function(msg) {
  // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
  return msg.replace(/<NULL>/g, ' ')
}),
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
