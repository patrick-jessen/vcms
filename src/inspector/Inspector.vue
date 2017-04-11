<template>
<div class='ui five wide column'>
  <div class='main ui container'>
  <div class='ui dividing large header'>Hierarchy</div>
  <Hierarchy/>

  <div class='ui dividing large header'>Properties</div>
  <Property v-for='(p, idx) in properties' :property='p' @change='propertyChange(p, $event)' :key='p'></Property>

  </div>
</div>

</template>

<script>
export default {
  static: [{name:'selected'}],
  created() {
    this.namespace = 'inspector'
  },
  computed: {
    properties() {
      // app is imutable
      if(this.selected === 'app') 
        return []

      // get interface of child
      var iface = window.vcms.utils.getInterface(this.selected)
      console.error('Limit list based on interface')

      var store = window.vcms.utils.getStore(this.selected)
      if(!store) {
        return [{
          name: '$type',
          type: 'select',
          options: window.componentNames,
          value: 'None'
        }]
      }

      var inspectorArr = [{
          name: '$type',
          type: 'select',
          options: window.componentNames,
          value: store.$type
        }]

      var compDef = window.vcms.components[store.$type].static
      if(compDef) {   
        Object.keys(compDef).forEach(property => {
          var obj = Object.assign({}, compDef[property])
          var name = compDef[property].name
          obj.value = store[name]
          inspectorArr.push(obj)
        })
      }

      return inspectorArr
    }
  },

  methods: {
    propertyChange(p, v) {
      var store = window.vcms.utils.getStore(this.selected)

      if(p.name === '$type') {
        if(!store) {
          var name = this.selected.split('/').slice(-1)[0]
          var parent = this.selected.split('/').slice(0, -1).join('/')
          var type = v

          var obj = {
            $type: type
          }

          // copy defaults
          var compDef = window.vcms.components[type]
          if(compDef.static) {
            compDef.static.forEach((s) => {
              obj[s.name] = s.default
            })
          }

          this.$set(window.vcms.utils.getStore(parent).$children, name, obj)
        }
        else {
          store.$type = v

          // copy defaults (if value does not already exist)
          var compDef = window.vcms.components[v]
          if(compDef.static) {
            compDef.static.forEach((s) => {
              if(!store[s.name])
                this.$set(store, s.name, s.default)
            })
          }
        }
      }
      else {
        this.$set(store, p.name, v)
      }
    }

  },
  components: {
    Property: require('./Property.vue'),
    Hierarchy: require('./Hierarchy.vue')
  },
}
</script>

<style scoped>
.ui.five.wide.column {
  background-color: #eeeeee;
  border-left: 1px solid gray;
}
.main.ui.container {
  width: 80%;
  margin-top: 20px
}
</style>