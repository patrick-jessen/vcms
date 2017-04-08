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
    App: require('./App.vue'),
    Inspector: require('./inspector/Inspector.vue')
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