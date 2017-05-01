<template>
<div>
  <Child name='banners' type='array'/>
</div>
</template>

<script>
export default {
  vcms: {
    children: [
      {name:'banners', type:'array'}
    ]
  }
}
</script>