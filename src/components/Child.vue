<template>
<div 
  @click='select'
  @mouseenter='hover(true)'
  @mouseleave='hover(false)'
  :class='inspectClass'>

  <!--<h1>This is a component</h1>-->
  <component :is='type' v-bind='props' :name='name' :eventbus='self'></component>
</div>
</template>

<script>
export default {
  props: ['props', 'name'],
  created() {
    this.namespace = this.$parent.namespace + '/children'
  },
  computed: {
    self() {
      return this
    },
    type() {
      var store = window.utils.namespaceToStore(this.namespace)
      return store[this.name].$type
    }
  }
}
</script>
