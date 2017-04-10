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
window.vcms.utils.registerComponent(app)

for(var i = 0; i < componentNames.length; i++) {
  var comp = require('./components/' + componentNames[i] + '.vue')
  Vue.component(componentNames[i], comp)
  window.vcms.utils.registerComponent(comp)
}


window.vue.$mount('#app')