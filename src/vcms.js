window.components = {}
window.interfaces = {}

export default function plugin(Vue) {
  Vue.mixin({
    props: ['name', 'eventbus'],
    data() {
      return {
        namespace: '',
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
    methods: {
      emit(event, ...args) {
        if(this.eventbus)
          this.eventbus.$emit(event, ...args)
        else
          this.$emit(event, ...args)
      }
    }
  })

  Vue.mixin({
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    inspectClass() {
      var isSelected = this.$root.$data._store.inspector.selected === this.namespace
      return {
        'inspect' : isSelected,
        'inspect-hover': this.hovered && !isSelected
      }
    }
  },
  methods: {
    // // selects the component for inspection
    // select(e) {
    //   this.$root.$data._store.inspector.selected = this.namespace
    //   e.stopPropagation()
    //   e.preventDefault()
    // },
    hover(v) {
      this.hovered = v
    }
  }
})

}


function StoreAccessor(property) {
  return {
    get() {
      if(!this.namespace) return
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
      if(!this.namespace) return

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
  if(vm == vm.$root) return
  // 1.) Check for a store "option" on the component.
  // 2.) Check for a store "object" on the root vue model.
  if (typeof vm.$options.static !== 'undefined' && typeof vm.$root.$data._store !== 'undefined') {

    // Initialize the computed option if it hasn't already been initialized.
    if (typeof vm.$options.computed === 'undefined') {
      vm.$options.computed = {};
    }

    // Register static fields
    var name = vm.$options._componentTag
    components[name] = vm.$options.static

    // Register interface
    // Requires
    var requires = []
    var val = vm.$options.props
    for(var key in val) {
      if(val[key].required)
        requires.push(key)
    }

    // Emits
    var emits = []
    var el = vm.$options.emits
    if(el) {
      for(var i = 0; i < el.length; i++) {
        emits.push(el[i])
      }
    }
    window.interfaces[name] = {input:requires,output:emits}

    // Loop through the elements of the "static" option.
    var iter = vm.$options.static
    if(!Array.isArray(iter))
      iter = Object.keys(iter)

    iter.forEach(property => {
      if(property.name)
        vm.$options.computed[property.name] = new StoreAccessor(property.name);
      else
        vm.$options.computed[property] = new StoreAccessor(property);
    });

    // Loop through emits
    if (typeof vm.$options.methods === 'undefined') {
      vm.$options.methods = {};
    }

    var iter = vm.$options.emits
    if(iter) {
      iter.forEach(emit => {
        var capitalized = emit.replace(/^./, (str) => str.toUpperCase())
        vm.$options.methods['emit' + capitalized] = (...args) => {
          vm.eventbus.$emit(emit, ...args)
        }
      })
    }
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


////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Golang interface style
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*////////////////////////////////////////////////////////////////////////
<template>
<div>
  <input :placeholder='placeholder' @input='emitSearch($event.target.value)'>
  <i class='icon' :class='[icon, {loading:isSearching}]'></i>
</div>
</template>

export default {
  emits: ['search'],
  props: {
    'isSearching': {type:Boolean,required:true}
  },
  static: {
    'placeholder':  {type:'string',default:'Start typing...'},
    'icon':         {type:'select',default:'search',valid:['search','find']}
  }
}
////////////////////////////////////////////////////////////////////////
<template>
<div>
  <h1>{{heading}}</h1>
  <Child name='search' :isSearching='isSearching' @search='onSearch'/>
  <Child name='results' :items='items'/>
</div>
</template>

export default {
  static: {
    'heading':  {type:'string',default:'change me'},
    'search':   {type:'child',default:'SearchBar'},
    'results':  {type:'child',default:'itemList'}
  },
  data() {
    return {
      isSearching: false,
      items: []
    }
  },
  methods: {
    onSearch(query) {
      this.isSearching = true
      //...
      this.isSearching = false
    }
  }
}
///////////////////////////////////////////////////////////////
Find('')._vnode.children[0].child._vnode.children[0].children[0].children[0].children[0].children[2].children[0].data.on.click.fn
//////
el.$vnode.componentOptions.listeners
//////
el.$options._parentListeners
el.$options.propsData

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Traditional interface style
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Searcher interface //////////////////////////////////////////////////////
var Searcher = {
  props: {
    isLoading: {type:Boolean,required:true}
  },
  methods: {
    emitSearch(query) {this.$emit('search', query)}
  }
}

// Toggler interface //////////////////////////////////////////////////////
var Toggler = {
  props: {
    isToggled: {type:Boolean,required:true}
  },
  methods: {
    emitToggled() {this.$emit('toggled')}
  }
}

// Component //////////////////////////////////////////////////////////////
<template>
    <div>
      <input type=checkbox :checked='isToggled' @change='emitToggled'>
      <input placeholder='Search...' @input='emitSearch($event.target.value)'>
    </div>
</template>

var SearchBox = {
  mixins: ['Searcher', 'Toggler'],
}

// Parent /////////////////////////////////////////////////
_store: [{
  name: 'Search',
  type: 'child',
  valid: ['Searcher']
}]

////////////////////////////////////////////////////
var Searcher = {
  props: {
    isLoading: {type:Boolean,default:false}
  },
  methods: {
    emitSearch(query) {
      assertType(query, 'string')
      this.$emit('search', query)
    }
  }
}

var Itemizer = {
  props: {
    items: {type:Array,required:true}
  },
  methods: {
    emitAddItem(item) {
      this.$emit('addItem', index)
    },
    emitRemoveItem(index) {
      assertType(index, 'number')
      this.$emit('removeItem', index)
    }
  }
}
////////////////////////////////////////////////////////////////////////
// Access props not in 'props' def
this.$options._parentVnode.data.attrs

// Names of props and listeners
methods: {
  printProps() {
    return Object.keys(this.$options._parentVnode.data.attrs)
  },
  printEmits() {
    return Object.keys(this.$options._parentListeners)
  }
},*/