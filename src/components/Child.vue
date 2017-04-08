<template>
<div 
  @click.capture='select'
  @mouseenter='hover(true)'
  @mouseleave='hover(false)'
  v-if='exists'>

  <component :is='type' v-bind='$props' :name='name' :eventbus='self'></component>
</div>
</template>

<script>
export default {
  props: ['name'],

  beforeCreate() {
    // Dynamically add properties provided by the parent
    var props = this.$options._parentVnode.data.attrs
    for(var key in props) {
      if(!props.hasOwnProperty(key)) continue

      this.$options.props[key] = {type: null}   // Create prop definition
      this.$options.propsData[key] = props[key] // Set data for prop
    }
  },
  created() {
    // Proxy namespace of parent (makes this component invisible to child)
    this.namespace = this.$parent.namespace + '/$children'
  },
  computed: {
    self() {
      return this
    },
    exists() {
      return typeof window.utils.namespaceToStore(this.namespace)[this.name] !== 'undefined'
    },
    type() {
      var store = window.utils.namespaceToStore(this.namespace)
      return store[this.name].$type
    }
  },
  methods: {
    select(e) {
      this.$root.$data._store.inspector.selected = this.namespace + '/' + this.name
      e.stopPropagation()
    }
  }
}
</script>
