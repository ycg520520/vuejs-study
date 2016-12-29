import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/goods', component: goods},
    {path: '/seller', component: seller}
  ]
});

new Vue({router, render: f => f(App)}).$mount('#app');
