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
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    Item: require('./Item.vue')
  },
  _store: ['showEmpty'],
  methods: {
    select(e) {
      this.$root.$data._store.app.inspector.selected = this.namespace
      e.stopPropagation()
    }
  }
}

// Create component CMS definition
window.utils.createTemplate('ItemList', [
  {
    name: 'showEmpty',
    type: 'toggle'
  },
])
</script>

<style scoped>
.ui.dividing.header {
  padding-top: 1em;
}
.ui.link.items {
  margin-top: 10px;
}
</style>