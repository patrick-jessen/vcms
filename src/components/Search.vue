<template>
<div  
  @click='select'
  @mouseenter='hover(true)'
  @mouseleave='hover(false)'
  :class='inspectClass'>

<!-- Wrapper -->
<div class='ui icon input' 
  :class='{loading:isSearching}'>

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
</div>
</template>

<script>
export default {
  emits: ['search'],
  props: {
    'isSearching': {type:Boolean,default:false},
  },
  static: {
    'placeholder':  {type: 'string',default:'Search...'},
    'icon':         {type: 'select',default:'search',options: ['search', 'find']}
  },
  
  data() {
    return {
      text: '' // Search string
    }
  },
  methods: {
    onInput(e) {
      this.text = e.target.value;     // Update local state
      this.emit('change', this.text) // Emit change to parent
    },
  },
}
</script>

<style scoped>
.ui.icon.input {
  width: 100%
}
</style>