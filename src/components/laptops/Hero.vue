<template>
<div class='hero'>
  <a :href='link'>
  <img :src='image'>
  </a>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.currentIndex ++
      if(this.currentIndex == this.items.length)
        this.currentIndex = 0
    }, 5000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
  computed: {
    link() {
      if(!this.items[this.currentIndex]) return ''
      return this.items[this.currentIndex].link
    },
    image() {
      if(!this.items[this.currentIndex]) return ''
      return this.items[this.currentIndex].image
    }
  },
  static: [
    {
      title:'Items',
      descr:'Items to show as slideshow',
      name: 'items',
      type: 'array',
      props:[
        {
          title:'Image',
          descr:'Image to show',
          name: 'image',
          type: 'string.url'
        },
        {
          title:'Link',
          descr:'Link when clicking image',
          name: 'link',
          type: 'string.url',
        }
      ],
      default: [
        {
          image:'default.png',
          link: '#'
        }
      ],
      defaultItem: {
        image:'default.png',
        link: '#'
      },
      render: (items) => {
        var str = ''
        for(var i = 0; i < items.length; i++)
          str += `<img src='` + items[i].image + `'><i style='display:inline-block;width:10px'></i>`
        return str
      }
    }
  ]
}
</script>

<style scoped>
.hero {
  height: 400px;
  background-color: white;
}
img {
  width: 100%;
}
a {
  display: block;
}
</style>