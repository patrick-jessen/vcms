<template>
<div>
<div class='app'>
    <Child name='menu'/>
</div>
</div>
</template>

<script>
export default {
    children: [
        {name: 'menu'}
    ]
}
</script>

<style scoped>
.app {
    background-color: gray;
    height: 100%;
}
</style>