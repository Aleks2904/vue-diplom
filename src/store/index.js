import {
  createStore
} from 'vuex';

import {
  catalogStore
} from '@/store/productCatalog.js';
import {
  basket
} from '@/store/basket.js';
import {
  order
} from '@/store/order.js';


export default createStore({
  modules: {
    product: catalogStore,
    basket: basket,
    order: order,
  }
})