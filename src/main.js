import './utils'
import Store from './store'
import Vue from 'vue'
import Vcms from './vcms.js'
Vue.use(Vcms)

window.vue = new Vue({
  template: `
    <div class='ui grid'>
      <App/>
      <Inspector/>
    </div>`,
  data: {
    _store: Store  
  },
  components: {
    Inspector: require('./inspector/Inspector.vue')
  }
})

var components = [
  'Child',
  'Search',
  'Controls',
  'ItemList',
  'Item',
  'AlternativeSearch'
]
window.components = {}

var app = require('./App.vue')
Vue.component('App', app)
registerComponent(app)

for(var i = 0; i < components.length; i++) {
  var comp = require('./components/' + components[i] + '.vue')
  Vue.component(components[i], comp)
  registerComponent(comp)
}

function registerComponent(comp) {
  var name = comp.name
  var requires = []
  for(var key in comp.props) {
    if(comp.props[key].required)
      requires.push(key)
  }

  console.log('here', name)
  window.components[name] = {
    input: requires,
    output: comp.emits,
    static: comp.static,
    children: comp.children
  }
}

window.vue.$mount('#app')