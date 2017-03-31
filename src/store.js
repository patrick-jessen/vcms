import Vue from 'vue'
Vue.use(Vuex)

const search = window.utils.createStoreModule({
  type: 'Search',
  placeholder: 'Search...',
  icon: 'search'
})

const itemList = window.utils.createStoreModule({
  type: 'ItemList',
  showEmpty: false
})

const inspector = window.utils.createStoreModule({
  selected: ''
})

const app = {
  namespaced: true,
  modules: {
    itemList,
    search,
    inspector
  },
}

var store = new Vuex.Store({
  modules: {
    app
  }
})

window.$store = store
export default store

