var layouts = {
  Laptops: require('./components/pages/Laptops.vue'),
  Desktops: require('./components/pages/Desktops.vue'),
  NewPage: require('./components/pages/NewPage.vue'),
  Frontpage: require('./components/pages/Frontpage.vue'),
}

window.layouts = layouts

export default [
  {path:'/', component: layouts.Desktops, props:{name:'page.$pages./'}},
  {path:'/desktops', component: layouts.Laptops, props:{name:'desktops'}},
  {path:'/laptops', component: layouts.Laptops, props:{name:'page.$pages./laptops'},
   children: [
     {path: 'lemur',    component: layouts.Laptops},
     {path: 'gazelle',  component: layouts.Laptops},
     {path: 'kudu',     component: layouts.Laptops},
     {path: 'galago',   component: layouts.Laptops},
     {path: 'oryx',     component: layouts.Laptops},
     {path: 'serval',   component: layouts.Laptops},
     {path: 'bonobo',   component: layouts.Laptops},
   ]},
]