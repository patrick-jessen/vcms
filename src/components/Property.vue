<script>
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
    
    var existingClick = data.on.click
    data.on.click = (e)=>{
      if(e.ctrlKey) {
        e.preventDefault()
        e.stopPropagation()
      }

      if(existingClick)
        existingClick()
    }

    
    data.class = {'property' : window.vue.$data.ctrl}
    return createElement(type, data, [ctx.slots().default])
  }
}
</script>

<style>
.property {
  display: inline-block;
  background-color: #eee;
}
.property:hover {
  outline: 1px dashed gray;
}
</style>