var layouts = {
  Laptops: require('./components/pages/Laptops.vue'),
  Desktops: require('./components/pages/Desktops.vue')
}

window.layouts = layouts

export default [
  {path:'/', component: layouts.Desktops},
  {path:'/desktops', component: layouts.Desktops},
  {path:'/test', component: layouts['Laptops']},
  {path:'/laptops', component: layouts.Laptops,
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