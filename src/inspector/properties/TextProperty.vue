<template>
<tr>
  <td>
    <div :style='nest'>{{property.title}}</div>
  </td>
  <td>
    <div v-if='icon' class='ui icon input'>
      <i class='icon' :class='icon'></i>
      <input :value='property.value' @input='onChange'>
    </div>
    <div v-else class='ui input'>
      <input :value='property.value' @input='onChange'>
    </div>
  </td>
</tr>
</template>

<script>
export default {
  props: ['property', 'nested'],
  computed: {
    icon() {
      var type = this.property.type.split('.')
      if(type.length > 1) {
        switch(type[1]) {
          case 'url':
            return 'world'
          case 'img':
            return 'image'
        }
      }
      return 
    },
    nest() {
      if(this.nested)
        return 'margin-left: ' + 15*(this.nested+1) + 'px;'
    
      return 'margin-left: 10px;'
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
}
</style>