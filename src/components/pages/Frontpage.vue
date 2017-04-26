<template>
<div>
  <div class='video'>
    <video autoplay="autoplay">
      <source src='https://d1vhcvzji58n1j.cloudfront.net/assets/home/hero-749e29ffaf.mp4' type="video/mp4">
    </video>
  </div>
</div>
</template>

<script>
export default {
  beforeCreate() {
    this.page = true
  }
}
</script>

<style>
.video {
  margin-top: -96px;
  z-index: -1;
  height: 600px;
  position: relative;
}
.video>video {
  width: 100%;
  z-index: -1;
  position: absolute;
}
</style>