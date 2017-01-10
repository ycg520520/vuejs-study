import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import routers from './router';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter(routers);

window.globalVue = new Vue({router, render: f => f(App)}).$mount('#app');
