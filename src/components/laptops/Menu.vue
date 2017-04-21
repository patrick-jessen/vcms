<template>
  <div class='wrapper'>
    <!-- Company logo -->
    <Property prop='logo' type='a' class='logo' :href='logo.link'>
      <img :src='logo.image'>
    </Property>
  
    <!-- Menu items -->
    <Property prop='menus' type='nav' class='menus'>
      <a class='menu' v-for='m in menus' :href='m.link'>
        {{m.text}}
      </a>
    </Property>
  
    <!-- Actions -->
    <Property prop='actions' type='nav' class='ui actions' :class='{lel:true}'>
      <a v-for='a in actions' :href='a.link'>
        <i class='icon' :class='a.icon'></i>
      </a>
    </Property>
  </div>
</template>

<script>
export default {
  static: [
    // Company logo
    {
      title:'Company logo',
      descr:'Some descr',
      name: 'logo',
      type: 'object',
      props:[
        {
          title:'Image',
          name: 'image',
          type: 'string.img',
        },
        {
          title:'Link',
          name: 'link',
          type: 'string.url',
        }
      ],
      default:{
        image:'default.png',
        link:'/'
      },
      render: (item) => {
        return `<img src='` + item.image + `'>`
      }
    },

    // Menu items
    {
      title:'Menu items',
      descr:'Entries in the menu',
      name: 'menus',
      type: 'array',
      props:[
        {
          title:'Text', 
          descr:'Text of menu' ,
          name: 'text', 
          type: 'string', 
        },
        { 
          title:'Link', 
          descr:'Link of menu' ,
          name: 'link', 
          type: 'string.url', 
        }
      ],
      default: [
        { text: 'laptops', link: '#' }, 
        { text: 'desktops', link: '#' }, 
        { text: 'servers', link: '#' }, 
        { text: 'swag', link: '#' }
      ],
      defaultItem: {
        text: 'New menu',
        link: '#'
      },
      render: function (items) {
        var str = ''
        for (var i = 0; i < items.length - 1; i++) {
          str += items[i].text + ', '
        }
        return str + items[i].text
      }
    },

    // Actions
    {
      title:'Actions', 
      descr:'Some descr',
      name: 'actions', 
      type: 'array', 
      props:[
        { 
          title:'Icon', 
          name: 'icon', 
          type: 'string', 
        },
        { 
          title:'Link',
          name: 'link', 
          type: 'string.url', 
        }
      ],
      default: [
        {
          icon:'comment',
          link:'#'
        }
      ],
      defaultItem: {
        icon:'comment',
        link:'#'
      },
      render: function (items) {
        var str = ''
        for (var i = 0; i < items.length; i++) {
          str += `<i class='icon ` + items[i].icon + `'></i>`
        }
        return str
      }
    }
  ]
}
</script>

<style scoped>
.wrapper {
  padding: 20px;
  background-color: white;
}

.logo {
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