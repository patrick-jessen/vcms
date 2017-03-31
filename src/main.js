import './temp.js'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

var Spotify = require('spotify-web-api-js');
window.spotify = new Spotify();

window.vue = new Vue({
  store: store,
  el: '#app',
  render: h => h(App)
})

// Vue.mixin({
//   props: {
//     // Namespace for state
//     name: {
//       type: String
//     }
//   },
//   data: {
//     namespace: ''
//   },
//   created() {
//     this.namespace = this.$parent.namespace + '/' + this.name
//   },
//   methods: {
//     name(str) {
//       return this.namespace + '/' + str
//     }
//   }
// })