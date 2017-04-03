<template>
<div  
  @click='select'
  @mouseenter='hover(true)'
  @mouseleave='hover(false)'
  :class='inspectClass'>

  <!--<h1>This is a component</h1>-->
  <component :is='data.type' v-bind='data' :name='name'></component>
</div>
</template>

<script>
export default {
  props: ['data', 'name'],
  created() {
    this.namespace = this.$parent.namespace + '/children'
  },
  components: {
    Search: require('./Search.vue'),
    Inspector: require('./Inspector.vue'),
    ItemList: require('./ItemList.vue'),
    Controls: require('./Controls.vue'),
  }
}
</script>
