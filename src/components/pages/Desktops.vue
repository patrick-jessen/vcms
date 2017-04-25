<template>
<div>
  <h1>This is desktops</h1>
  <Child name='content'/>
</div>
</template>

<script>
export default {
  children: [
    {name:'content'}
  ],
  beforeCreate() {
    this.page = true
  }
}
</script>