<template>
<div class='table'>
  <div class='row'>
    <div>Component type</div>
    <div><select><option>menu</option></select></div>
  </div>

  <div class='row'>
    <div>Component type</div>
    <div><select><option>menu</option></select></div>
  </div>
</div>
</template>

<style scoped>
.table {
  width: 100%;
}

.row:nth-child(odd) {
  background-color: aliceblue;
}

.row>div {
  display: inline-block;
  margin: 0px;
  padding: 0px;
  width: 49%;
}

</style>