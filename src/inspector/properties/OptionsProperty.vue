<template>
  <select class='ui dropdown' @input='onChange'>
    <option v-for='o in property.options' 
      :selected='isSelected'>
        {{o}}
    </option>
  </select>
</template>

<script>
export default {
  props: ['property'],
  methods: {
    isSelected(option) {
      if(options === property.value)
        return true
      return false
    },
    onChange(e) {
      console.log('aaaa', e)
      this.$emit('change', e.target.value)
    }
  }
}
</script>