<template>
<ul>
  <li>dummy item</li>
  <HierarchyItem :data='rootItem' name='root'/>
</ul>
</template>

<script>
export default {
  computed: {
    rootItem() {
      return window.vue.$data._store
    }
  },
  components: {
    HierarchyItem: require('./HierarchyItem.vue')
  }
}
</script>