<template>
<div class='item' @mouseenter='hovered=true' @mouseleave='hovered=false'>
  <div class='ui image'>
    <img :style='imageStyle'>
  </div>
  <div class='middle aligned content'>
    <label class='ui small header'>{{title}}</label>
    <div class="meta">
      <span>{{subTitle}}</span>
      <div class='ui right floated' v-show='hovered'>
        <i class="play small icon"></i>
        <i class="wait small icon"></i>
        <i class="plus small icon"></i>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    'image':{type:String,required:true},
    'title':{type:String,required:true},
    'subTitle':{type:String}
  },
  data() {
    return {
      hovered: false
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
.ui.right.floated>i{
  color: darkgray;
}
.ui.right.floated>i:hover{
  color: dimgray;
}
</style>