<template>
<a class='wrapper' href='#'>
  <h3>Lemur <span class='display-size'>14"</span></h3>
  <h4 class='price'>$699<span class='note'>NEW MODEL</span></h4>
  <h5 class='price-finance'>starting at $62/month</h5>
  <img class='image' src='https://d1vhcvzji58n1j.cloudfront.net/assets/products/lemu7/thumb-91f3e173bd.png'>

  <div v-for='m in meters'>
    <div class='progress'>
      <span class='meter' :style='"width:" + m.value + "%;"'></span>
    </div>
    <h5>{{m.name}}</h5>
  </div>

</a>
</template>

<script>
export default {
  data() {
    return {
      meters: [
        {name:'PORTABILITY', value: 80},
        {name:'STORAGE', value: 80},
        {name:'GRAPHICS PERFORMANCE', value: 80},
        {name:'CPU PERFORMANCE', value: 80}
      ]
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 5px;
  margin: 10px;
  display: inline-block;
  width: 250px;
}
h3 {
  font-family: serif;
  color: #574e4a;
  margin: 0;
}
.display-size {
  font-size: 1.375rem;
  font-family: sans-serif;
  font-weight: 300;
  color: #8d817a;
}
.price {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 700;
  color: #574e4a;
}
.note {
  margin-left: 20px;
  font-size: 1.0rem;
  vertical-align: top;
  color: #f15d22;
}
.price-finance {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 100;
  font-style: italic;
  color: #574e4a;
}
.image {
  margin-top: -30px;
  width: 100%;
}
.progress {
  height: 10px;
  background-color: rgb(246, 246, 246);
  position: relative;
}
.meter {
  display: inline-block;
  height: 10px;
  background-color: rgb(250, 164, 26);
  position: absolute;
}
h5 {
  font-size: 0.8rem;
  font-weight: 100;
  font-family: sans-serif;
  color: #574e4a;
  margin: 0 0 10px 0;
}
</style>