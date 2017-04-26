<template>
<div class='banner'>
  <img :src='image'>
  <div v-for='o in overlay'>
    <img :src='o.image'>
  </div>
  <router-link :to='button.link'>{{button.text}}</router-link>
</div>
</template>

<script>
export default {
  static: [
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
          name:'image', type: 'string.url'}
      ],
      defaultItem: {image:''}
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
  ],
  methods: {
  }
}
</script>

<style scoped>
.banner {
  height: 200px;
  width: 100%;
  background-color: green;
  border: 1px solid white;
}
</style>