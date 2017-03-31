import './utils'
import './store'
import Vue from 'vue'
import App from './App.vue'

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
  el: '#app',
  render: h => h(App),
})

