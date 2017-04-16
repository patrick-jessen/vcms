<template>
<div class='ui'>

  <div class='title' @click='toggle'>
    <i :class='icon'></i>
    {{property.title}}
  </div>

  <table v-if='expanded' class='ui striped table'>
    <tr v-for='p in property.props'>
      <td>
        {{p.title}}
      </td>
      <td>
        <Property :property='p'/>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  props: ['property'],
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    icon() {
      if(this.expanded)
        return 'caret down icon'
      else
        return 'caret right icon'
    },
  },
  beforeCreate() {
    this.$options.components.Property = require('../Property.vue')
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    }
  },
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
</style>