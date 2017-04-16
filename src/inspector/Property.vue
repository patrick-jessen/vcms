<script>
var ArrayProperty = require('./properties/ArrayProperty.vue')
var OptionsProperty = require('./properties/OptionsProperty.vue')
var TextProperty = require('./properties/TextProperty.vue')

export default {
  functional: true,
  props: ['property'],

  render(createElement, ctx) {
    var type = ctx.props.property.type.split('.')[0]
    switch(type) {
      case 'string':
        type = TextProperty
        break
      case 'select':
        type = OptionsProperty
        break
      case 'array':
        type = ArrayProperty
        break
    }

    ctx.data.attrs['property'] = ctx.props.property

    return createElement(type, ctx.data)
  },
}
</script>