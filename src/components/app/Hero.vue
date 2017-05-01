<template>
<div class='hero'>
  <transition :name='animBack' mode='out-in'>
  <a class='back' :href='link' :key='image'>
      <img :src='image'>
  </a>
  </transition>

  <transition :name='animFront' mode="out-in">
    <a class='front' :href='link' :key='image'>
      <img :src='image'>
    </a>
  </transition>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      nextIndex: 1,
    }
  },
  created() {
    this.startInterval()
  },
  destroyed() {
    clearInterval(this.interval)
  },
  methods: {
    startInterval() {
      this.interval = setInterval(() => {
        this.currentIndex ++
        if(this.currentIndex == this.items.length)
          this.currentIndex = 0
      }, this.duration)
    }
  },
  computed: {
    link() {
      if(!this.items[this.currentIndex]) return ''
      return this.items[this.currentIndex].link
    },
    image() {
      if(!this.items[this.currentIndex]) return ''
      return this.items[this.currentIndex].image
    },
    animBack() {
      switch(this.transition) {
        case 'fade':
          return ''
        case 'slide':
          return 'slidein'
      }
    },
    animFront() {
      switch(this.transition) {
        case 'fade':
          return 'fade'
        case 'slide':
          return 'slide'
      }
    }
  },
  watch: {
    duration(to) {
      clearInterval(this.interval)
      this.startInterval()
    }
  },
  vcms: {
    properties: [
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
    },
    {
      title: 'Duration',
      descr: 'Duration of each slide',
      name:  'duration',
      type:  'number',
      default:5,
    },
    {
      title: 'Transition',
      descr: 'Animation to use when transitioning between slides',
      name:  'transition',
      type:  'select',
      options: ['fade', 'slide'],
      default:'fade'
    }
  ]}
}
</script>

<style scoped>
.hero {
  background-color: white;
  position: relative;
}
img {
  width: 100%;
}
a {
  display: block;
}

.back {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
}
.front {
  z-index: 10;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.slide-enter {
  opacity: 1;
  z-index: 10;
}
.slide-leave-active {
  transition: transform 1s ease;
}
.slide-leave-to {
  transform: translateX(100%);
}

.slidein-enter-active {
  transition: transform 1s ease;
}
.slidein-enter {
  transform: translateX(-50%);
}
</style>