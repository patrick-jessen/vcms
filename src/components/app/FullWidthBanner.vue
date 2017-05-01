<template>
<div class='banner'>
  <img class='background' :src='image'>
  <div class='overlay'>
    <div v-for='(o, i) in overlay'>
      <img :style='"z-index:" + i + "; width:" + o.width + "%"' :src='o.image'>
    </div>
  </div>
  <router-link :to='button.link'>{{button.text}}</router-link>
</div>
</template>

<script>
export default {
  vcms: {
  properties: [
    {
      title: 'Image',
      name: 'image',
      type: 'string.url',
    },
    {
      title: 'Overlay images',
      name: 'overlay',
      type: 'array',
      props: [
        {
          title:'Image',
          descr:'',
          name:'image', type: 'string.url'
        },
        {
          title:'Width (%)',
          descr:'',
          name:'width',
          type:'string'
        }
      ],
      defaultItem: {image:'default.png', width: '100'}
    },
    {
      title: 'Button',
      name: 'button',
      type: 'object',
      props: [
        {
          title: 'Text',
          name: 'text',
          type: 'string'
        },
        {
          title: 'Link',
          name: 'link',
          type: 'string.url'
        }
      ]
    }
  ]},
  methods: {
  }
}
</script>

<style scoped>
.banner {
  height: 30rem;
  width: 100%;
  background-color: green;
  border-top: 1px solid white;
  position: relative;
  overflow: hidden;
}
.background {
  width: 100%;
  position: absolute;
  display: inline-block;
}
.overlay {
  width: 100%;
  text-align: center;
  position: absolute;
  height: 100%;
}
.overlay > div {
  /*max-width: 40%;
  max-height: 70%;*/
  margin: auto;
  display: inline-block;
}
.overlay img {
  max-width: 100%;
  max-height: 100%;
  /*width: auto;*/
}
</style>