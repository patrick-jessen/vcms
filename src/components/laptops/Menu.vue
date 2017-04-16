<template>
<div class='wrapper'>
    <a class='logo-link' :href='logoLink'>
        <img :src='logo'>
    </a>
    <nav class='menus'>
        <a class='menu' v-for='m in menus'>
            {{m.name}}
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
        {name:'logoLink', type:'string.url', default:'http://google.com',
         title: 'Logo link', descr: 'Link when clicking logo'},
        {name:'logo', type:'string.img', default: 'https://d1vhcvzji58n1j.cloudfront.net/assets/logo-1c27efee7b.png',
         title: 'Logo image', descr: 'Image to display as logo'},
        {name:'menus', type:'array', default: [{name:'laptops'},{name:'desktops'},{name:'servers'},{name:'swag'}],
         props:[{name:'name', type:'string', title:'Name', descr:'Name of menu'},
                {name:'link', type:'string,url', title:'Link', descr:'Link of menu'}],
         title:'Menu items', descr:'Entries in the menu'},
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