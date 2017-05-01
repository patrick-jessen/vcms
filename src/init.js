export default () => {

  // Load VCMS components
  var components = require.context('./components/vcms', true, /\.vue$/)
  components.keys().forEach((name) => {
    var fileName = name.match(/\w+(?=\.)/)[0]
    var component = require('./components/vcms/' + fileName + '.vue')
    window.vcms.utils.registerComponent(fileName, component)
  })

  components = require.context('./components/app', true, /\.vue$/)
  components.keys().forEach((name) => {
    var fileName = name.match(/\w+(?=\.)/)[0]
    var component = require('./components/app/' + fileName + '.vue')
    window.vcms.utils.registerComponent(fileName, component)
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
