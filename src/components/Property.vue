<script>
export default {
  props: ['prop', 'type'],
  functional: true,
  render(createElement, ctx) {
  
    var type = ctx.props.type
    if(!type)
      type = 'div'

    var data = ctx.data
    if(!data.staticClass)
      data.staticClass = 'property'
    else
      data.staticClass += ' property'

    return createElement(type, data, [ctx.slots().default])
  }
}
</script>

<style>
.property {
  display: inline-block;
}
.property:hover {
  background-color: lightgray;
}
</style>