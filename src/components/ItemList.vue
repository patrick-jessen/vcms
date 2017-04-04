<template>
<div  
  @click='select'
  @mouseenter='hover(true)'
  @mouseleave='hover(false)'
  :class='inspectClass'>

<div v-if='showEmpty || items.length'>
  <div class='ui dividing header'>{{title}}</div>
  <div class='ui link items'>
    <Item v-for='(i, idx) in items' v-bind='i' :key='idx'></Item>
  </div>
</div>
</div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  _store: [{
    name: 'showEmpty',
    type: 'toggle'
  },
  {
    name: 'title',
    type: 'string'
  }],
  methods: {
    select(e) {
      this.$root.$data._store.app.inspector.selected = this.namespace
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
.ui.dividing.header {
  padding-top: 1em;
}
.ui.link.items {
  margin-top: 10px;
}
</style>