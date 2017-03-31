<template>
<div class='item'>
  <div class='ui image'>
    <img :style='imageStyle'>
  </div>
  <div class='middle aligned content'>
    <label class='ui small header'>{{title}}</label>
    <div class="meta">
      <span>{{subTitle}}</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String
    }
  },
  computed: {
    imageStyle() {
      return {'background-image':'url('+this.image+')'}
    }
  }
}
</script>

<style scoped>
.item:hover {
  background-color: #f5f5f5;
}
.item>.ui.image>img {
  height: 50px;
  width: 50px;
  background-size: cover;
}
.ui.items>.item {
  margin-bottom: 0.2em;
  margin-top: 0.2em;
}
.ui.items>.item>.ui.image+.content {
  padding-left: 1em;
}
</style>