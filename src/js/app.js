import Framework7 from './framework7-custom.js';

// Import F7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';

// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7.jsx';

// eslint-disable-next-line
const app = new Framework7({
  name: 'Seven Burger', // App name
  theme: 'auto', // Automatic theme detection
  el: '#app', // App root element
  component: App, // App main component
  colors: {
    primary: '#f54748',
  },

  darkMode: 'auto',

  // App store
  store,
  // App routes
  routes,
  // Register service worker (only on production build)
  serviceWorker:
    process.env.NODE_ENV === 'production'
      ? {
          path: '/service-worker.js',
        }
      : {},
});
