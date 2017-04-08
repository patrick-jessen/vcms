<template>
<div class='item link' @click='onClick'>
  <i class='cube icon'></i>
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
  created() {
    if(this.$parent.namespace.length > 0)
      this.namespace = this.$parent.namespace + '/$children/' + this.name
    else
      this.namespace = this.name
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
    onClick(e) {
      console.log(this.namespace)
      window.vue.$data._store.inspector.selected = this.namespace
      e.stopPropagation()
    }
  }
}
</script>