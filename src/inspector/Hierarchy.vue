<template>
<div class='ui list'>
  <HierarchyItem :data='app' :def='def'/>
</div>
</template>

<script>
export default {
  computed: {
    app() {
      return window.vue.$data._store.app
    },
    def() {
      return {
        name:'app', 
        type:'app',
        title:'App',
        descr:'App description'
      }
    }
  },
  created() {
    this.namespace = ''
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
  border: 1px solid rgb(212, 212, 213);
  border-radius: 3px;
}
</style>