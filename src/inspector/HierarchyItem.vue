<template>
<div class='item link' @click='onClick' :class='{disable:!data}' @mouseover='onMouseOver'>
  <i class='icon' :class='icon'></i>
  <div class='content'>
    <div class='header' :class='{selected:isSelected}' :title='def.descr'>{{text}}</div>
    <template v-if='data'>
      <div class='list' v-if='childrenKeys.length > 0'>
        <HierarchyItem v-for='c in childrenKeys' :def='c' :data='child(c)' :key='child(c)'/>
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
  computed: {
    selectedComponent: {
      get() {return this.$root.selectedComponent},
      set(val) {this.$root.selectedComponent = val}
    },
    childrenKeys() {     
      return this.data.def.children
    },
    isSelected() {
      if(!this.selectedComponent || !this.data)
        return false

      return this.selectedComponent.namespace.string === this.data.namespace.string
    },
    text() {
      var t
      if(this.def.title)
        t = this.def.title
      else
        t = this.def.name

      if(this.data.isPage) {
        t += ' ( ' + this.$route.fullPath + ' )'
      }

      return t
    },
    icon() {
      if(this.data.type === 'App')
        return 'cubes'
      if(this.data.isArray)
        return 'green cubes'
      if(this.data.isPage)
        return 'blue file outline'
      return 'green cube'
    }
  },
  methods: {
    child(def) {
      return this.data.child(def.name)
    },
    onClick(e) {
      this.selectedComponent = this.data
      e.stopPropagation()
    },
    onMouseOver(e) {
      window.vue.$data.hoveredComponent = this.namespace
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
.link {
  cursor: pointer;
}
</style>