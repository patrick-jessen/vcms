import './utils'
import './store'
import Vue from 'vue'
import App from './App.vue'

var Spotify = require('spotify-web-api-js');
window.spotify = new Spotify();

Vue.mixin({
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    inspectClass() {
      var isSelected = window.$store.state.app.inspector.selected === this.namespace
      return {
        'inspect' : isSelected,
        'inspect-hover': this.hovered && !isSelected
      }
    }
  },
  methods: {
    // selects the component for inspection
    select(e) {
      window.$store.commit('app/inspector/selected', this.namespace)
      e.stopPropagation()
      e.preventDefault()
    },
    hover(v) {
      this.hovered = v
    }
  }
})

import Vcms from './plugin.js'
Vue.use(Vcms)


var testData = {
  app: {
    search: {
      lel: 42

    }
  }
}

window.vue = new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    _store: testData  
  }
})

