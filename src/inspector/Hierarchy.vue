<template>
<div class='ui list'>
  <HierarchyItem :data='root' name='app'/>
</div>
</template>

<script>
export default {
  computed: {
    root() {
      return window.vue.$data._store.app
    }
  },
  components: {
    HierarchyItem: require('./HierarchyItem.vue')
  }
}
</script>

<style scoped>
.ui.list {
  background-color: white;
  padding: 10px;
  border: 1px solid gray;
}
</style>