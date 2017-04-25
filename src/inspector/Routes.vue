<template>
<div class='ui container'>
  <RouteItem :data='$router.options.routes'/>
</div>
</template>

<script>
export default {
  created() {
    this.namespace = ''
  },
  components: {
    RouteItem: require('./RouteItem.vue')
  }
}
</script>

<style scoped>
.ui.list {
  background-color: white;
  padding: 10px;
  border: 1px solid gray;
}
</style>