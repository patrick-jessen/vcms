<template>
<div class='item link' @click='onClick'>
  <i class='file outline blue icon'></i>
  <div class='content'>
    <div class='header' :class='{selected:isSelected}'>{{data.path}}</div>
    <template v-if='data.children'>
      <div class='list' v-if='data.children.length > 0'>
        <RouteItem v-for='c in data.children' :data='c' :key='c' :prefix='data.path'/>
      </div>
    </template>
  </div>
</div>
</template>

<script>
export default {
  props: ['data', 'prefix'],
  beforeCreate() {
    this.$options.components.RouteItem = require('./RouteItem.vue')
  },
  computed: {
    fullPath() {
      var path = this.data.path
      if(this.prefix != 'App')
        path = this.prefix + '/' + path
      return path
    },
    isSelected() {
      return this.fullPath === this.$route.path
    },
  },
  methods: {
    onClick(e) {
      if(this.data.path === 'App')
        this.$router.push('/')
      else
        this.$router.push(this.fullPath)
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: lightblue;
}
.link {
  cursor: pointer;
}
</style>