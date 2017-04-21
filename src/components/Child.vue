
<script>
export default {
  props: ['name'],
  functional: true,

  render(createElement, context) {
    context.data.attrs.name = context.props.name

    var namespace = context.parent.namespace + '/' + context.props.name
    var store = window.vcms.utils.getStore(namespace)

    if(!store) {
      context.data.attrs.props = context.data.attrs
      return createElement('None', context.data)// Child does not exist
    } 
    var type = store.$type

    var child = createElement(type, context.data)

    return createElement('div', {
      on: {
        click: (e)=>{
          window.vcms.utils.getStore('inspector').selected = namespace
          e.stopPropagation()
        }
      }
    }, [child])
  }
}
</script>

<style>
</style>