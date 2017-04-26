<template>
<div>
  <div class='ui list'>
    <RouteItem :data='app'/>
  </div>
  
  <div class='ui mini basic buttons'>
    <div class='ui button'>
      <i class="icons">
        <i class="file outline icon"></i>
        <i class="corner add icon"></i>
      </i>
    </div>
    <div class='ui button'>
      <i class='trash icon'></i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  created() {
    this.namespace = ''
  },
  computed: {
    app() {
      return {path: 'App', children: this.$router.options.routes}
    }
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
  border: 1px solid rgb(212, 212, 213);
  border-radius: 3px;
}
</style>