import './temp.js'
import Vue from 'vue'
import App from './App.vue'
import store from './store'


window.vue = new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
})
