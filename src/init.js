export default () => {
  // Load VCMS components
  var components = require.context('./components/vcms', true, /\.vue$/)
  components.keys().forEach((name) => {
    var fileName = name.match(/\w+(?=\.)/)[0]
    var component = require('./components/vcms/' + fileName + '.vue')
    window.vcms.utils.registerComponent(fileName, component)
  })

  // Load app components
  components = require.context('./components/app', true, /\.vue$/)
  components.keys().forEach((name) => {
    var fileName = name.match(/\w+(?=\.)/)[0]
    var component = require('./components/app/' + fileName + '.vue')
    window.vcms.utils.registerComponent(fileName, component)
  })
  var defs = require.context('./components/app', true, /\.yml$/)
  defs.keys().forEach((name) => {
    var fileName = name.match(/\w+(?=\.)/)[0]
    var def = require('./components/app/' + fileName + '.yml')
    console.log("DEF FOR " + fileName, def)
  })


  // Load page components
  components = require.context('./components/pages', true, /\.vue$/)
  components.keys().forEach((name) => {
    var fileName = name.match(/\w+(?=\.)/)[0]
    var component = require('./components/pages/' + fileName + '.vue')
    window.vcms.utils.registerComponent(fileName, component)
  })

  // Load app component
  window.vcms.utils.registerComponent('App', require('./App.vue'))

  // Load inspector
  window.vcms.utils.registerComponent('Inspector', require('./inspector/Inspector.vue'))
}
