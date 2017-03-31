import './utils.js'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

var Spotify = require('spotify-web-api-js');
window.spotify = new Spotify();

Vue.mixin({
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      namespace: ''
    }
  },
  created() {
    if(this.$parent)
      this.namespace = this.$parent.namespace + '/' + this.name
    else
      this.namespace = ''
  }
})

window.vue = new Vue({
  store: store,
  el: '#app',
  render: h => h(App),
})

