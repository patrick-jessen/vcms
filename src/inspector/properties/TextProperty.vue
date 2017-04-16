<template>
<div class='ui input'>
  <input :value='property.value'>
</div>
</template>

<script>
export default {
  props: ['property']
}
</script>