<template>
<div>
<div class='app'>
    <Child name='menu'/>
    <router-view></router-view>
    <Child name='hero'/>
    <Child name='content'/>

</div>
</div>
</template>

<script>
export default {
    children: [
        {name: 'menu'},
        {name: 'hero'},
        {name: 'content'}
    ]
}
</script>

<style scoped>
.app {
    background-color: gray;
    height: 100%;
}
</style>