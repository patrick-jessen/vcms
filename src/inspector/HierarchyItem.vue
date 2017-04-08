<template>
<li v-if='name !== "inspector"'>
  {{name}}

  <ul>
    <div v-if='name==="root"'  >
      <HierarchyItem v-for='c in childrenKeys' :name='c' :data='child(c)' :key='c'/>
    </div>
    <div v-else-if='childrenKeys.length > 0'>
      <HierarchyItem :name='childrenKeys[1]' :data='child(childrenKeys[1])'/>
      <HierarchyItem :name='childrenKeys[2]' :data='{}'/>
      <HierarchyItem :name='childrenKeys[3]' :data='{}'/>
      <HierarchyItem :name='childrenKeys[4]' :data='{}'/>
      <HierarchyItem :name='childrenKeys[5]' :data='{}'/>
      <HierarchyItem :name='childrenKeys[6]' :data='{}'/>
      <HierarchyItem :name='childrenKeys[7]' :data='{}'/>
    </div>
    <!--<div v-else-if='name=="app"' v-for='c in childrenKeys' :key='c'>
      <h1>heheh {{c}}</h1>
    </div>-->
    <!--
    <div v-else>
      {{childrenKeys}}
    </div>-->
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
      return Object.keys(this.data).filter((val) => {
        return typeof val.$type !== undefined
      })
    }
  },
  methods: {
    child(key) {
      if(this.data.hasOwnProperty(key))
        return this.data[key]
      return {}
    },
  }
}
</script>