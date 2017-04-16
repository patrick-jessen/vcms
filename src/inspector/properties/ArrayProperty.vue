<template>
<div class='ui'>

  <div class='title' @click='toggle'>
    <i :class='icon'></i>
    <template v-if='property.render'>
      <template v-if='property.type === "array"'>
        <template v-for='p in property.value'>
          <span v-html='property.render(p)'></span>
        </template>
      </template>
      <template v-else>
        <span v-html='property.render(property.value)'></span>
      </template>
    </template>
    <template v-else>
      {{property.title}}
    </template>
  </div>

  <template v-if='expanded'>
    <template v-if='property.type === "array"'>
      <template v-for='(p, i) in property.value'>
        Item {{i}}
        <table>
          <tr v-for='pd in property.props' :title='pd.descr'>
            <td>
              {{pd.title}}
            </td>
            <td>
              <Property :property='childProp(pd, p)' @change='onChange(pd, i, $event)'/>
            </td>
          </tr>
        </table>
      </template>
    </template>
    <template v-else>
      <table>
        <tr v-for='pd in property.props' :title='pd.descr'>
          <td>
            {{pd.title}}
          </td>
          <td>
            <Property :property='childProp(pd, property.value)' @change='onChange(pd, 0, $event)'/>
          </td>
        </tr>
      </table>
    </template>
  </template>
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
<style>
.title img {
  max-width: 80%;
  max-height: 25px;
}
</style>