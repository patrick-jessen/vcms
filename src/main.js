import Store from './store'
import Vue from 'vue'
import Vcms from './vcms.js'
Vue.use(Vcms)

window.vue = new Vue({
  render(createElement) {
    return createElement('div', {attrs:{class:'ui grid',style:'height:103%'}},
     [createElement('App'),createElement('Inspector')])
  },
  data: {
    _store: Store  
  },
  components: {
    Inspector: require('./inspector/Inspector.vue')
  }
})

window.componentNames = [
  'Child',
  'Search',
  'Controls',
  'ItemList',
  'Item',
  'AlternativeSearch'
]

window.vcms.utils.registerComponent('App', require('./App.vue'))

for(var i = 0; i < window.componentNames.length; i++) {
  var comp = require('./components/' + window.componentNames[i] + '.vue')
  window.vcms.utils.registerComponent(window.componentNames[i], comp)
}


window.vue.$mount('#app')