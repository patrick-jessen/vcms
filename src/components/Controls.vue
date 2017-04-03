<template>
<div  
  @click='select'
  @mouseenter='hover(true)'
  @mouseleave='hover(false)'
  :class='inspectClass'>

<div class='ui container' @click='select'>
  <div class='ui items' v-if='showNowPlaying'>
    <div class='ui dividing heading'>Now playing</div>
    <Item name='nowPlaying' v-bind='nowPlaying'></Item>
  </div>
  <i class='icon step backward'></i>
  <i class='icon play'></i>
  <i class='icon step forward'></i>
</div>
</div>
</template>

<script>
export default {
  _store: [{
    name: 'showNowPlaying',
    type: 'toggle',
  }],
  data() {
    return {
      nowPlaying: {
        image: '',
        title: 'Some track',
        subTitle: 'Some artist',
      }
    }
  },
  components: {
    Item: require('./Item.vue')
  }
}
</script>