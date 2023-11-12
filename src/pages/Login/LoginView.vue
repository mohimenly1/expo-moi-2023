<template lang="">
 
  <div>
    <section>
    <div class="login-box">
        <form @submit.prevent="submitLoginForm">
    <h2>TAQNYA EXPO 2023</h2>

    <div class="input-box">
      <span class="icon">
        <ion-icon name="mail"></ion-icon>
      </span>
      <input v-model="email" type="email" required>
      <label>Email</label>
    </div>

    <div class="input-box">
      <span class="icon">
        <ion-icon name="lock-closed"></ion-icon>
      </span>
      <input v-model="password" type="password" required>
      <label>Password</label>
    </div>

    <button type="submit">Login</button>
  </form>
    </div>
    </section>
  </div>

</template>
<script>
import axios from 'axios';
import store from '../../store'; 
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitLoginForm() {
      // Make an HTTP request to the login API endpoint
      const apiUrl = 'http://127.0.0.1:8000/api/login';
      const credentials = {
        email: this.email,
        password: this.password,
      };

      // Assuming you have Axios installed, if not, install it using npm install axios
      axios.post(apiUrl, credentials)
        .then(response => {
          // Handle successful login
          const token = response.data.token;

          // Save the token to the Vuex store
          store.dispatch('setToken', token);

          // Redirect to a different route or perform any other actions
          // For example, you can use Vue Router to navigate to a different page
          this.$router.push('/dashboard');
        })
        .catch(error => {
          // Handle login failure
          console.error('Login failed:', error);
        });
    },


  },
  mounted() {
  console.log('Vuex Store:', store);
}
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");


.student-login {
    color: #F99417;
}


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

section {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: url("https://wallpapercave.com/wp/wp12968699.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    animation: animateBg 5s linear infinite;
}

@keyframes animateBg {
    100% {
        filter: hue-rotate(360deg);
    }
}

.login-box {
    position: relative;
    width: 600px;
    height: 450px;
    background: transparent;
    border: 2px solid rgba(119, 92, 92, 0.5);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(15px);
}

h2 {
    font-size: 2.5rem;
    color: #fff;
    text-align: center;
}

.input-box {
    position: relative;
    width: 310px;
    margin: 30px 0;
    border-bottom: 2px solid #fff;
}

.input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #fff;
    pointer-events: none;
    transition: 0.5s;
}

.input-box input:focus~label,
.input-box input:valid~label {
    top: -5px;
}

.input-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    color: #fff;
    padding: 0 35px 0 5px;
}

.input-box .icon {
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2rem;
    line-height: 57px;
}

.remember-forgot {
    margin: -15px 0 15px;
    font-size: 0.9em;
    color: #fff;
    display: flex;
    justify-content: space-between;
}

.remember-forgot label input {
    margin-right: 3px;
}

.remember-forgot a {
    color: #fff;
    text-decoration: none;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

button {
    width: 100%;
    height: 40px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1rem;
    color: #000;
    font-weight: 500;
}

.register-link {
    font-size: 0.9rem;
    color: #fff;
    text-align: center;
    margin: 25px 0 10px;
}

.register-link p a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
}

.register-link p a:hover {
    text-decoration: underline;
}

@media (max-width: 360px) {
    .login-box {
        width: 100%;
        height: 100vh;
        border: none;
        border-radius: 0;
    }

    .input-box {
        width: 290px;
    }
}
</style>
  
