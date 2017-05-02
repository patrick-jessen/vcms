<template>
<div class='vcms inspector'>
  <div class='drag'></div>
  <div class='container'>

    <div class='ui dividing header'>Inspector</div>

    <div class='ui top attached tabular menu'>
      <a class='item' :class='activeTab("components")' data-tab='components' @click='showTab("components")'>Components</a>
      <a class='item' :class='activeTab("pages")' data-tab='pages' @click='showTab("pages")'>Pages</a>
      <a class='item' :class='activeTab("assets")' data-tab='assets' @click='showTab("assets")'>Assets</a>
    </div>
    <div class='ui bottom attached tab segment' :class='activeTab("components")' data-tab='components'>
      <Hierarchy/>
    </div>
    <div class='ui bottom attached tab segment' :class='activeTab("pages")' data-tab='pages'>
      <Routes/>
    </div>
    <div class='ui bottom attached tab segment' :class='activeTab("assets")' data-tab='assets'>
    </div>

    <div class='ui dividing header'>Properties</div>
    <PropertyTable :properties='properties'/>

    <button class='ui basic button' @click='performSave'>
      <i class='icon save'></i>
      Save
    </button>

  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'components'
    }
  },
  created() {
    this.namespace = 'inspector'
  },
  computed: {
    selected() {
      return this.$root.selectedComponent
    },
    properties() {
      if(!this.selected) 
        return []

      // app is imutable
      if(this.selected.namespace.string === 'app') 
        return []

      if(this.selected.isArray)
        return []

      // // get interface of child
      // var iface = window.vcms.utils.getInterface(this.selected)
      // var matchingTypes = ['None']

      // for(var key in window.vcms.components) {
      //   if(!window.vcms.components.hasOwnProperty(key)) continue

      //   var comp = window.vcms.components[key]
      //   var valid = true

      //   // check inputs
      //   for(var i = 0; i < comp.input.length; i++) {
      //     if(iface.input.indexOf(comp.input[i]) < 0) {
      //       valid = false
      //       break
      //     }
      //   }
      //   if(!valid) continue

      //   // check outputs
      //   for(var i = 0; i < iface.output.length; i++) {
      //     if(comp.output.indexOf(iface.output[i]) < 0) {
      //       valid = false
      //       break
      //     }
      //   }

      //   if(valid)
      //     matchingTypes.push(key)
      // }
      var matchingTypes = []
      var store = this.selected.store

      if(!store) {
        return [{
          name: '$type',
          type: 'select',
          options: matchingTypes,
          value: 'None',
          title: 'Component type',
          descr: 'Type of component'
        }]
      }

      var inspectorArr = [{
          name: '$type',
          type: 'select',
          options: matchingTypes,
          value: store.$type,
          title: 'Component type',
          descr: 'Type of component'
        }]

      var compDef = this.selected.def.static
      if(compDef) {   
        Object.keys(compDef).forEach(property => {
          var obj = Object.assign({}, compDef[property])
          var name = compDef[property].name
          obj.value = store.$props[name]
          obj.store = store
          inspectorArr.push(obj)
        })
      }

      //return inspectorArr
      return this.selected.properties
    }
  },
  components: {
    Hierarchy: require('./Hierarchy.vue'),
    PropertyTable: require('./PropertyTable.vue'),
    Routes: require('./Routes.vue')
  },
  methods: {
    showTab(name) {
      this.currentTab = name
    },
    activeTab(name) {
      if(name === this.currentTab)
        return 'active'
    },
    performSave() {
      var http = new XMLHttpRequest();
      var url ='http://localhost:1337/'
      var params = 'store=' + JSON.stringify(window.vcms.utils.getStore(''))
      http.open('POST', url, true);
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.send(params)
    }
  }
}
</script>

<style lang='scss'>
.vcms {
  &.inspector {
    background-color: #fafafa;
    border-left: 1px solid gray;
    vertical-align: top;
    height: 100%;
    display: inline-block;
  }
}

.inspector.hidden {
  display: none !important;
}
.container {
  padding: 20px;
  display: inline-block;

}
.drag {
  display: inline-block;
  width: 2px;
  height: 100%;
  background-color: gray;
  cursor: ew-resize;
}
</style>