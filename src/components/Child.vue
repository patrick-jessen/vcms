
<script>
export default {
  props: ['name', 'type'],
  functional: true,

  render(createElement, context) {
    context.data.attrs.name = context.props.name
    var type
    var namespace

    if(context.props.type === 'page') {
      var route = window.vue.$route.path.replace('/', '')
      if(route === '')
        route = 'default'

      namespace = context.parent.namespace + '/$pages/' + route
      return createElement('router-view', {
        on: {
          click: (e)=>{
            window.vcms.utils.getStore('inspector').selected = namespace
            e.stopPropagation()
          }
        }
      })
    }
    else {
      namespace = context.parent.namespace + '/$children/' + context.props.name
      var store = window.vcms.utils.getStore(namespace)

      if(!store) {
        context.data.attrs.props = context.data.attrs
        return createElement('None', context.data)// Child does not exist
      } 
      type = store.$type
    }
  
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