<template>
<div class='tr row'>
  <td>
    <div>{{property.title}}</div>
  </td>
  <td>
    <div class='ui input'>
      <input :value='property.value' @input='onChange'>
    </div>
  </td>
</div>
</template>

<script>
export default {
  props: ['property', 'nested'],
  methods: {
    onChange(e) {
      var test = /[^0-9]+/g
      var sanitized = e.target.value.replace(test, '')
      
      if(sanitized === e.target.value)
        this.$emit('change', e.target.value)
      else
        e.target.value = sanitized
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
}
.tr { 
  display: table-row;
}
</style>