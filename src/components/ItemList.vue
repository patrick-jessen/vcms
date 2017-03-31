<template>
<div v-if='showEmpty || items.length' @click='select'>
  <div class='ui dividing header'>{{title}}</div>
  <div class='ui link items'>
    <Item v-for='(i, idx) in items' v-bind='i' :key='idx'></Item>
  </div>
</div>
</template>

<script>
var componentRef = {};
export default {
  props: {
    // Namespace for state
    namespace: {
      type: String,
      default: 'itemList'
    },

    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  created() {
    componentRef.ref = this
  },
  components: {
    Item: require('./Item.vue')
  },
  computed: window.utils.mapState(componentRef, ['showEmpty']),
  methods: {
    select(e) {
      this.$store.dispatch('select', this.namespace)
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