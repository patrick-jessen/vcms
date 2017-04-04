export default {
  app: {
    inspector: {selected: ''},
    search: {
      $type: 'Search',
      placeholder: 'Search...',
      icon: 'search'
    },
    playlists: {
      $type: 'ItemList',
      title: 'Playlists',
      showEmpty: false,
    },
    queue: {
      $type: 'ItemList',
      title: 'Queue',
      showEmpty: false,
    },
    controls: {
      $type: 'Controls',
      showNowPlaying: true
    },
    albums: {
      $type: 'ItemList',
      title: 'Albums',
      showEmpty: false
    },
    artists: {
      $type: 'ItemList',
      title: 'Artists',
      showEmpty: false
    },
    tracks: {
      $type: 'ItemList',
      title: 'Tracks',
      showEmpty: false
    },
  }
}