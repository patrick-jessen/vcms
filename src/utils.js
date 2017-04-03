window.utils = {

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

  // get the store module with the specified namespace
  namespaceToStore(namespace) {
    var store = window.vue.$data._store
    var path = namespace.split('/')

    for(var i = 0; i < path.length; i++)
      store = store[path[i]]

    return store
  },
}