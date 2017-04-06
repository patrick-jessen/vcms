<template>
<li>
  {{name}}

  <ul>
    <HierarchyItem v-for='c in childrenKeys' :name='c' :data='child(c)'/>
  </ul>
</li>
</template>

<script>
export default {
  props: ['data', 'name'],
  created() {
    this.$options.components.HierarchyItem = require('./HierarchyItem.vue')
  },
  computed: {
    me() {
      return Object.keys(this.data)[0]
    },
    childrenKeys() {
      return Object.keys(this.data)
    }
  },
  methods: {
    child(key) {
      console.log(this.data)

      if(this.data.hasOwnProperty(key))
        return this.data[key]
      return {}
    },
  }
}
</script>