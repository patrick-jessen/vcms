export default function plugin(Vue) {

  window.vcms = {
    components: {}
  }

  window.vcms.utils = {
    // create a throtteled version of a function.
    // returns a promise.
    createThrottle(func, minInt, context) {
      var time = 0
      var timeout = null

      return function(...args) {
        clearTimeout(timeout)

        return new Promise((res, rej) => {

          // are we allowed to run?
          if(Date.now() - time >= minInt) {
            func.call(context, ...args)
            time = Date.now()
            res()
          }
          // try again later
          else {
            timeout = setTimeout(() => {
              // are we allowed to run now?
              if(Date.now() - time >= minInt) {
                func.call(context, ...args)
                time = Date.now()
                res()
              }
            }, (time + minInt) - Date.now() + 10)
          }
        })
      }
    },

    // get store object which represents the namespace
    getStore(namespace) {
      var store = window.vue.$data._store
      var path = namespace.split('/')
      
      try {
        for(var i = 0; i < path.length; i++) {
          if(!path[i].length) continue
          store = store[path[i]]
        }
      }
      catch(e) {
        return
      }

      return store
    },

    getComponent(namespace) {
      if(!namespace.length)
        return 

      var path = namespace.split('/')
      var comp = window.vue

      try {
        for(var i = 0; i < path.length; i++) {
          if(!path[i].length) continue

          comp = comp.$children.filter((c) => {
            return c.name === path[i]
          })[0]
        }
      }
      catch(e) {return}

      return comp
    },

    getInterface(namespace) {
      var comp = window.vcms.utils.getComponent(namespace)
      if(!comp) 
        return {input:[], output: []}

      var emits = []
      if(comp.$options._parentListeners)
        emits = Object.keys(comp.$options._parentListeners)

      var props = []
      if(comp.$options._componentTag === 'None')
        props = Object.keys(comp.$options.propsData.props)
      else if(comp.$options.propsData)
        props = Object.keys(comp.$options.propsData)

      return {input: props, output: emits}
    },

    registerComponent(name, comp) {
      Vue.component(name, comp)

      var requires = []
      for(var key in comp.props) {
        if(comp.props[key].required)
          requires.push(key)
      }

      window.vcms.components[name] = {
        input: requires,
        output: comp.emits ? comp.emits : [],
        static: comp.static ? comp.static : [],
        children: comp.children ? comp.children : []
      }
    },
  }


  Vue.mixin({
    props: ['name', 'setType'],
    data() {
      return {
        namespace: '',
      }
    },
    beforeCreate() {
      registerStore(this)
    },
    created() {
      var scope = '/$children/'
      if(this.type === 'page')
        scope = '/$pages/'

      if(this.$parent && this.$parent.namespace && this.$parent.namespace.length > 0)
        this.namespace = this.$parent.namespace + scope + this.name
      else
        this.namespace = this.name
    },
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args)
      }
    }
  })
}


function StoreAccessor(property) {
  return {
    get() {
      if(!this.namespace) return

      var store = window.vcms.utils.getStore(this.namespace)
      return store[property]
    },

    set(value) {
      if(!this.namespace) return

      var store = window.vcms.utils.getStore(this.namespace)
      store[property] = value;
    }
  }
}

function registerStore(vm) {
  if(vm == vm.$root) return
  // 1.) Check for a store "option" on the component.
  // 2.) Check for a store "object" on the root vue model.
  if (typeof vm.$root.$data._store !== 'undefined') {

    // Register static fields
    var name = vm.$options._componentTag

    // Loop through the elements of the "static" option.
    var iter = vm.$options.static
    if(iter) {
      // Initialize the computed option if it hasn't already been initialized.
      if (typeof vm.$options.computed === 'undefined') {
        vm.$options.computed = {};
      }

      if(!Array.isArray(iter))
        iter = Object.keys(iter)

      iter.forEach(property => {
        if(property.name)
          vm.$options.computed[property.name] = new StoreAccessor(property.name);
        else
          vm.$options.computed[property] = new StoreAccessor(property);
      });
    }

    // Loop through emits
    if (typeof vm.$options.methods === 'undefined') {
      vm.$options.methods = {};
    }

    var iter = vm.$options.emits
    if(iter) {
      iter.forEach(emit => {
        var capitalized = emit.replace(/^./, (str) => str.toUpperCase())
        vm.$options.methods['emit' + capitalized] = (...args) => {
          vm.$emit(emit, ...args)
        }
      })
    }
  }
}

//////////////////////////////////////

export class Component {
  constructor(namespace) { 
    this.namespace = namespace
    this.store = window.vcms.utils.getStore(namespace)
  }

  get type() {
    return this.store.$type
  }
  get properties() {
    var obj = {}
    for(var k in this.store) {
      if(!this.store.hasOwnProperty(k)) continue
      if(k.startsWith('$')) continue

      obj[k] = this.store[k]
    }
    return obj
  }
  get children() {
    return this.store.$children
  }
  get parent() {
    var parentNamespace = this.namespace.split('/').slice(0,-2).join('/')
    if(parentNamespace.length === 0)
      return 
      
    return new Component(parentNamespace)
  }
}

class Property {
  get value() {

  }
  get def() {

  }
}
