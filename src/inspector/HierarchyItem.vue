<template>
<div class='item link' @click='onClick' :class='{disable:!data}'>
  <i class='cube icon'></i>
  <div class='content'>
    <div class='header' :class='{selected:isSelected}'>{{nameStr}}</div>
    <template v-if='data'>
      <div class='list' v-if='childrenKeys.length > 0'>
        <HierarchyItem v-for='c in childrenKeys' :def='c' :data='child(c)' :key='c'/>
      </div>
    </template>
  </div>
</div>
</template>

<script>
export default {
  props: ['data', 'def'],
  beforeCreate() {
    this.$options.components.HierarchyItem = require('./HierarchyItem.vue')
  },
  created() {
    var scope = '/$children/'
    if(this.def.type === 'page')
      scope = '/$pages/'

    if(this.$parent.namespace.length > 0)
      this.namespace = this.$parent.namespace + scope + this.nameStr
    else
      this.namespace = this.nameStr
  },
  computed: {
    childrenKeys() {     
      console.log('type is', this.data.$type)
      var def = window.vcms.components[this.data.$type]
      if(!def) 
        return []

      return def.children
    },
    isSelected() {
      return window.vue.$data._store.inspector.selected === this.namespace
    },
    nameStr() {
      if(typeof this.def.name === 'function') {
        return this.def.name();
      }
      return this.def.name
    }
  },
  methods: {
    child(def) {
      if(def.type === 'page') {
        if(!this.data.$pages)
          return

        var name = def.name
        if(typeof name === 'function')
          name = name()

        return this.data.$pages[name]
      }
      else {
        if(!this.data.$children)
          return

        var name = def.name
        if(typeof name === 'function')
          name = name()

        return this.data.$children[name]
      }
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