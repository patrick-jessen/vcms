<script>
var PictureControls = require('./PictureControls.vue')

export default {
  props: ['prop', 'type'],
  functional: true,
  render(createElement, ctx) {
 
    var type = ctx.props.type
    if(!type)
      type = 'div'

    var data = ctx.data
    if(!data.on)
      data.on = {}
    
    var showActions = false
    var existingClick = data.on.click
    data.on.click = (e)=>{
      if(e.ctrlKey) {
        e.preventDefault()
        e.stopPropagation()
      }

      if(existingClick)
        existingClick()
    }

    var actions// = createElement(PictureControls)

    data.class = 'property'
    return createElement(type, data, [ctx.slots().default,actions])
  }
}
</script>

<style>
.property {
  display: inline-block;
  position: relative;
}
.property:hover {
  outline: 1px dashed gray;
}

</style>