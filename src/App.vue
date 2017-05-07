<template>
<div id='app'>
    <Child name='menu' :invert='invertMenu'/>
    <Child name='page' type='page'/>
    <Child name='footer'/>
</div>
</template>

<script>
export default {
    vcms:{
    children: [
        {name: 'menu'},
        {name: 'page', type: 'page'},
        {name: 'footer'}
    ]},
    computed: {
        invertMenu() {
            if(this.$route.path === '/')
                return true
                
            return false
        }
    }
}
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    padding-right: 0 !important;
    padding-bottom: 0 !important;
    display: inline-block;
}
</style>