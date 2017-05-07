//import Vue from 'vue'
import VueRouter from 'vue-router'
import Vcms from './vcms.js'
import {Component} from './vcms.js'
import Store from './store/laptops2'
import routes from './routes.js'

Vue.use(VueRouter)
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

    var appWidth = 80;
    var inspectorCls = ''

    if(!this.showInspector) {
      appWidth = 100;
    }

    return createElement('div', [
       createElement('App', {attrs: {name:'app'},style: {
            width: '' + appWidth + '%' }
        }),
        createElement('Inspector', {
          class: { 'hidden': !this.showInspector  },
          style: {  width: '' + (100-appWidth) + '%', }
        })])
  },
  data: {
    _store: Store,
    ctrl: false,
    showInspector: true,
    hoveredComponent: '',
    selectedComponent: null
  },
  router
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