<template>
<div class='trg row'>
  <div class='td row'>
    <td class='title' @click='toggle'>
      <i :class='icon'></i>
      {{property.title}}
    </td>
    <td>  
      <span v-html='preview' class='title' @click='toggle'></span>
    </td>
  </div>
  <td v-if='expanded' colspan='2' class='subtable'>
    <table>
    <template v-if='property.type === "array"'>
      <template v-for='(p, i) in property.value'>
      <Property 
        :nested='1' 
        :title='p.descr' 
        :property='childProp(property.props, i, property.value)' 
        @change='onChange(p, i, $event)' 
        :key='p'
        class='child'
        />
      </template>
      <button @click='onAdd'>Add</button><button @click='onRemove'>Remove</button>
    </template>
    <template v-else v-for='p in property.props'>
      <Property 
        :nested='1' 
        :title='p.descr' 
        :property='childProp(p, 0, property.value)' 
        @change='onChange(p, 0, $event)' 
        :key='p'
        class='child'
        />
    </template>
    </table>
  </td>
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
    preview() {
      // no render function
      if(!this.property.render)
        return this.property.value

      return this.property.render(this.property.value)
    },
    keys() {
      return Object.keys(this.property.value)
    },
  },
  beforeCreate() {
    this.$options.components.Property = require('../Property.vue')
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded
    },
    childProp(propDef, i, prop) {
      if(this.property.type === 'array') {
        return {
          title:'Item ' + i, 
          type:'object',
          props: propDef,
          value: prop[i],
          render: (item) => {return this.property.render([item])},
          store: this.property.store[this.property.name][i],
        }
      }

      var obj = Object.assign({}, propDef)
      obj.value = prop[propDef.name]
      obj.store = this.property.store[this.property]

      return obj
    },
    onChange(pd, i, e) {
      //tempoary hack
      if(!this.property.store[pd.name])
        this.$set(this.property.store[this.property.name], pd.name, e)  
      else
        this.$set(this.property.store, pd.name, e)
    },
    onAdd() {
      var obj = this.property.defaultItem
      this.property.value.push(obj)
    },
    onRemove() {
      this.property.value.pop()
    },
  },
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
.icon {
  margin-left: -5px;
  margin-right: -2px;
}
td {
  position: relative;
  padding-left: 10px !important;
}
.props {
  margin-left: 30px;
}
.child:nth-child(odd) {
  background-color: #eaffff !important;
}
.child:nth-child(even) {
  background-color: #f6ffff !important;
}
.child:last-child {
  border-bottom: 1px solid black !important;
}
tbody.child {
  display: table-row;
}
.trg {
  display: table-row-group;
}
.trg.child {
  display: table-row;
}

.row {
  vertical-align: middle;
}
.trg.child .row {
   display: table-row;
}
.td {
  display: table-row;
}

.subtable {
  padding: 0 !important;
}
.subtable table {
  width: 100%;
}

</style>
<style>
.title img {
  max-width: 80%;
  max-height: 25px;
}
</style>