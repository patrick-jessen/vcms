<template>
<div class='ui five wide column'>
  <div class='main ui container'>
  <div class='ui dividing large header'>Hierarchy</div>
  <Hierarchy/>

  <div class='ui dividing large header'>Properties</div>
  <PropertyTable name='properties' :properties='properties'/>

  </div>
</div>

</template>

<script>
export default {
  static: [{name:'selected'}],
  created() {
    this.namespace = 'inspector'
  },
  computed: {
    properties() {
      // app is imutable
      if(this.selected === 'app') 
        return []

      // get interface of child
      var iface = window.vcms.utils.getInterface(this.selected)
      var matchingTypes = ['None']

      for(var key in window.vcms.components) {
        if(!window.vcms.components.hasOwnProperty(key)) continue

        var comp = window.vcms.components[key]
        var valid = true

        // check inputs
        for(var i = 0; i < comp.input.length; i++) {
          if(iface.input.indexOf(comp.input[i]) < 0) {
            valid = false
            break
          }
        }
        if(!valid) continue

        // check outputs
        for(var i = 0; i < iface.output.length; i++) {
          if(comp.output.indexOf(iface.output[i]) < 0) {
            valid = false
            break
          }
        }

        if(valid)
          matchingTypes.push(key)
      }

      var store = window.vcms.utils.getStore(this.selected)
      if(!store) {
        return [{
          name: '$type',
          type: 'select',
          options: matchingTypes,
          value: 'None',
          title: 'Component type',
          descr: 'Type of component'
        }]
      }

      var inspectorArr = [{
          name: '$type',
          type: 'select',
          options: matchingTypes,
          value: store.$type,
          title: 'Component type',
          descr: 'Type of component'
        }]

      var compDef = window.vcms.components[store.$type].static
      if(compDef) {   
        Object.keys(compDef).forEach(property => {
          var obj = Object.assign({}, compDef[property])
          var name = compDef[property].name
          obj.value = store[name]
          obj.store = store
          inspectorArr.push(obj)
        })
      }

      return inspectorArr
    }
  },
  components: {
    Hierarchy: require('./Hierarchy.vue'),
    PropertyTable: require('./PropertyTable.vue')
  },
}
</script>

<style scoped>
.ui.five.wide.column {
  background-color: #eeeeee;
  border-left: 1px solid gray;
}
.main.ui.container {
  width: 80%;
  margin-top: 20px
}
</style>