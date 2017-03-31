import Vue from 'vue'
Vue.use(Vuex)

const search = {
  namespaced: true,
  state: {
    type: 'Search',
    placeholder: 'Search...',
    icon: 'search'
  },
  mutations: {
    editPlaceholder(state, arg) {
      state.placeholder = arg
    },
    editIcon(state, arg) {
      state.icon = arg
    }
  },
  actions: {
    placeholder({commit}, arg) {
      commit('editPlaceholder', arg)
    },
    icon({commit}, arg) {
      commit('editIcon', arg)
    }
  }
}

const itemList = {
  namespaced: true,
  state: {
    type: 'ItemList',
    showEmpty: false
  },
  mutations: {
    editShowEmpty(state, arg) {
      state.showEmpty = arg
    }
  },
  actions: {
    showEmpty({commit}, arg) {
      commit('editShowEmpty', arg)
    }
  }
}

const inspector = {
  namespaced: true,
  state: {
    selected: ''
  },
  mutations: {
    select(state, arg) {
      state.selected = arg
    }
  },
  actions: {
    select({commit}, arg) {
      commit('select', arg)
    }
  },
}

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

