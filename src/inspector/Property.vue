<script>
var ArrayProperty = require('./properties/ArrayProperty.vue')
var OptionsProperty = require('./properties/OptionsProperty.vue')
var TextProperty = require('./properties/TextProperty.vue')
var NumberProperty = require('./properties/NumberProperty.vue')

export default {
  functional: true,
  props: ['property', 'nested'],

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
      case 'object':
        type = ArrayProperty
        break

      case 'number':
        type = NumberProperty
    }

    ctx.data.attrs.property = ctx.props.property
    ctx.data.attrs.nested = ctx.props.nested

    return createElement(type, ctx.data)
  },
}
</script>