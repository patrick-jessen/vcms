import Vue from 'vue'
import Vcms from './vcms.js'
// import Store from './store/store'
import Store from './store/laptops'
Vue.use(Vcms)

window.vue = new Vue({
  render(createElement) {
    return createElement('div', {attrs:{class:'ui grid',style:'height:100%'}},
     [createElement('App', {attrs:{name:'app', class:'ui eleven wide column'}}),
      createElement('Inspector')])
  },
  data: {
    _store: Store  
  },
  components: {
    // App: require('./App.vue'),
    App: require('./Laptops.vue'),
    Inspector: require('./inspector/Inspector.vue')
  },
})

// window.componentNames = [
//   'None',
//   'Child',
//   'Search',
//   'Controls',
//   'ItemList',
//   'Item',
//   'AlternativeSearch'
// ]

window.componentNames = [
  'None',
  'Child',
  'laptops/Menu',
]

// window.vcms.utils.registerComponent('App', require('./App.vue'))
window.vcms.utils.registerComponent('App', require('./Laptops.vue'))
window.componentNames.forEach((name) => {
  var comp = require('./components/' + name + '.vue')
  name = name.split('/').slice(-1)[0]
  window.vcms.utils.registerComponent(name, comp)
})

window.vue.$mount('#app')