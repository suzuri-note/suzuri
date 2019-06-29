import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/pages/Home.vue';
import Edit from '@/components/pages/Edit.vue';
import Account from '@/components/pages/Account.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
    },
  ],
});
