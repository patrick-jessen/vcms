<template>
  <div id="app" @click='select'>
    <Inspector></Inspector>
    <Search @change='onSearch' :loading='isSearching'></Search>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSearching : false
    }
  },
  created: function() {
    this.searchDB = createDebounce(this.triggerSearch.bind(this), 1000)
  },
  methods: {

    onSearch(e) {
      this.isSearching = true;
      this.searchDB()
        .then(() => {
          this.isSearching = false;
        })
        .catch((err) => {
          if(err.cancel)
            console.log('Canceled')
        })
    },

    triggerSearch() {
      console.log('SEARCH')
    },

    select(e) {
      this.$store.dispatch('select', this.namespace)
      e.stopPropagation()
    }

  },
  components: {
    Search: require('./components/Search.vue'),
    Inspector: require('./components/Inspector.vue')
  },
}



function createDebounce(f, ms) {
  var promise;

  return function() {
    let thisPromise = promise = new Promise((res, rej) => {
      setTimeout(() => {
        if(thisPromise === promise) {
          f()
          res()
        }
        else
          rej({cancel:true})
      }, ms)
    })

    return promise
  }
}

</script>
<style>
#app {
  height: 100%;
}
</style>
