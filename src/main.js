import Vue from 'vue'
import Vcms from './vcms.js'
import Store from './store/laptops'
Vue.use(Vcms)

window.vue = new Vue({
  render(createElement) {
    return createElement('div', {attrs:{class:'ui grid',style:'height:100%'}},
     [createElement('App', {attrs:{name:'app', class:'ui eleven wide column'}}),
      createElement('Inspector')])
  },
  data: {
    _store: Store,
    ctrl: false
  },
  components: {
    App: require('./Laptops.vue'),
    Inspector: require('./inspector/Inspector.vue')
  },
})

window.componentNames = [
  'None',
  'Child',
  'Property',
  'laptops/Menu',
  'laptops/Hero',
]
window.vcms.utils.registerComponent('App', require('./Laptops.vue'))
window.componentNames.forEach((name) => {
  console.log("requiring",name )
  var comp = require('./components/' + name + '.vue')
  name = name.split('/').slice(-1)[0]
  window.vcms.utils.registerComponent(name, comp)
})

window.vue.$mount('#app')

window.addEventListener("keydown", function(event) {
    if (event.keyCode == 17) {
        window.vue.$data.ctrl = true
    }
}, false);
window.addEventListener("keyup", function(event) {
    if (event.keyCode == 17) {
        window.vue.$data.ctrl = false
    }
}, false);