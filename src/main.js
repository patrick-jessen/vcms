import './utils'
import Store from './store'
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
      var isSelected = this.$root.$data._store.app.inspector.selected === this.namespace
      return {
        'inspect' : isSelected,
        'inspect-hover': this.hovered && !isSelected
      }
    }
  },
  methods: {
    // selects the component for inspection
    select(e) {
      this.$root.$data._store.app.inspector.selected = this.namespace
      e.stopPropagation()
      e.preventDefault()
    },
    hover(v) {
      this.hovered = v
    }
  }
})

import Vcms from './vcms.js'
Vue.use(Vcms)

window.vue = new Vue({
  render: h => h(App),
  data: {
    _store: Store  
  }
})

var components = [
  'Child',
  'Search',
  'Controls',
  'ItemList',
  'Item'
]
for(var i = 0; i < components.length; i++) {
  Vue.component(components[i], require('./components/' + components[i] + '.vue'))
}

window.vue.$mount('#app')