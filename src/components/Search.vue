<template>
<div class='ui icon input' :class='{loading}' @click='select'>
  <input class='search icon' :value='text' @input='onInput' :placeholder='placeholder'>
  <i class='icon' :class='icon'></i>
</div>
</template>

<script>
var componentRef = {};
export default {
  props: {
    // Namespace for state
    namespace: {
      type: String,
      default: 'search'
    },

    // Whether to indicate loading
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // Search string
      text: ''
    }
  },
  created() {
    componentRef.ref = this
  },

  computed: window.utils.mapState(componentRef, ['placeholder', 'icon']),
  
  methods: {
    onInput(e) {
      // Update local state
      this.text = e.target.value;

      // Emit change to parent
      this.$emit('change', this.text)
    },

    select(e) {
      this.$store.dispatch('select', this.namespace)
      e.stopPropagation()
    }
  },
}


// Create component CMS definition
window.utils.createTemplate('Search', [
  {
    name: 'placeholder',
    type: 'string'
  },
  {
    name: 'icon',
    type: 'select',
    options: [
      'search', 'find'
    ]
  }
])
</script>

<style scoped>
.ui.icon.input {
  width: 100%
}
</style>