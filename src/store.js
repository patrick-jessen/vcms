export default {
  inspector: {selected: ''},
  app: {
    $type: 'App',
    $children: {
      // search: {
      //   $type: 'Search',
      //   placeholder: 'Search...',
      //   icon: 'search',
      //   $children: {
      //     someChild: {$type: 'Search'}
      //   }
      // },
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
}