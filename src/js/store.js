import { createStore } from 'framework7';
import { categories, items } from './data.js';
import { formatPrice } from './format-price.js';

const getFromLocalStorage = (key, defaultValue) => {
  return localStorage[key] ? JSON.parse(localStorage[key]) : defaultValue;
};

let debounceTimeout;
const popularIds = [14, 15, 1, 10, 9, 3];
const trendingIds = [3, 4, 5, 19, 11, 20];

const store = createStore({
  state: {
    items,
    categories,
    filterCategoryId: null,
    favoriteItems: getFromLocalStorage('favoriteItems', []),
    recentItems: getFromLocalStorage('recentItems', []),
    searchQuery: '',
    searchState: 'idle',
    searchResults: [],
    cart: getFromLocalStorage('cart', []),
    popularItems: items.filter((item) => popularIds.includes(item.id)),
    trendingItems: items.filter((item) => trendingIds.includes(item.id)),
  },
  getters: {
    filterCategoryId: ({ state }) => state.filterCategoryId,
    filteredItems({ state }) {
      if (!state.filterCategoryId) return state.items;
      return state.items.filter(
        (item) => item.categoryId === state.filterCategoryId,
      );
    },
    items: ({ state }) => state.items,
    categories: ({ state }) => state.categories,
    favoriteItems: ({ state }) => state.favoriteItems,
    recentItems: ({ state }) => state.recentItems,
    searchResults: ({ state }) => state.searchResults,
    searchState: ({ state }) => state.searchState,
    cart: ({ state }) => state.cart,
    cartTotal({ state }) {
      let total = 0;
      state.cart.forEach((obj) => {
        total += obj.quantity * obj.price;
      });
      return formatPrice(total);
    },
    popularItems: ({ state }) => state.popularItems,
    trendingItems: ({ state }) => state.trendingItems,
  },
  actions: {
    setFilterCategoryId({ state }, id) {
      state.filterCategoryId = id;
    },
    emptyCart({ state }) {
      state.cart = [];
      localStorage.cart = JSON.stringify(state.cart);
    },
    updateCartQuantity({ state }, { quantity, obj }) {
      obj.quantity = quantity;
      if (quantity === 0) {
        state.cart.splice(state.cart.indexOf(obj), 1);
      }
      state.cart = [...state.cart];
      localStorage.cart = JSON.stringify(state.cart);
    },
    addToCart({ state }, { item, quantity, price, priceTitle }) {
      const inCartItem = state.cart.filter(
        (obj) => obj.item.id === item.id && obj.price === price,
      )[0];
      if (inCartItem) {
        inCartItem.quantity += quantity;
      } else {
        state.cart.push({ quantity, item, price, priceTitle });
      }
      state.cart = [...state.cart];
      localStorage.cart = JSON.stringify(state.cart);
    },
    addRecentItem({ state }, item) {
      const inRecent = state.recentItems.filter(
        (recItem) => recItem.id === item.id,
      )[0];
      if (inRecent) return;
      state.recentItems.unshift(item);
      state.recentItems = [...state.recentItems].slice(0, 6);
      localStorage.recentItems = JSON.stringify(state.recentItems);
    },
    addFavoriteItem({ state }, item) {
      const inFavorites = state.favoriteItems.filter(
        (favItem) => favItem.id === item.id,
      )[0];
      if (inFavorites) return;
      state.favoriteItems.push(item);
      state.favoriteItems = [...state.favoriteItems];
      localStorage.favoriteItems = JSON.stringify(state.favoriteItems);
    },
    removeFavoriteItem({ state }, item) {
      const inFavorites = state.favoriteItems.filter(
        (favItem) => favItem.id === item.id,
      )[0];
      if (!inFavorites) return;
      state.favoriteItems.splice(state.favoriteItems.indexOf(inFavorites), 1);
      state.favoriteItems = [...state.favoriteItems];
      localStorage.favoriteItems = JSON.stringify(state.favoriteItems);
    },
    setSearch({ state }, data) {
      if (typeof data.query !== 'undefined') state.searchQuery = data.query;
      if (typeof data.state !== 'undefined') state.searchState = data.state;
      if (typeof data.results !== 'undefined')
        state.searchResults = data.results;
    },
    search({ state, dispatch }, query) {
      if (query.trim().length === 0) {
        dispatch('setSearch', { query, state: 'idle', results: [] });
        return;
      }
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(async () => {
        if (query === state.searchQuery) {
          return;
        }
        dispatch('setSearch', { query, state: 'loading', results: [] });
        const results = state.items.filter(({ title, subtitle }) => {
          return (
            title.toLowerCase().includes(query.toLowerCase()) ||
            subtitle.toLowerCase().includes(query.toLowerCase())
          );
        });
        if (results.length === 0) {
          dispatch('setSearch', { state: 'empty', results: [] });
          return;
        }
        dispatch('setSearch', {
          state: 'results',
          results: [...results],
        });
      }, 300);
    },
  },
});
export default store;
