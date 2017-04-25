import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vcms from './vcms.js'
import Store from './store/laptops'
import routes from './routes.js'
Vue.use(Vcms)

var router = new VueRouter({
  mode: 'history',
  routes: routes
})
router.beforeEach((to, from, next) => {
  console.log('ROUTE', to, from)
  next()
})

window.vue = new Vue({
  render(createElement) {

    var appClass = 'wide column app'
    var inspectorClass = 'four wide column inspector'

    if(this.showInspector) {
      appClass = 'twelve ' + appClass
    }
    else {
      appClass = 'sixteen ' + appClass
      inspectorClass = inspectorClass + ' hidden'
    }

    return createElement('div', {
      class: 'ui grid'
    },
     [
       createElement('App', {
         attrs: {
           name:'app', 
           class: appClass
          }}),
        createElement('Inspector', {
          attrs: {
            class: inspectorClass
          }
        })])
  },
  data: {
    _store: Store,
    ctrl: false,
    showInspector: true
  },
  components: {
    App: require('./Laptops.vue'),
    Inspector: require('./inspector/Inspector.vue')
  },
  router
})

window.componentNames = [
  'None',
  'Child',
  'Property',
  'laptops/Menu',
  'laptops/Hero',
  'laptops/ProductList',
  'laptops/ProductSummary',
  'laptops/Footer',
  'pages/Laptops'
]
window.vcms.utils.registerComponent('App', require('./Laptops.vue'))
window.componentNames.forEach((name) => {
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