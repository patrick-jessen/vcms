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
