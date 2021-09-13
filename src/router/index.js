import {
  createRouter,
  createWebHistory
} from 'vue-router'

import home from '@/page/home/home.vue';
import pageItem from '@/page/pageItem/pageItem';
import pageBasket from '@/page/basket/pageBasket';
import pageOrder from '@/page/order/pageOrder';

const routes = [{
    path: '/',
    name: 'Home',
    component: home,
  },
  {
    path: '/item/:id',
    name: 'item',
    component: pageItem,
  },
  {
    path: '/basket',
    name: 'basket',
    component: pageBasket,
  },
  {
    path: '/order',
    name: 'order',
    component: pageOrder,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router