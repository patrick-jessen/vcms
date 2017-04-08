<template>
<div class='ui icon input' :class='{loading:isSearching}'>
  <input class='search icon' @input='emitSearch($event.target.value)' :placeholder='placeholder'>
  <i class='icon' :class='icon'></i>
</div>
</template>

<script>
export default {
  emits: ['search'],
  props: {
    'isSearching':{type:Boolean,default:false},
  },
  static: [
    {name:'placeholder',type:'string',default:'Search...'},
    {name:'icon',type:'select',default:'search',options:['search','find']}
  ]
}
</script>

<style scoped>
.ui.icon.input {
  width: 100%
}

.ui.icon.input>.search.icon {
  border-radius: 30px;
}
</style>