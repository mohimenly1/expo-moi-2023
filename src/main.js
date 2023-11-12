// =========================================================
// * Vue Material Dashboard - v1.5.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import Vuex from 'vuex'; // Import Vuex
import store from './store'; // Import your Vuex store

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";
import VueQRCodeComponent from 'vue-qrcode-component' 
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active",
});

Vue.prototype.$Chartist = Chartist;

Vue.config.productionTip = false;
Vue.use(Vuex); // Use Vuex


router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(route => route.meta.requiresAuth)) {
    // Redirect to login if not authenticated
    if (!store.state.token) {
      next({ name: 'UnkownReq' });
    } else {
      next();
    }
  } else {
    next(); // Continue for public routes
  }
});

Vue.component('qr-code', VueQRCodeComponent) 
Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

console.log(Vuex);
/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: (h) => h(App),
  router,
  store, // Add the Vuex store to the Vue instance
  data: {
    Chartist: Chartist,
   
  },

  
});

