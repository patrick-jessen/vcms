<template>
<div class='wrapper'>
  <div class='innerwrapper'>
    <ProductSummary v-for='i in items'/>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        1,2,3,4,5,6 //TEMP
      ]
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 50px;
  background-color: white;
  margin: auto;
}
.innerwrapper {
  max-width: 900px;
  margin: auto;
}
</style>