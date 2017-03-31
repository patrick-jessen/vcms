<template>
<!-- Wrapper -->
<div class='ui icon input' 
  :class='{loading}' 
  @click='select'>

  <!-- Text input -->
  <input class='search icon' 
    :value='text' 
    @input='onInput' 
    :placeholder='placeholder'>

  <!-- Icon -->
  <i class='icon' 
    :class='icon'>
  </i>
</div>
</template>

<script>
export default {
  props: {
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
  computed: window.utils.mapState([
    'placeholder', 
    'icon'
  ]),
  methods: {
    onInput(e) {
      // Update local state
      this.text = e.target.value;

      // Emit change to parent
      this.$emit('change', this.text)
    },
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