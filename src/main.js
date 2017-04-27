import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vcms from './vcms.js'
import {Component} from './vcms.js'
import Store from './store/laptops'
import routes from './routes.js'
Vue.use(Vcms)

window.store = Store
window.Component = Component

var router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.length === 0) {
    router.addRoutes([
      {path:to.path, component: window.layouts.NewPage}
    ])
    routes.push({path:to.path, component: window.layouts.NewPage})
    next(to)
    return
  }
  else {
    if(window.vue) {
      var namespace = 'app' + to.fullPath.replace('/', '/$pages/')
      if(to.path === '/')
        namespace += 'default'

      var store = window.vcms.utils.getStore(namespace)
      var type = store.$type

      to.matched[0].components.default = window.layouts[type]
    }
    else {
      // Temp hack
      setTimeout(()=>{next(to)}, 1)
      return
    }
  }

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
    showInspector: true,
    hoveredComponent: ''
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
  'laptops/Banners',
  'laptops/FullWidthBanner',

  'pages/Laptops',
  'pages/Desktops',
  'pages/Frontpage'
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
    if(event.key === 'e' && event.ctrlKey) {
      window.vue.showInspector = !window.vue.showInspector
      event.preventDefault()
    }
}, false);
window.addEventListener("keyup", function(event) {
    if (event.keyCode == 17) {
        window.vue.$data.ctrl = false
    }
}, false);