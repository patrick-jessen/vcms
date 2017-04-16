<template>
<table class='ui striped table'>
  <tr v-for='p in properties' :title='p.descr'>
    <td>{{p.title}}</td>
    <!--<td>{{p.value}}</td>-->
    <td><Property :property='p' @change='propertyChange(p,$event)'/></td>
  </tr>
</table>
</template>

<script>
export default {
  props: ['properties'],
  methods: {
    propertyChange(p, v) {
      var selected = this.$parent.selected
      var store = window.vcms.utils.getStore(selected)

      if(p.name === '$type') {
        if(!store) {
          var name = selected.split('/').slice(-1)[0]
          var parent = selected.split('/').slice(0, -1).join('/')
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

          var parentStore = window.vcms.utils.getStore(parent)
          if(!parentStore.$children)
            this.$set(parentStore, '$children', {})

          this.$set(parentStore.$children, name, obj)
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
  }
}
</script>