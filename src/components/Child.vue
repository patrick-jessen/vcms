
<script>
export default {
  props: ['name'],
  functional: true,

  render(createElement, context) {

    var namespace = context.parent.namespace + '/' + context.props.name
    var store = window.utils.getStore(namespace)
    if(!store) return // Child does not exist
    var type = store.$type

    context.data.attrs.name = context.props.name

    var child = createElement(type, context.data)


    return createElement('div', {
      on: {
        click: (e)=>{
          window.utils.getStore('inspector').selected = namespace
          e.stopPropagation()
        }
      }
    }, [child])
  }
}
</script>
