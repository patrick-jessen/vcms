<template>
  <div id="app" @click='select'>
    <div class='main ui container'>

      <!-- Search -->
      <Child name='search' :isSearching='isSearching' @search='onSearch'/>

      <!-- Search results-->
      <Child name='albums'  :items='albums'/>
      <Child name='artists' :items='artists'/>
      <Child name='tracks'  :items='tracks'/>

      <!-- Content when not searching -->
      <Child name='playlists' :items='playlists'/>
      <Child name='queue'     :items='queue'/>

      <!-- Playback controls -->
      <Child name='controls'/>
    </div>
  </div>
</template>

<script>
var Spotify = require('spotify-web-api-js');
window.spotify = new Spotify();


var componentRef = {};
export default {
  children: [
    {name: 'search',    type: 'child'},
    {name: 'albums',    type: 'child'},
    {name: 'artists',   type: 'child'},
    {name: 'tracks',    type: 'child'},
    {name: 'playlists', type: 'child'},
    {name: 'queue',     type: 'child'},
    {name: 'controls',  type: 'child'},
  ],
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
      else {
        this.isSearching = false
        this.$set(this, 'albums', [])
        this.$set(this, 'artists', [])
        this.$set(this, 'tracks', [])
      }
    },
    
    searchFunc: window.vcms.utils.createThrottle((q) => {
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
      this.$root.$data._store.inspector.selected = this.namespace
      e.stopPropagation()
      e.preventDefault()
    },
  },
  components: {
    Inspector: require('./inspector/Inspector.vue'),
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
