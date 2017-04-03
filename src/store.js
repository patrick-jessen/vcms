export default {
  app: {
    inspector: {selected: ''},
    search: {
      type: 'Search',
      placeholder: 'Search...',
      icon: 'search'
    },
    albums: {
      type: 'ItemList',
      showEmpty: false
    },
    artists: {
      type: 'ItemList',
      showEmpty: false
    },
    tracks: {
      type: 'ItemList',
      showEmpty: false
    },
    playlists: {
      type: 'ItemList',
      showEmpty: false
    },
    queue: {
      type: 'ItemList',
      showEmpty: false
    },
    controls: {
      type: 'Controls',
      showNowPlaying: true
    },

    children: [
      {
        type: 'Search',
        placeholder: 'WOW',
        icon: 'comment'
      },
      {
        type: 'Search',
        placeholder: 'OWO',
        icon: 'facebook'
      },
      {
        type: 'ItemList',
        showEmpty: false,
        title: 'Playlists',
        items: [{image:'',title:'damn'}]
      },
    ]
  }
}