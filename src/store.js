export default {
  app: {
    inspector: {selected: ''},
    children: {
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
        title: 'Queue',
        showNowPlaying: true
      },
      albums: {
        $type: 'ItemList',
        showEmpty: false
      },
      artists: {
        $type: 'ItemList',
        showEmpty: false
      },
      tracks: {
        $type: 'ItemList',
        showEmpty: false
      },
    }
  }
}