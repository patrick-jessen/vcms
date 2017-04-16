<template>
<div class='ui item'>
  <component :is='type' :property='property'/>
</div>
</template>

<script>
export default {
  props: [
    'property'
  ],
  computed: {
    type() {
      switch(this.property.type) {
        case 'string':
          return 'TextProperty'
        case 'select':
          return 'OptionsProperty'
        case 'array':
          return 'ArrayProptery'
      }
    },
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value)
    },
    onClick(e) {
      if(this.property.type !== 'toggle')
        return

      this.$emit('change', e.target.checked)
    }
  },
  components: {
    ArrayProptery: require('./properties/ArrayProperty.vue'),
    OptionsProperty: require('./properties/OptionsProperty.vue'),
    TextProperty: require('./properties/TextProperty.vue')
  }
}
</script>