<template>
<div class='ui five wide column'>
  <div class='main ui container'>
  <div class='ui dividing large header'>Hierarchy</div>
  <Hierarchy/>

  <div class='ui dividing large header'>Properties</div>
  <Property v-for='(p, idx) in properties' :property='p' @change='propertyChange(p, $event)' :key='p'></Property>

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
      var storeModule = window.utils.getStore(this.selected)
      if(!storeModule || !storeModule.$type)
        return [{
          name: 'type',
          type: 'select',
          options: ['none'],
          value: 'none'
        }]

      var compDef = window.components[storeModule.$type].static
      if(!compDef)
        return []

      // find compatible types
      console.error('asd')

      var inspectorArr = [{
          name: 'type',
          type: 'select',
          options: [storeModule.$type],
          value: storeModule.$type
        }]
      Object.keys(compDef).forEach(property => {
        var obj = Object.assign({}, compDef[property])
        var name = compDef[property].name
        obj.value = storeModule[name]
        inspectorArr.push(obj)
      })

      // for(var i = 0; i < Object.keys(compDef).length; i++) {
        
      //   var obj = Object.assign({}, compDef[i])

      //   var name = compDef[i].name
      //   obj.value = storeModule[name]
      //   inspectorArr.push(obj)
      // }

      return inspectorArr
    }
  },

  methods: {
    propertyChange(p, v) {
      window.utils.getStore(this.selected)[p.name] = v
    }

  },
  components: {
    Property: require('./Property.vue'),
    Hierarchy: require('./Hierarchy.vue')
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