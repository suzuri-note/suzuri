import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/pages/HomePage.vue';
import EditPage from '@/components/pages/EditPage.vue';
import AccountPage from '@/components/pages/AccountPage.vue';
import MemoEndPage from '@/components/pages/MemoEndPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditPage,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage,
    },
    {
      path: '/memo/:id',
      name: 'memo',
      component: MemoEndPage,
    }
  ],
});
