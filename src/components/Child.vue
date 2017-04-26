
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

      var hovered = window.vue.$data.hoveredComponent === namespace
      var hoverCls
      if(hovered) {
        hoverCls = 'hovered'
      }

      return createElement('router-view', {
        on: {
          click: (e)=>{
            window.vcms.utils.getStore('inspector').selected = namespace
            e.stopPropagation()
          }
        },
        attrs: {
          class: hoverCls
        },
        key: namespace
      })
    }
    else if(context.props.type === 'array') {
      var children = []

      namespace = context.parent.namespace + '/$children/' + context.props.name
      var store = window.vcms.utils.getStore(namespace)

      var data = context.data
      if(!data.attrs) data.attrs = {}

      data.attrs.type = 'arraychild'
      for(var i = 0; i < store.length; i++) {
        data.attrs.name = context.props.name + '/' + i
        children.push(createElement('Child', data))
      }

      return createElement('div', {
        on: {
          click: (e)=>{
            window.vcms.utils.getStore('inspector').selected = namespace
            e.stopPropagation()
          }
        },
        attrs: {
          class: hoverCls
        }
      }, children)
    }
    else if(context.props.type === 'arraychild') {
      namespace = context.parent.namespace + '/$children/' + context.props.name
      var store = window.vcms.utils.getStore(namespace)
      
      if(!store) {
        context.data.attrs.props = context.data.attrs
        return createElement('None', context.data)// Child does not exist
      } 
      type = store.$type
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
  
    var hovered = window.vue.$data.hoveredComponent === namespace
    var hoverCls
    if(hovered) {
      hoverCls = 'hovered'
    }

    var child = createElement(type, context.data)

    return createElement('div', {
      on: {
        click: (e)=>{
          window.vcms.utils.getStore('inspector').selected = namespace
          e.stopPropagation()
        }
      },
      attrs: {
        class: hoverCls
      }
    }, [child])
  }
}
</script>

<style>
.hovered {
  position: relative;
}
.hovered:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: lightblue;
  opacity: 0.4;
}
</style>