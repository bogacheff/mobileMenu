import Home from '../pages/home.f7.jsx';
import Favorites from '../pages/favorites.f7.jsx';
import Cart from '../pages/cart.f7.jsx';
import Item from '../pages/item.f7.jsx';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/item/:id/',
    component: Item,
  },
  {
    path: '/favorites/',
    component: Favorites,
  },
  {
    path: '/cart/',
    component: Cart,
  },
];

export default routes;
