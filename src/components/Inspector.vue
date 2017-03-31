<template>
<div class='sidebar' @click='select'>
  <div class='main ui container'>
  <div class='ui dividing large header' v-if='!selected'>Select a component</div>
  <template v-else>
    <div class='ui dividing large header'>{{selected}}</div>
    <Property v-for='(p, idx) in properties' :property='p' @change='propertyChange(p, $event)' :key='idx'></Property>
  </template>
  </div>
</div>

</template>

<script>
export default {
  computed: window.utils.mapState(['selected'], {
    properties() {
      var storeModule = window.utils.namespaceToStore(this.selected)
      var compDef = window.components[storeModule.type]
      if(!compDef)
        return []

      var inspectorArr = []
      for(var i = 0; i < Object.keys(compDef).length; i++) {
        
        var obj = Object.assign({}, compDef[i])

        var name = compDef[i].name
        obj.value = storeModule[name]
        inspectorArr.push(obj)
      }

      return inspectorArr
    }
  }),

  methods: {
    select(e) {
      e.stopPropagation()
    },
    propertyChange(p, v) {
      window.$store.commit(this.selected + '/' + p.name, v)
    }

  },
  components: {
    Property: require('./Property.vue')
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  width: 400px;
  height: 100%;
  background-color: #eeeeee;
  right: 0;
  border-left: 1px solid gray;
}
.main.ui.container {
  width: 80%;
  margin-top: 20px
}
</style>