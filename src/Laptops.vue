<template>
<div>
<div class='app'>
    <Child name='menu'/>
    <router-view></router-view>
</div>
</div>
</template>

<script>
export default {
    children: [
        {name: 'menu'},
        {name: ''}
    ],
    beforeCreate() {
        this.$options.children[1].name = ()=>{return this.routeName}
    },
    computed: {
        routeName() {
            return this.$route.path.replace('/', '')
        }
    }
}
</script>

<style scoped>
.app {
    background-color: gray;
    height: 100%;
}
</style>