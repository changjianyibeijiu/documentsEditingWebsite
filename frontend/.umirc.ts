import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path:'/userCenter',component:'@/pages/userCenter/index'
        },

        { path: '/help', component: '@/pages/help/index' },

        { path: '/account', component: '@/layouts/account',routes:[
          { path: '/account', redirect: '/account/login' },
          { path: '/account/login', component: '@/pages/login/index' },

          { path: '/account/register', component: '@/pages/register/index' },
          
        ]},


        {
          path: '/',
          component: '@/pages/home/index',
          routes: [
            { path: '/', redirect: '/recently' },

            { path: '/recently', component: '@/pages/recently/index' },

            { path: '/myDoc', component: '@/pages/myDoc/index' },

            { path: '/share', component: '@/pages/share/index' },

            { path: '/find', component: '@/pages/find/index' },

            { path: '/recycleBin', component: '@/pages/recycleBin/index' },
          ],
        },
        
      ],
    },
  ],
});
