<template>
<div v-if='icon' class='ui icon input'>
  <i class='icon' :class='icon'></i>
  <input :value='property.value' @input='onChange'>
</div>
<div v-else class='ui input'>
  <input :value='property.value' @input='onChange'>
</div>
</template>

<script>
export default {
  props: ['property'],
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
    }
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>