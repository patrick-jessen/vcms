<template>
<div class='item'>
  <i class='square icon'></i>
  <div class='content'>
    <div class='header'>{{name}}</div>
    <!--<div class='description'>{{data.$type}}</div>-->
    <div class='list' v-if='childrenKeys.length > 0'>
      <HierarchyItem v-for='c in childrenKeys' :name='c' :data='child(c)' :key='c'/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['data', 'name'],
  beforeCreate() {
    this.$options.components.HierarchyItem = require('./HierarchyItem.vue')
  },
  computed: {
    childrenKeys() {
      if(!this.data.$children)
        return []

      return Object.keys(this.data.$children)
    }
  },
  methods: {
    child(key) {
      return this.data.$children[key]
    },
  }
}
</script>