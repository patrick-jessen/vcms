<template>
<div class='ui container' @click='select'>
  <div class='ui items' v-if='showNowPlaying'>
    <div class='ui dividing heading'>Now playing</div>
    <Item name='nowPlaying' v-bind='nowPlaying'></Item>
  </div>
  <i class='icon step backward'></i>
  <i class='icon play'></i>
  <i class='icon step forward'></i>
</div>
</template>

<script>
export default {
  data() {
    return {
      nowPlaying: {
        image: '',
        title: 'Some track',
        subTitle: 'Some artist',
      }
    }
  },
  computed: window.utils.mapState([
    'showNowPlaying'
  ]),
  components: {
    Item: require('./Item.vue')
  }
}

window.utils.createTemplate('Controls', [
  {
    name: 'showNowPlaying',
    type: 'toggle',
  }
])
</script>