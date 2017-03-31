window.utils = {

  // Maps VUEX state to computed functions.
  // state is an array or object specifying the state objects to capture.
  // other [optional] is an object containing other computed functions to add.
  mapState(state, other) {
    var obj = {}
    
    // get state names (array style)
    var funcNames = state
    var stateNames = state

    // get state names (object style)
    if(!Array.isArray(state)) {
      funcNames = Object.keys(state)
      stateNames = Object.values(state)
    }
    
    // create function for obtaining each state object
    for(var i = 0; i < funcNames.length; i++) {   
      
      let s = stateNames[i] // capture state name
    
      // create the function
      obj[funcNames[i]] = function() {
        var namespace = this.namespace
        var store = window.utils.namespaceToStore(namespace)

        return store[s]
      }
    }
    
    // merge other functions
    Object.assign(obj, other)
    return obj
  },

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

  // create CMS template for a component
  createTemplate(componentName, defs) {
    if(!window.components)
      window.components = {}

    window.components[componentName] = defs
  },

  // get the store module with the specified namespace
  namespaceToStore(namespace) {
    var store = window.$store.state
    var path = namespace.split('/')

    for(var i = 0; i < path.length; i++)
      store = store[path[i]]

    return store
  },

  // create a namespaced VUEX store module with naive mutators
  createStoreModule(state) {
    var keys = Object.keys(state)
    var mutations = {}

    for(var i = 0; i < keys.length; i++) {
      let key = keys[i]

      mutations[key] = (state, arg) => {
        state[key] = arg
      }
    }

    return {
      namespaced: true,
      state: state,
      mutations: mutations
    }
  }

}