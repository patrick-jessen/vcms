import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vcms from './vcms.js'
import {Component} from './vcms.js'
import Store from './store/laptops2'
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
    // router.addRoutes([
    //   {path:to.path, component: window.layouts.NewPage}
    // ])
    // routes.push({path:to.path, component: window.layouts.NewPage})
    // next(to)
    // return
    console.log("PATH DOES NOT EXIST")
  }
  else {
    if(window.vue) {
      var namespace = window.vue.$root.$children[0].component.namespace.child('page').append('$pages', to.fullPath)
      console.log("NAM", namespace)
      var comp = new Component(namespace)
      to.matched[0].components.default = window.layouts[comp.type]
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
    hoveredComponent: '',
    selectedComponent: null
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
]

window.vcms.utils.registerComponent('App', require('./Laptops.vue'))
window.componentNames.forEach((name) => {
  var comp = require('./components/' + name + '.vue')
  name = name.split('/').slice(-1)[0]
  window.vcms.utils.registerComponent(name, comp)
})

var comps = require.context('./components/laptops', true, /\.vue$/)
comps.keys().forEach((name) => {
  name = name.split('/').slice(-1)[0]
  name = name.split('.')[0]
  var comp = require('./components/laptops/' + name + '.vue')
  window.vcms.utils.registerComponent(name, comp)
})

comps = require.context('./components/pages', true, /\.vue$/)
comps.keys().forEach((name) => {
  name = name.split('/').slice(-1)[0]
  name = name.split('.')[0]
  var comp = require('./components/pages/' + name + '.vue')
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