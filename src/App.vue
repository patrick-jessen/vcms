<template>
  <div id="app" @click='select'>
    <Inspector id='inspector' name='inspector'></Inspector>
    <div class='main ui container'>

      <!-- Search -->
      <Child name='search' :props='{loading:isSearching}' @change='onSearch'/>

      <!-- Search results-->
      <Child name='albums'  :props='{items:albums}'/>
      <Child name='artists' :props='{items:artists}'/>
      <Child name='tracks'  :props='{items:tracks}'/>

      <!-- Content when not searching -->
      <Child name='playlists' :props='{items:playlists}'/>
      <Child name='queue' :props='{items:queue}'/>

      <!-- Playback controls -->
      <Child name='controls'/>
    </div>
  </div>
</template>

<script>
var componentRef = {};
export default {
  _store: [
    {name: 'search',    type: 'child', options: ['Search']},
    {name: 'albums',    type: 'child', options: ['ItemList']},
    {name: 'artists',   type: 'child', options: ['ItemList']},
    {name: 'tracks',    type: 'child', options: ['ItemList']},
    {name: 'playlists', type: 'child', options: ['ItemList']},
    {name: 'queue',     type: 'child', options: ['ItemList']}
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
    child(name, props) {
      var obj = {}
      obj['data'] = this.children[name], 
      obj['props'] = props
      obj['name'] = name
      return obj 
    },

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
      this.$root.$data._store.app.inspector.selected = this.namespace
      e.stopPropagation()
    },
    
  },
  components: {
    Inspector: require('./components/Inspector.vue'),
  },
}
</script>

<style scoped>
#app {
  height: 100%;
}
.ui.container {
  margin-right: 675px !important;
  width: 300px;
  padding: 20px;
  border: 1px solid gray;
}
</style>
