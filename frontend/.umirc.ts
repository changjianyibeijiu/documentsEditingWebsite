import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  dynamicImport:{},
  routes: [
    {
      path: '/',
      component: '@/components/authentication/index',
      routes: [
        {
          path: '/',
          component: '@/layouts/index',
          routes: [
            { path: '/userCenter', component: '@/pages/userCenter/index' },

            { path: '/help', component: '@/pages/help/index' },

            {
              path: '/account',
              component: '@/layouts/account',
              routes: [
                { path: '/account', redirect: '/account/login' },
                { path: '/account/login', component: '@/pages/login/index' },

                {
                  path: '/account/register',
                  component: '@/pages/register/index',
                },
              ],
            },
            

            { path: '/edit', component: '@/layouts/edit',
              routes:[
                { path: '/edit', redirect: '/edit/word' },

                // { path: '/edit/word', component: '@/pages/word/index' },
                // { path: '/edit/word/:folerId', component: '@/pages/word/index' },

                { path: '/edit/word/:id?', component: '@/pages/word/index' },
                { path: '/edit/word/:folderId/:id', component: '@/pages/word/index' },



                { path: '/edit/excel/:id', component: '@/pages/excel/index' },
                { path: '/edit/excel/folder/:folderId/:id', component: '@/pages/excel/index' },
                { path: '/edit/excel', component: '@/pages/excel/index' },

                { path: '/edit/flowSheet/:id', component: '@/pages/flowSheet/index' },
                { path: '/edit/flowSheet/folder/:folderId/:id', component: '@/pages/flowSheet/index' },
                { path: '/edit/flowSheet', component: '@/pages/flowSheet/index' },
                
                { path: '/edit/mind/:id', component: '@/pages/mind/index' },
                { path: '/edit/mind/folder/:folderId/:id', component: '@/pages/mind/index' },


                { path: '/edit/mind', component: '@/pages/mind/index' },

                { path: '/edit/md/:id', component: '@/pages/md/index' },
                { path: '/edit/md/folder/:folderId/:id', component: '@/pages/md/index' },


                { path: '/edit/md', component: '@/pages/md/index' },

              ]
          },


            {
              path: '/',
              component: '@/pages/home/index',
              routes: [
                { path: '/', redirect: '/recently' },

                { path: '/recently', component: '@/pages/recently/index' },

                { path: '/myDoc', component: '@/pages/myDoc/index'},

                { path: '/folder/:folderId', component: '@/pages/folder/index'},

                { path: '/share', component: '@/pages/share/index' },

                { path: '/share/:folder/:folderId', component: '@/pages/folder/index'},

                { path: '/preview/:id', component: '@/pages/preview/index' },
                { path: '/preview/:folderId/:id', component: '@/pages/preview/index' },


                { path: '/find', component: '@/pages/find/index' },



                { path: '/recycleBin', component: '@/pages/recycleBin/index' },
              ],
            },
          ],
        },
      ],
    },
  ],
});
