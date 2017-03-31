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
  },
  methods: {
    // selects the component for inspection
    select(e) {
      window.$store.commit('app/inspector/selected', this.namespace)
      e.stopPropagation()
      e.preventDefault()
    }
  }
})

window.vue = new Vue({
  el: '#app',
  render: h => h(App),
})

