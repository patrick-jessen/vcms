<template>
<div class='sidebar' @click='select'>
  <h1 v-if='!selected'>Select a component</h1>
  <template v-else>
    <h1 v-if='selected'>{{selected}}</h1>

    <Property v-for='(p, idx) in properties' :property='p' @change='propertyChange(p, $event)' :key='idx'></Property>
  </template>
</div>

</template>

<script>
var componentRef = {};
export default {
  created() {
    componentRef.ref = this
  },
  computed: window.utils.mapState(componentRef, ['selected'], {
    properties() {
      var storeModule = this.$store.state[this.selected]
      var compDef = window.components[storeModule.type]

      console.log('props', storeModule, compDef)

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
      this.$store.dispatch(this.selected + '/' + p.name, v)
    }

  },
  components: {
    Property: require('./Property.vue')
  }
}
</script>

<style>
.sidebar {
  position: fixed;
  width: 400px;
  height: 100%;
  background-color: lightgray;
  right: 0;
  border-left: 1px solid gray;
}
</style>