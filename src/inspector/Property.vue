<template>
<div class='ui item'>
  <div class='ui small header'>{{name}}</div>
  <div :class='wrapperClass'>
    <component 
      :is='type'
      v-bind='attr' 
      v-html='cont' 
      @input='onChange' 
      @click='onClick'>
    </component>
  </div>
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
          return {
            class: 'ui dropdown'
          }
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
    },
    wrapperClass() {
      switch(this.property.type) {
        case 'string':
          return 'ui input'
        case 'toggle':
          return ''//ui slider checkbox'
      }
    },
    name() {
      return this.property.name
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // convert to lowercase
        .toLowerCase()
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); })
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