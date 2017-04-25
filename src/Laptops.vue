<template>
<div>
<div class='app'>
    <Child name='menu'/>
    <Child name='page' type='page'/>
    <Child name='footer'/>
</div>
</div>
</template>

<script>
export default {
    children: [
        {name: 'menu'},
        {name: 'page', type: 'page'},
        {name: 'footer'}
    ],
    beforeCreate() {
        this.$options.children[1].name = ()=>{
            return this.routeName
        }
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