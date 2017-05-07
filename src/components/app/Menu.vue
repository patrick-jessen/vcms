<template>
  <div class='wrapper' :class='{invert}'>
    <!-- Company logo -->
    <Property prop='logo' class='logo'>
      <router-link :to='logo.link'>
        <img :src='logoSrc'>
      </router-link>
    </Property>
  
    <!-- Menu items -->
    <Property prop='menus' type='nav' class='menus'>
      <router-link class='menu' v-for='m in menus' :to='m.link' :key='m'>
        {{m.text}}
      </router-link>
    </Property>
  
    <!-- Actions -->
    <Property prop='actions' type='nav' class='ui actions' :class='{lel:true}'>
      <router-link v-for='a in actions' :to='a.link' :key='a'>
        <i class='icon' :class='a.icon'></i>
      </router-link>
    </Property>
  </div>
</template>

<script>

export default {
  props: ['invert'],
  vcms: require('./defs/Menu.yml'),
  computed: {
    logoSrc() {
      if(this.invert)
        return this.logo.invertedimage
      return this.logo.image
    }
  }
}
</script>

<style>
.wrapper {
  padding: 20px;
}
.wrapper.invert {
  border-bottom: 1px solid white;
}

.logo {
  display: inline-block;
  margin-right: 70px;
}
img {
  width: 210px;
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
.invert .menu {
  color: white;
}

.actions {
  margin-top: 15px;
  vertical-align: top;
  float: right;
}
.actions i {
  padding: 0 20px;
  color: #574e4a;
}
.invert .actions i {
  color: white;
}

.router-link-active {
  font-weight: 800;
}
</style>