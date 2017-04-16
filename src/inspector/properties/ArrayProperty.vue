<template>
<div class='ui'>

  <div class='title' @click='toggle'>
    <i :class='icon'></i>
    {{property.title}}
  </div>

  <table v-if='expanded' class='ui striped table'>
    <template v-for='(p, i) in items'>
      <th v-if='items.length > 1'>Item #{{i}}</th>
      <tr v-for='pd in property.props' :title='pd.descr'>
        <td>
          {{pd.title}}
        </td>
        <td>
          <Property :property='childProp(pd, p)' @change='onChange(pd, i, $event)'/>
        </td>
      </tr>
    </template>
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
    items() {
      if(this.property.type === 'array')
        return this.property.value
  
      return [this.property.value]
    }
  },
  beforeCreate() {
    this.$options.components.Property = require('../Property.vue')
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
    childProp(propDef, prop) {
      var obj = Object.assign({}, propDef)
      obj.value = prop[propDef.name]
      return obj
    },
    onChange(pd, i, e) {
      if(this.property.type === 'array')
        this.$set(this.property.store[this.property.name][i], pd.name, e)
      else
        this.$set(this.property.store[this.property.name], pd.name, e)
    }
  },
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
</style>