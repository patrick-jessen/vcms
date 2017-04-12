<template>
<div class='wrapper'>
    <a class='logo-link' :href='logoLink'>
        <img :src='logo'>
    </a>
    <nav class='menus'>
        <a class='menu' v-for='m in menus'>
            {{m}}
        </a>
    </nav>
    <nav class='ui actions'>
        <i class='comments icon'></i>
        <i class='life ring icon'></i>
        <i class='user icon'></i>
    </nav>
</div>
</template>

<script>
export default {
    static: [
        {name:'logoLink', type:'string', default:'http://google.com'},
        {name:'logo', type:'string', default: 'https://d1vhcvzji58n1j.cloudfront.net/assets/logo-1c27efee7b.png'},
        {name:'menus', type:'string', default: ['laptops','desktops','servers','swag']},
    ]
}
</script>

<style scoped>
.wrapper {
    padding: 20px;
    background-color: white;
}
.logo-link {
    display: inline-block;
    margin-right: 70px;
}
img {
    height: 52px;
}
.menus {
    vertical-align: top;
    display: inline-block;
    margin-top: 15px;
}
.menu {
    padding: 20px;
    font-size: 16px;
    color: #574e4a;
}
.actions {
    margin-top: 15px;
    vertical-align: top;
    float: right;
    color: #574e4a;
}
.actions>i {
    padding: 0 20px;
}
</style>