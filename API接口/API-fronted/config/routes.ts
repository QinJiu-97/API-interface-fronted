export default [

  {path: '/', name: '主页', icon: 'smile', component: './Index/index'},
  {path: '/interface/:id', name: '接口信息', icon: 'smile', component: './InterfaceInfo/index', hideInMenu: true},
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },

  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {name: '查询表格', icon: 'table', path: '/admin/api-interface', component: './Admin/ApiInterface'},
      {path: '/admin', redirect: '/admin/sub-page'},
      {path: '/admin/sub-page', name: '二级管理页', component: './Admin'},
    ],
  },

  // { path: '/', redirect: '/welcome' },
  {path: '*', layout: false, component: './404'},
];
