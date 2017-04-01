import Vue from 'vue'
Vue.use(Vuex)

const search = window.utils.createStoreModule({
  type: 'Search',
  placeholder: 'Search...',
  icon: 'search'
})

const albums = window.utils.createStoreModule({
  type: 'ItemList',
  showEmpty: false
})
const artists = window.utils.createStoreModule({
  type: 'ItemList',
  showEmpty: false
})
const tracks = window.utils.createStoreModule({
  type: 'ItemList',
  showEmpty: false
})
const playlists = window.utils.createStoreModule({
  type: 'ItemList',
  showEmpty: false
})
const queue = window.utils.createStoreModule({
  type: 'ItemList',
  showEmpty: false
})
const controls = window.utils.createStoreModule({
  type: 'Controls',
  showNowPlaying: true
})

const inspector = window.utils.createStoreModule({
  selected: ''
})

const app = {
  namespaced: true,
  modules: {
    inspector,
    search,
    albums,
    artists,
    tracks,
    playlists,
    queue,
    controls
  },
}

var store = new Vuex.Store({
  modules: {
    app
  }
})

window.$store = store
export default store

