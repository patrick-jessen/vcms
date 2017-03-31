<template>
<div class='sidebar' @click='select'>
  <h1 v-if='!selected'>Select a component</h1>
  <template v-else>
    <h1 v-if='selected'>{{selected}}</h1>

    <Property v-for='p in properties' :property='p'></Property>
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
          name: 'placeholder',
          type: 'string',
          value: 'Search...'
        },
        {
          name: 'icon',
          type: 'select',
          value: 'search',
          options: ['comment','search']
        },
        {
          name: 'showProgress',
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