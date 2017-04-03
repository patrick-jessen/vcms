export default function plugin(Vue) {
  Vue.mixin({
    props: {
      name: {type: String}
    },
    data() {
      return {
        namespace: ''
      }
    },
    beforeCreate() {
      registerStore(this)
    },
    created() {
      if(this.$parent)
        this.namespace = this.$parent.namespace + '/' + this.name
      else
        this.namespace = this.name
    },
  })
}

function StoreAccessor(property) {
  return {
    get() {
      var path = this.namespace.split('/') 
      var store = this.$root.$data._store;

      for (var i = 0; i < path.length; i++) {
        if (store.hasOwnProperty(path[i])) {
          store = store[path[i]];
        }
      }

      return store[property]
    },

    set(value) {
      var path = this.namespace.split('/') 
      var length = path.length;
      var store = this.$root.$data._store;

      for (var i = 0; i < path.length; i++) {
        if (store.hasOwnProperty(path[i])) {
          store = store[path[i]];
        }
      }

      store[property] = value;
    }
  }
}

function registerStore(vm) {
  // 1.) Check for a store "option" on the component.
  // 2.) Check for a store "object" on the root vue model.
  if (typeof vm.$options._store !== 'undefined' && typeof vm.$root.$data._store !== 'undefined') {

    // Initialize the computed option if it hasn't already been initialized.
    if (typeof vm.$options.computed === 'undefined') {
      vm.$options.computed = {};
    }

    var name = vm.$options._componentTag
    window.utils.createTemplate(name, vm.$options._store)

    // Loop through the elements of the "store" option.
    vm.$options._store.forEach(property => {
        vm.$options.computed[property.name] = new StoreAccessor(property.name);
    });
  }
}

//export default plugin;


/*<template>
  <div>
    <h1>{{title}}</h1>
    <h2>{{subTitle}}</h2>
  
    <!-- Upper part -->
    <Component v-bind='child.u1'></Component>
    <Component v-bind='child.u2'></Component>
    <Component v-bind='child.u3'></Component>

    <!-- Lower part -->
    <Component v-bind='child.l1'></Component>
    <Component v-bind='child.l2'></Component>
    <Component v-bind='child.l3'></Component>
  </div>
</template>

<script>
export default {
  
  propDefs {
    title: {
      type: 'string',
      default: '<change me>'
    },
    subTitle: {
      type: 'string',
      default: ''
    }
  },
  childDefs {
    u1: ['CoolWidget', 'NiceWidget'],
    u2: ['CoolWidget', 'NiceWidget'],
    u3: ['CoolWidget', 'NiceWidget'],
    l1: ['FooterWidget'],
    l2: ['FooterWidget'],
    l3: ['FooterWidget'],
  }
}
</script>

//////////////////////////////////////////////////

{
  title: 'My title',
  subTitle: 'How cool',
  $children: {
    u1: {
      $name: 'Upper widget 1',
      $type: 'CoolWidget',
      $children: {},
      heading: 'woah',
      content: 'cars',
      ...  
    },
    u2: {
      ...
    },
    ...
  }
}

////////////////////////////////////////////////
     
function defineComponent(name) {
  window.componentDefs[name] = require('./components/' + name + '.vue')
}
  
/////////////////////////////////////////////////
      
function createComponent(name) {
  var propDefs = window.componentDefs[name].propDefs
  var obj = {}
  
  for(var key in propDefs) {
    if(!propDefs.hasOwnProperty(key))
      continue
      
    obj[key] = propDefs[key].default
  }
  
  return obj
}*/