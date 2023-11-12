<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
      <notifications></notifications>
  
      <side-bar
        :sidebar-item-color="sidebarBackground"
        :sidebar-background-image="sidebarBackgroundImage"
      >
        <mobile-menu slot="content"></mobile-menu>
        <sidebar-link to="/dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
   
       
         
<button class="buttonDownload" @click="logout">Logout</button>
     
        <!-- <sidebar-link to="/user">
          <md-icon>person</md-icon>
          <p>User Profile</p>
        </sidebar-link>
        <sidebar-link to="/table">
          <md-icon>content_paste</md-icon>
          <p>Table list</p>
        </sidebar-link>
        <sidebar-link to="/typography">
          <md-icon>library_books</md-icon>
          <p>Typography</p>
        </sidebar-link>
        <sidebar-link to="/icons">
          <md-icon>bubble_chart</md-icon>
          <p>Icons</p>
        </sidebar-link>
        <sidebar-link to="/maps">
          <md-icon>location_on</md-icon>
          <p>Maps</p>
        </sidebar-link>
        <sidebar-link to="/notifications">
          <md-icon>notifications</md-icon>
          <p>Notifications</p>
        </sidebar-link>
        <sidebar-link to="/upgrade" class="active-pro">
          <md-icon>unarchive</md-icon>
          <p>Upgrade to PRO</p>
        </sidebar-link> -->
      </side-bar>
  
      <div class="main-panel">
        <top-navbar></top-navbar>
  
        <fixed-plugin
          :color.sync="sidebarBackground"
          :image.sync="sidebarBackgroundImage"
        >
        </fixed-plugin>
  
        <dashboard-content> </dashboard-content>
  
      
      </div>
    </div>
  </template>
  
  <script>


  import DashboardContent from "./Content.vue";
  import MobileMenu from "@/pages/Layout/MobileMenu.vue";
  import FixedPlugin from "./Extra/FixedPlugin.vue";
  import axios from 'axios';
  import store from '../../store'; 
  export default {
    components: {

      DashboardContent,
     
      MobileMenu,
      FixedPlugin,
    },
    data() {
      return {
        sidebarBackground: "green",
        sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      };
    },

    methods:{
        logout() {
      // Make an HTTP request to the logout API endpoint
      const apiUrl = 'http://127.0.0.1:8000/api/logout';

      // Assuming you have Axios installed, if not, install it using npm install axios
      axios.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${store.getters.getToken}`,
        },
      })
      .then(response => {
        // Handle successful logout
        // Clear the token from the Vuex store and localStorage
       store.dispatch('setToken', null);
        localStorage.removeItem('token');

        // Redirect to the home route or perform any other actions
        // For example, you can use Vue Router to navigate to a different page
        this.$router.push('/expolymoi');
      })
      .catch(error => {
        // Handle logout failure
        console.error('Logout failed:', error);
      });
    },
    }
  };
  </script>
  
  <style>

  .buttonDownload {
 display: inline-block;
 position: relative;
 padding: 10px 25px;
 background-color: rgb(199, 70, 19);
 color: white;
 font-family: sans-serif;
 text-decoration: none;
 font-size: 0.9em;
 text-align: center;
 text-indent: 15px;
 border: none;
 margin-top: 10px;
 width: 73%;
  margin-left: 13%;
}

.buttonDownload:hover {

 color: white;
}

.buttonDownload:before, .buttonDownload:after {

 display: block;
 position: absolute;
 left: 15px;
 top: 52%;
}

.buttonDownload:before {
 width: 10px;
 height: 2px;
 border-style: solid;
 border-width: 0 2px 2px;
}

.buttonDownload:after {
 width: 0;
 height: 0;
 margin-left: 3px;
 margin-top: -7px;
 border-style: solid;
 border-width: 4px 4px 0 4px;
 border-color: transparent;
 border-top-color: inherit;
 animation: downloadArrow 1s linear infinite;
 animation-play-state: paused;
}

.buttonDownload:hover:before {
 border-color: #cdefbd;
}

.buttonDownload:hover:after {
 border-top-color: #cdefbd;
 animation-play-state: running;
}

@keyframes downloadArrow {
 0% {
  margin-top: -7px;
  opacity: 1;
 }

 0.001% {
  margin-top: -15px;
  opacity: 0.4;
 }

 50% {
  opacity: 1;
 }

 100% {
  margin-top: 0;
  opacity: 0.4;
 }
}
  </style>