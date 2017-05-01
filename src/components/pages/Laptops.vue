<template>
<div>
  <Child name='hero'/>
  <Child name='content'/>
</div>
</template>

<script>
export default {
  vcms: {
  children: [
    {name: 'hero'},
    {name: 'content'},
  ]},
  beforeCreate() {
    this.type = 'page'
  }
}
</script>