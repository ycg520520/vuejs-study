import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

export default {
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/goods'},
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
};
