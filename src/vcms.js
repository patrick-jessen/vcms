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
      var path = namespace.string.split('.')
      
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
    props: ['name'],
    data() {
      return {
        component: null
      }
    },
    beforeCreate() {
      registerStore(this)
    },
    created() {
      if(!this.name)
        return

      var namespace

      // This is a child component
      if(this.$parent && this.$parent.component) {
        namespace = this.$parent.component.namespace.child(this.name)
      }
      // This is the root component
      else {
        namespace = new Namespace(this.name)
      }

      this.component = new Component(namespace)
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
      return this.component.store.$props[property]
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

function currentRoute() {
  return window.vue.$route.fullPath
}

export class Component {
  constructor(namespace, store) { 
    if(typeof namespace === 'string')
      namespace = new Namespace(namespace)

    if(!store)
      store = window.vcms.utils.getStore(namespace)

    this._namespace = namespace
    this._store = store
  }

  get isPage() {
    return this._store.$type === 'Page'
  }
  get isArray() {
    return Array.isArray(this.store)
  }

  get namespace() {
    if(this.isPage) {
      var route = currentRoute()
      return this._namespace.append('$pages', route)
    }

    return this._namespace
  }

  get store() {
    if(this.isPage) {
      var route = currentRoute()
      return this._store.$pages[route]
    }
    return this._store
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
    var obj = {}
    var children = this.store.$children

    for(var k in children) {
      if(!children.hasOwnProperty(k)) continue
      var namespace = this.namespace.child(k)
      obj[k] = new Component(namespace, children[k])
    }
    return obj
  }

  get parent() {
    var parentNamespace = this.namespace.parent
    if(!parentNamespace)
      return
    return new Component(parentNamespace)
  }

  get def() {
    if(this.isArray) {
      var obj = {
        children: []
      }
      for(var i in this.store) {
        obj.children.push({
          title: 'Item ' + i,
          name: i
        })
      }
      return obj
    }
      
    return window.vcms.components[this.type]
  }

  child(name) {
    if(this.isArray) {
      var store = this.store[name]
      if(!store)
        return

      return new Component(this.namespace.append(name))
    }
    else {
      var store = this.store.$children[name]
      if(!store)
        return

      return new Component(this.namespace.child(name))
    }
  }
}

class Namespace {
  constructor(namespace) {
    this.namespace = namespace
  }

  get string() {
    return this.namespace
  }

  child(name) {
    return new Namespace(this.namespace + '.$children.' + name)
  }

  append(...names) {
    var ns = this.namespace
    for(var n in names) {
      ns += '.' + names[n]
    }

    return new Namespace(ns)
  }

  get parent() {
    var parentNamespace = this.namespace.split('.').slice(0,-2).join('.')
    if(parentNamespace.length === 0)
      return 

    return new Namespace(parentNamespace)
  }
}


class Property {
  get value() {

  }
  get def() {

  }
}
