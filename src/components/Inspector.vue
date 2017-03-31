<template>
<div class='sidebar' @click='select'>
  <h1 v-if='!selected'>Select a component</h1>
  <template v-else>
    <h1 v-if='selected'>{{selected}}</h1>

    <Property v-for='p in properties' :property='p' @change='propertyChange(p, $event)'></Property>
  </template>
</div>

</template>

<script>
var componentRef = {};
export default {
  created() {
    componentRef.ref = this
  },
  computed: window.mapState(componentRef, ['selected'], {
    properties() {
      console.log(this.selected)

      var storeModule = this.$store.state[this.selected]

      var inspectorArr = [
        {
          name: 'Placeholder',
          type: 'string',
          value: 'Search...'
        },
        {
          name: 'Icon',
          type: 'select',
          value: 'search',
          options: ['comment','search']
        },
        {
          name: 'ShowProgress',
          type: 'toggle',
          value: true,
        }
      ]

      return inspectorArr
    }
  }),

  methods: {
    select(e) {
      e.stopPropagation()
    },
    propertyChange(p, v) {
      this.$store.dispatch(this.selected + '/edit' + p.name, v)

      console.log(this.selected, p, v)
    }

  },
  components: {
    Property: require('./Property.vue')
  }
}
</script>

<style>
.sidebar {
  position: fixed;
  width: 400px;
  height: 100%;
  background-color: lightgray;
  right: 0;
  border-left: 1px solid gray;
}
</style>