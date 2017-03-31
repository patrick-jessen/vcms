<template>
  <div id="app" @click='select'>
    <Inspector name='inspector'></Inspector>
    <div class='main ui container'>
      <Search name='search' @change='onSearch' :loading='isSearching'></Search>
      <template v-if='searchQuery.length > 0'>
        <ItemList name='albums' title='Albums' :items='albums'></ItemList>
        <ItemList name='artists' title='Artists' :items='artists'></ItemList>
        <ItemList name='tracks' title='Tracks' :items='tracks'></ItemList>
      </template>
      <ItemList name='playlists' v-else title='Playlists' :items='playlists'></ItemList>
      <ItemList name='queue' title='Queue' :items='queue'></ItemList>
    </div>
  </div>
</template>

<script>
var componentRef = {};
export default {
  data () {
    return {
      isSearching : false,
      albums: [],
      artists: [],
      tracks: [],
      playlists: [
        {image: '', title: 'Party', subTitle: '22 tracks'},
        {image: '', title: 'Chill mix', subTitle: '13 tracks'},
        {image: '', title: 'Meditational', subTitle: '5 tracks'}
      ],
      queue: [
        {image: '', title: 'Some song', subTitle: 'Some artist'},
        {image: '', title: 'Some song', subTitle: 'Some artist'},
        {image: '', title: 'Some song', subTitle: 'Some artist'},
      ],
      searchQuery: '',
      namespace: 'app'
    }
  },
  created() {
    this.namespace = 'app'
    componentRef.ref = this
  },
  methods: {

    onSearch(q) {
      this.searchQuery = q
      if(q) {
        this.isSearching = true
        this.searchFunc(q)
      }
      else
        this.isSearching = false
    },
    
    searchFunc: window.utils.createThrottle((q) => {
      if(!q)
        return

      let self = componentRef.ref
      var req = window.spotify.search(q, ['album','artist','track'], {limit:3})

      req.then((r) => {
        self.isSearching = false
        self.$set(self, 'albums', [])
        self.$set(self, 'artists', [])
        self.$set(self, 'tracks', [])

        // albums
        var albums = r.albums.items
        for(var i = 0; i < albums.length; i++) {
          var album = albums[i]

          // name of album
          var name = album.name

          // artist of album
          var artist = ''
          if(album.artists[0])
            artist = album.artists[0].name

          // image of album
          var image = ''
          if(album.images[0]) 
            image = album.images[0].url

          self.albums.push({
            image: image,
            title: name,
            subTitle: artist
          })
        }

        // artists
        var artists = r.artists.items
        for(var i = 0; i < artists.length; i++) {
          var artist = artists[i]

          // name of artist
          var name = artist.name

          // image of artist
          var image = ''
          if(artist.images[0]) 
            image = artist.images[0].url

          self.artists.push({
            image: image,
            title: name,
          })
        }

        // tracks
        var tracks = r.tracks.items
        for(var i = 0; i < tracks.length; i++) {
          var track = tracks[i]

          // name of track
          var name = track.name

          // name of artist
          var artist = ''
          if(track.artists[0])
            artist = track.artists[0].name

          // image of album
          var image = ''
          if(track.album.images[0])
            image = track.album.images[0].url

          self.tracks.push({
            image: image,
            title: name,
            subTitle: artist
          })
        }
      }).catch((e) => {
        console.error(e)
      })

    }, 2000),

    select(e) {
      window.$store.commit('app/inspector/selected', this.namespace)
      e.stopPropagation()
    },
    
  },
  components: {
    Search: require('./components/Search.vue'),
    Inspector: require('./components/Inspector.vue'),
    ItemList: require('./components/ItemList.vue')
  },
}
</script>

<style scoped>
#app {
  height: 100%;
}
.ui.container {
  width: 300px;
  padding: 20px;
  border: 1px solid gray;
}
</style>
