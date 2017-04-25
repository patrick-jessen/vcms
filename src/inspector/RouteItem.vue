<template>
<div class='ui list'>
<div v-for='p in data'class='item link'>
  <i class='file outline blue icon'></i>
  <div class='content'>
    <div class='header'>{{p.path}}</div>
    <RouteItem v-if='p.children' :data='p.children'/>
  </div>
</div>
</div>
</template>

<script>
export default {
  props: ['data'],
  beforeCreate() {
    this.$options.components.RouteItem = require('./RouteItem.vue')
  }
}
</script>