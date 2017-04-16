<template>
  <select class='ui dropdown'>
    <option v-for='o in property.options' :selected='isSelected'>{{o}}</option>
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
    }
  }
}
</script>