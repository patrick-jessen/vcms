<template>
<div class='tr row'>
  <td>
    <div class='propname'>{{property.title}}</div>
  </td>
  <td>
    <select class='ui dropdown' @input='onChange'>
      <option v-for='o in property.options' 
        :selected='isSelected(o)'>
          {{o}}
      </option>
    </select>
  </td>
</div>
</template>

<script>
export default {
  props: ['property'],
  methods: {
    isSelected(option) {
      if(option === this.property.value)
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

<style scoped>
.propname {
  margin-left: 10px !important;
}
.tr {
  display: table-row;
}
</style>