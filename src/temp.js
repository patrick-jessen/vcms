window.utils = {

  // Maps VUEX state to computed functions.
  // refObj is a wrapper for a reference to the Vue component (eg. refObject.ref = COMPONENT).
  // state is an array or object specifying the state objects to capture.
  // other [optional] is an object containing other computed functions to add.
  mapState(refObj, state, other) {
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
        var store = refObj.ref.$store
        var namespace = refObj.ref.namespace
        if(typeof namespace === 'undefined')
          return store.state[s]
        else
          return store.state[namespace][s]
      }
    }
    
    // merge other functions
    Object.assign(obj, other)
    return obj
  },

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
  }

}