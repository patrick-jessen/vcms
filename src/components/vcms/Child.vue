
<script>
export default {
  props: ['name', 'type'],
  functional: true,

  render(createElement, context) {
    context.data.attrs.name = context.props.name

    var type
    var namespace

    if(context.props.type === 'page') {
      var route = window.vue.$route.path

      var name = context.props.name
      namespace = context.parent.component.namespace.child(name).append('$pages', route)

      var hovered // = window.vue.$data.hoveredComponent === namespace
      if(window.vue.hoveredNamespace === namespace.string)
        hovered = true
      var hoverCls
      if(hovered) {
        hoverCls = 'hovered'
      }
      

      return createElement('router-view', {
        on: {
          click: (e)=>{
            window.vue.$root.selectedComponent = new Component(namespace)
            e.stopPropagation()
          }
        },
        attrs: {
          class: hoverCls,
          child: context.props.name // userfriendly DOM inspection
        },
        key: namespace
      })
    }
    else if(context.props.type === 'array') {
      var children = []

      namespace = context.parent.component.namespace.child(context.props.name)
      var comp = new Component(namespace)
      var store = comp.store

      var data = context.data
      if(!data.attrs) data.attrs = {}

      data.attrs.type = 'arraychild'
      for(var i = 0; i < store.length; i++) {
        data.attrs.name = context.props.name + '.' + i
        children.push(createElement('Child', data))
      }

      return createElement('div', {
        on: {
          click: (e)=>{
            window.vue.$root.selectedComponent = comp
            e.stopPropagation()
          }
        },
        attrs: {
          class: hoverCls,
          child: context.props.name // userfriendly DOM inspection
        }
      }, children)
    }
    // else if(context.props.type === 'arraychild') {
    //   namespace = context.parent.namespace + '/$children/' + context.props.name
    //   var store = window.vcms.utils.getStore(namespace)
      
    //   if(!store) {
    //     context.data.attrs.props = context.data.attrs
    //     return createElement('None', context.data)// Child does not exist
    //   } 
    //   type = store.$type
    // }
    else {
      namespace = context.parent.component.namespace.child(context.props.name)
      var store = window.vcms.utils.getStore(namespace)

      if(!store) {
        context.data.attrs.props = context.data.attrs
        return createElement('None', context.data)// Child does not exist
      } 
      type = store.$type
    }
  
    var hovered = window.vue.$data.hoveredComponent === namespace

    //new
    if(window.vue.hoveredNamespace === namespace.string)
      hovered = true

    var hoverCls
    if(hovered) {
      hoverCls = 'hovered'
    }

    var child = createElement(type, context.data)

    return createElement('div', {
      on: {
        click: (e)=>{
          window.vue.$root.selectedComponent = new Component(namespace)
          e.stopPropagation()
        }
      },
      attrs: {
        class: hoverCls,
        child: context.props.name // userfriendly DOM inspection
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