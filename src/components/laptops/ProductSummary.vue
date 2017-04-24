<template>
<a class='wrapper' :href='laptop.link'>
  <h3>{{laptop.name}} <span class='display-size'>{{laptop.displaySize}}</span></h3>
  <h4 class='price'>{{laptop.price}}<span class='note'>{{laptop.note}}</span></h4>
  <h5 class='price-finance'>starting at {{laptop.finance}}/month</h5>
  <img class='image' :src='laptop.smallImage'>

  <div v-for='(m, i) in laptop.meters'>
    <div class='progress'>
      <span class='meter' :style='"width:" + m + "%;"'></span>
    </div>
    <h5>{{meterNames[i]}}</h5>
  </div>

</a>
</template>

<script>
export default {
  props: ['laptop'],
  data() {
    return {
      meterNames: ['PORTABILITY', 'STORAGE', 'GRAPHICS PERFORMANCE', 'CPU PERFORMANCE']
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 5px;
  margin: 15px;
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
  height: 7px;
  background-color: rgb(246, 246, 246);
  position: relative;
}
.meter {
  display: inline-block;
  height: 7px;
  background-color: rgb(250, 164, 26);
  position: absolute;
}
h5 {
  font-size: 0.8rem;
  font-weight: 100;
  font-family: sans-serif;
  color: #574e4a;
  margin: 0 0 15px 0;
}
</style>