import './utils'
import Store from './store'
import Vue from 'vue'
import Vcms from './vcms.js'
Vue.use(Vcms)

window.vue = new Vue({
  template: `
    <div class='ui grid' style='height:103%'>
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

var componentNames = [
  'Child',
  'Search',
  'Controls',
  'ItemList',
  'Item',
  'AlternativeSearch'
]
window.componentNames = componentNames
window.components = {}

var app = require('./App.vue')
Vue.component('App', app)
registerComponent(app)

for(var i = 0; i < componentNames.length; i++) {
  var comp = require('./components/' + componentNames[i] + '.vue')
  Vue.component(componentNames[i], comp)
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