<template>
<div v-if='items.length'>
  <div class='ui dividing header'>{{title}}</div>
  <div class='ui link items'>
    <Item v-for='i in items' v-bind='i'></Item>
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