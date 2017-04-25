<template>
<div class='wrapper'>
  <div>
    <div v-for='i in first'>
      {{i}}
    </div>
  </div>
  <div>
    <div v-for='i in second'>
      {{i}}
    </div>
  </div>
  <div class='right'>
    <i v-for='i in third' :class='"ui huge icon " + i'></i>
  </div>
  <div class='bottom'>
    <h5>
    Copyright © System76 2017
    </h5>
    <p>
    * All financing prices are based on the advertised price at 10% APR paid over 12 months.
    Intel, the Intel Logo, Intel Core, Iris, and Xeon are trademarks of Intel Corporation or its subsidiaries in the U.S. and/or other countries.
    </p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      first: ['Contact', 'Support', 'About Us', 'Blog', 'Careers'],
      second: ['Shipping Information', 'Warranty & Returns', 'Privacy Policy', 'Disclaimer', 'Terms & Conditions'],
      third: ['facebook f', 'github', 'google plus', 'instagram', 'twitter']

    }
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #574e4a;
  height: 340px;
  padding: 50px 10px 10px 10px;
}
.wrapper>div {
  display: inline-block;
  width: 200px;

}
.wrapper>div>div {
  color: #999;
  font-size: 1.2rem;
  font-weight: 100;
  margin: 10px;
}
.wrapper>div>div:hover {
  text-decoration: underline;
  cursor: pointer;
  color: #f2f2f2;
}
.right {
  float: right;
  width: 500px !important;
}
.right i {
  color: #999;
  display: inline-block;
  margin: 10px;
}
.right i:hover {
  color: #f2f2f2;
  cursor: pointer;
}
.bottom {
  margin-top: 40px;
  clear: both;
  display: block !important;
  width: 50% !important;
  margin: auto;
  text-align: center;
  color: #999;
  padding-top: 65px;
}
.bottom p {
  font-size: 0.8rem;
}
</style>
