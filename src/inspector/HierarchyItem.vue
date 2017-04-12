<template>
<div class='item link' @click='onClick' :class='{disable:!data}'>
  <i class='cube icon'></i>
  <div class='content'>
    <div class='header' :class='{selected:isSelected}'>{{name}}</div>
    <template v-if='data'>
      <div class='list' v-if='childrenKeys.length > 0'>
        <HierarchyItem v-for='c in childrenKeys' :name='c' :data='child(c)' :key='c'/>
      </div>
    </template>
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
      this.namespace = this.$parent.namespace + '/' + this.name
    else
      this.namespace = this.name
  },
  computed: {
    childrenKeys() {     
      var def = window.vcms.components[this.data.$type]
      if(!def) 
        return []

      def = def.children
      if(!def) 
        return []
        
      return def.map((c) => {
        return c.name
      })
    },
    isSelected() {
      return window.vue.$data._store.inspector.selected === this.namespace
    }
  },
  methods: {
    child(key) {
      if(!this.data.$children)
        return

      return this.data.$children[key]
    },
    onClick(e) {
      window.vue.$data._store.inspector.selected = this.namespace
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: lightblue;
}
.disable {
  color: darkgray !important;
}
.disable .header {
  color: darkgray !important;
}
</style>