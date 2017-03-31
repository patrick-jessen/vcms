window.mapState = function(refObj, state, other) {
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
  
  Object.assign(obj, other)
  return obj
}

window.mapActions = function(component, actions) {
  var obj = {}
  
  var funcNames = actions
  var actionNames = actions
  
  if(!Array.isArray(actions)) {
    funcNames = Object.keys(actions)
    actionNames = Object.values(actions)
  }
  
  for(var i = 0; i < funcNames.length; i++) {   
    let s = actionNames[i]
   
    obj[funcNames[i]] = function(arg) {
      component.$store.dispatch(component.namespace + '/' + s, arg)
    }
  }
  
  return obj
}

//var computed = mapState(component, ['placeholder', 'icon'])
// var computed = mapState(component, {
//   test : 'placeholder', 
//   icon: 'icon'
// })
// var actions = mapActions(component, {
//   setPlaceholder: 'placeholder',
//   setIcon: 'setIcon'
// })

// setTimeout(() => {
//   actions.setPlaceholder('top kek')
//   actions.setIcon('top kek')
  
//   console.log(computed.test())
//   console.log(computed.icon())
// }, 200)

// Test dispatcher
// console.log('before dispatch', store.state.search.placeholder)
// dispatch('search/placeholder', 'lel')
// console.log('after dispatch', store.state.search.placeholder)