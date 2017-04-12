import Vue from 'vue'
import Vcms from './vcms.js'

// const appComponent = 

import Store from './store/store'
Vue.use(Vcms)

window.vue = new Vue({
  render(createElement) {
    return createElement('div', {attrs:{class:'ui grid',style:'height:100%'}},
     [createElement('App', {attrs:{name:'app'}}),createElement('Inspector')])
  },
  data: {
    _store: Store  
  },
  components: {
    App: require('./App.vue'),
    Inspector: require('./inspector/Inspector.vue')
  },
})

window.componentNames = [
  'None',
  'Child',
  'Search',
  'Controls',
  'ItemList',
  'Item',
  'AlternativeSearch'
]

window.vcms.utils.registerComponent('App', require('./App.vue'))
window.componentNames.forEach((name) => {
  var comp = require('./components/' + name + '.vue')
  window.vcms.utils.registerComponent(name, comp)
})

window.vue.$mount('#app')