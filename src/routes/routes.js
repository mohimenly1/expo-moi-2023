import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import DashHome from "@/pages/Layout/DashHome.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Visitors from "@/pages/visitors/Visitors.vue";
import HomePage from "@/pages/Home/Index.vue";
import CardPerson from "@/pages/CardPerson/Card.vue";
import LoginView from "@/pages/Login/LoginView.vue";
import UnkownReq from "@/pages/Four/404.vue";
import store from "../store";

const routes = [
  {
    // Public route for login
    path: "/404",
    name: "UnkownReq",
    component: UnkownReq,
  },
  {
    // Public route for login
    path: "/expolymoi",
    name: "LoginView",
    component: LoginView,
  },
  {
    // Public route for home
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    // Public route for your-card
    path: '/your-card',
    name: 'cardPerson',
    component: CardPerson,
  },
  {
    // Protected route for dashboard
    path: "/dashboard",
    component: DashHome,
    meta: { requiresAuth: true }, // Add meta field for authentication check

    children: [
      {
        path: "/", // Note: This path is relative to the parent route
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "visitors",
        name: "Visitors",
        component: Visitors,
      },
    ],
  },
];

export default routes;
