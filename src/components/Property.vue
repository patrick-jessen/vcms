<template>
<div>
  <h3>{{property.name}}</h3>
  <component 
    :is='type'
    v-bind='attr' 
    v-html='cont' 
    @input='onChange' 
    @click='onClick'>
  </component>
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
          return 'input'
        case 'select':
          return 'select'
        case 'toggle':
          return 'input'
      }
    },
    attr() {
      switch(this.property.type) {
        case 'string':
          return {
            value: this.property.value
          }
        case 'select':
          return {}
        case 'toggle':
          return {
            type: 'checkbox',
            checked: this.property.value
          }
      }
    },
    cont() {
      switch(this.property.type) {
        case 'select': {
          var options = this.property.options
          var str = '';

          for(var i = 0; i < options.length; i++) {
            if(options[i] === this.property.value)
              str += '<option selected="selected">' + options[i] + '</option>'
            else  
              str += '<option>' + options[i] + '</option>'
          }
          return str
        }
      }
    }
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
  }
}
</script>