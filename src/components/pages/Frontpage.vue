<template>
<div>
  <div class='video'>
    <video autoplay="autoplay" muted='muted' loop='loop' :poster='video.poster'>
      <source :src='video.videofile' type="video/mp4">
    </video>
    <div class='text'>
      <h1>{{heading}}</h1>
      <h2>{{subheading}}</h2>
    </div>
  </div>
  <Child name='content'/>
</div>
</template>

<script>
export default {
  vcms:{
  properties: [
    {
      title: 'Video',
      name: 'video',
      type: 'object',
      props:[
        {
          title: 'Video',
          name: 'videofile',
          type: 'string.url'
        },
        {
          title: 'Poster',
          name: 'poster',
          type: 'string.url'
        }
      ],
      render: (item) => {
        return ''
      }

    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Subheading',
      name: 'subheading',
      type: 'string'
    }
  ],
  children: [
    {name: 'content'}
  ]},
  beforeCreate() {
    this.type = 'page'
  }
}
</script>

<style scoped>
.video {
  margin-top: -98px;
  z-index: -1;
  height: 600px;
  position: relative;
}
.video>video {
  width: 100%;
  z-index: -1;
  position: absolute;
}
.text {
  max-width: 600px;
  margin: auto;
  padding-top: 250px;
  text-align: center;
  color: white;
  text-shadow: 0 0 10px #222;
}
.text>h1 {
  font-family: serif;
  font-size: 3.2rem;
}
.text>h2 {
  font-family: serif;
  font-size: 3rem;
  font-weight: 100;
}
</style>