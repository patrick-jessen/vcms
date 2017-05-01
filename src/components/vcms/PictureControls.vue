<template>
<div class='wrapper'>
  <div class='container'>
  <i class='large image icon'></i>
  <i class='large ellipsis horizontal icon'></i>
  </div>
</div>
</template>

<script>
export default {
  props: ['isShown'],
  computed: {
    shown() {
      return this.isShown()
    }
  }
}
</script>

<style scoped>

.wrapper {
  position: absolute;
  height: 25px;
  z-index: 100;
  
  
  top: 100%;
  right: 0;
  padding: 5px 0 0 0 !important;


  display: none;
}
.property:hover .wrapper {
  display: inline-block;
}
.container {
  height: 35px;
  border: 1px solid darkgray;
  border-radius: 10px;
  background-color: #eee;
  display: inline-block;
  padding: 5px 10px;
}
.container i {

  color: darkgray;
}
.container i:hover {
  color: gray;
}
</style>