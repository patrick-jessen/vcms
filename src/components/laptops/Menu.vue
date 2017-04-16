<template>
<div class='wrapper'>
    <a class='logo-link' :href='logo.link'>
        <img :src='logo.image'>
    </a>
    <nav class='menus'>
        <a class='menu' v-for='m in menus' :href='m.link'>
            {{m.text}}
        </a>
    </nav>
    <nav class='ui actions'>
        <a v-for='a in actions' :href='a.link'>
            <i class='icon' :class='a.icon'></i>
        </a>
    </nav>
</div>
</template>

<script>
export default {
    static: [
        // Company logo
        {name:'logo',type:'object',title:'Company logo',descr:'Some descr',
         props:[
             {name:'image',type:'string.img',title:'Image'},
             {name:'link',type:'string.url', title:'Link'}
         ]},
        // Menu items
        {name:'menus', type:'array', default: [{text:'laptops'},{text:'desktops'},{text:'servers'},{text:'swag'}],
         title:'Menu items', descr:'Entries in the menu',
         props:[
            {name:'text', type:'string', title:'Text', descr:'Text of menu'},
            {name:'link', type:'string.url', title:'Link', descr:'Link of menu'}
         ]},
        // Actions
        {name:'actions',type:'array',title:'Actions',descr:'Some descr',
         props: [
             {name:'icon',type:'string',title:'Icon'},
             {name:'link',type:'string.url',title:'Link'}
         ]}
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
.actions i {
    padding: 0 20px;
    color: #574e4a;
}
</style>