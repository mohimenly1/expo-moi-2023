<template lang="">
    <div id="myHome">
        <header>
    <div class="container">
        <nav>
            <div class="nav-logo">
                <img src="../../assets/svg/logo.svg" alt="">
            </div>
    
            <div class="hamburger-menu-wrap">
                <div class="hamburger-menu">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>
        </nav>
    </div>
</header>

<!-- Hero -->
<section class="hero">
    <div class="container" style="text-align: right;">
        <div class="hero-content">
     
            <div class="hero-img" style="margin-right:10%;">
                <img src="../../assets/header/qr-code-monochromatic.png" alt="">
            </div>

            <div class="hero-form">
                <h1 class="text"></h1>
                <h4 class="hero-subtitle">يرجى تعبئة النموذج</h4>
                <form @submit.prevent="explore">
    <div class="form-groups">



      <!-- Second Input -->
      <div class="form-control">
        <label for="secondInput">: رقم الهاتف</label>
        <input v-model="phoneNumber" placeholder="اكتب رقم هاتفك">
      </div>
 

      <!-- First Input -->
      <div class="form-control">
        <label for="firstInput">: الإسـم بالكـامل</label>
        <input v-model="namePerson" placeholder="إسمك الثلاثي هنا">
      </div>



            <!-- Location Select -->
            <div class="form-control">
        <label for="locationSelect">: المدينـة</label>
        <select id="locationSelect" v-model="locationPerson" class="custom-select">
    <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
  </select>
      </div>

      <!-- Nationality Select -->
      <div class="form-control">
        <label for="activitySelect">: الجنسيـة</label>
        <select id="activitySelect" v-model="nationalityPerson">
    <option v-for="nationality in nationalities" :key="nationality.id" :value="nationality.id">{{ nationality.name }}</option>
  </select>
      </div>

      <div class="form-control">
        <label for="activitySelect">: ملاحظة</label>
        <textarea v-model="note" wrap="off" cols="30" rows="5"></textarea>
      </div>


      <div class="form-control btn-controller-submit">
        <button type="submit" class="btn btn-explore btn-sb">إرسال</button>
      </div>
    

    </div>

  
  </form>
            </div>
        </div>
    </div>
</section>
<!--End Hero -->


<!--Explore World-->
<section class="explore">
    <div class="container">
        <div class="section-content">
            <div class="section-text">
                <h3 class="section-title">زيارة موقعنا للمزيد من المعلومات</h3>
<p class="p-description">استمتع بتجربة استكشافية  واحصل على معلومات قيمة على موقعنا. ستجد أحدث الأخبار، النصائح الهامة. لا تفوت فرصة الاطلاع على كل ما يمكن أن يفيدك ويثري تجربتك. زُر موقعنا الآن !</p>

<div class="btn-controller">
    <button type="button" class="btn btn-explore" onclick="explore()">زيارة الموقع</button>
    </div>
            </div>
            <div class="hero-img">
                <img src="../../assets/svg/world-connection-isometric.svg" alt="">
            </div>

        </div>
    </div>
</section>

    </div>
</template>
<script>
import axios from 'axios';
const urlApi = process.env.VUE_APP_API_URL
export default {
  data() {
    return {
      nationalityPerson:'',
locationPerson:'',
namePerson:'',
phoneNumber:'',
cities: [], // To store the list of cities
      nationalities: [], // To store the list of nationalities
      note:''
    };
  },
  methods: {
    explore() {
 const formData = {
        name: this.namePerson,
        phoneNumber: this.phoneNumber,
        city_id: this.locationPerson, // Assuming locationPerson is the city ID
        nationality_id: this.nationalityPerson, // Assuming nationalityPerson is the nationality ID
        note: this.note, // You can include note data if needed
      };

      axios.post(urlApi+'api/visitor', formData)
      .then(response => {
        console.log(response.data);

        // Navigate to the success route and pass response data
        this.$router.push({ name: 'cardPerson', params: { responseData: response.data } });
      })
      .catch(error => {
        console.error(error.response.data);
        // Handle error, e.g., show an error message
      });
    
    },
    fetchCities() {
      
      axios.get(urlApi+'api/cities')
        .then(response => {
          this.cities = response.data.data; // Assuming the API returns an array of cities
        })
        .catch(error => {
          console.error(error.response.data);
          // Handle error, e.g., show an error message
        });
    },
    fetchNationalities() {
      axios.get(urlApi+'api/nationalities')
        .then(response => {
          this.nationalities = response.data.data; // Assuming the API returns an array of nationalities
        })
        .catch(error => {
          console.error(error.response.data);
          // Handle error, e.g., show an error message
        });
    },
  },

  mounted(){
    document.addEventListener('DOMContentLoaded', function () {
      var message = {
        message: [
          '👋 مرحباً بك',
          'TAQNYA | 13-16 november | 2023',
          'مركز المعلومات والتوثيق'
        ],
        counterS: 0,
        counterL: 0,
        deleteS: false,

        init: function () {
          this.cacheElem();
          this.type();
        },

        cacheElem: function () {
          this.textElem = document.querySelector('.text');
        },

        type: function () {
          var message = this.message[this.counterS],
            that = this,
            speed = 0;

          message = !this.deleteS ? message.slice(0, ++this.counterL) : message.slice(0, --this.counterL);
          if (this.message[this.counterS] != message && !this.deleteS) {
            this.textElem.textContent = message;
            speed = 120;
          } else {
            this.deleteS = true;
            speed = this.message[this.counterS] == message ? 1000 : 40;
            this.textElem.textContent = message;
            if (message == '') {
              this.deleteS = false;
              this.counterS = this.counterS < this.message.length - 1 ? this.counterS + 1 : 0;
            }
          }
          setTimeout(function () { that.type() }, speed);
        }
      };
      message.init();
    });
    
    this.fetchCities();
    this.fetchNationalities();
  }
};
</script>
<style >
    @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,500;1,600&display=swap");
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@font-face {
  font-family: 'bukra-reg';
  src: url('../../assets/fonts/otf/29ltbukraregular.otf');

}

@font-face {
  font-family: 'bukra-bold';
  src: url('../../assets/fonts/otf/29ltbukrabold.otf');

}

.btn-controller{
    display: flex;
    justify-content: center;
    
}
.btn-controller-submit {
  display: flex;
    justify-content: right;
    height: 100%;
    font-family: 'bukra-bold';
  margin-top: 5%;
}

.btn-controller-submit .btn-sb{
  height: 237%;
  font-family: 'bukra-bold';
}

.btn-controller button{
    font-family: 'bukra-bold';
}

label {
  display: block;
  margin-bottom: 5px;
  font-family: 'bukra-bold' ;
  color: #024772;
}


input::placeholder{
    font-family: 'bukra-reg' ;
    text-align: right;
}

select,
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: right;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
background-color: white;
  cursor: pointer;
}



html {
  font-size: 10px;
  scroll-behavior: smooth;
}

img {
  width: 100%;
  max-width: 100%;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.container {
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 8rem 0;
}

body {
  background-color: #FFFFFF;
}

.btn {
  padding: 0.8rem 2.4rem;
  border-radius: 0.8rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  transition: all 0.3s ease-in-out;
}
.btn:hover {
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

/* Resource:https://andrejgajdos.com/custom-select-dropdown/ */
.custom-select-wrapper {
  position: relative;
  user-select: none;
  width: 100%;
}

.custom-select {
  position: relative;
  display: flex;
  flex-direction: column;
  border-width: 0 1px 0 1px;
  border-style: solid;
  border-color: #AFB0B9;
  border-radius: 0.6rem;
  font-size: 1.5rem;
}

.custom-select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  font-weight: 300;
  color: #4A4C53;
  height: 60px;
  background: #FFFFFF;
  cursor: pointer;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: #AFB0B9;
  border-radius: 0.6rem;
}
.custom-select__trigger span {
  white-space: nowrap;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-options {
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #AFB0B9;
  border-top: 0;
  background: #fff;
  transition: all 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 2;
}

.custom-select.open .custom-options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}
.custom-select.open .date-arrow::before {
  left: -1px;
  transform: rotate(-45deg);
}
.custom-select.open .date-arrow::after {
  left: 5px;
  transform: rotate(45deg);
}

.custom-option {
  position: relative;
  display: block;
  padding: 0 22px 0 22px;
  font-weight: 300;
  color: #4A4C53;
  line-height: 40px;
  cursor: pointer;
  transition: all 0.5s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.custom-option:hover {
  cursor: pointer;
  background-color: #B2B2B2;
}
.custom-option.selected {
  color: #FFFFFF;
  background-color: rgba(251, 143, 29, 0.85);
}

.date-arrow {
  position: relative;
  height: 10px;
  width: 10px;
}
.date-arrow::before, .date-arrow::after {
  content: "";
  position: absolute;
  bottom: 0px;
  width: 0.15rem;
  height: 100%;
  transition: all 0.5s;
}
.date-arrow::before {
  left: -1px;
  transform: rotate(45deg);
  background-color: #4A4C53;
}
.date-arrow::after {
  left: 5px;
  transform: rotate(-45deg);
  background-color: #4A4C53;
}

/*
 https://github.com/TylerPottsDev/custom-date-picker
 */
.date-picker {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #FFFFFF;
  border: 1px solid #AFB0B9;
  border-radius: 0.6rem;
  cursor: pointer;
  user-select: none;
  font-family: "Saira", Arial, Helvetica, sans-serif;
}
.date-picker:hover {
  background-color: #F3F3F3;
}

.selected-date {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4A4C53;
  font-size: 1.5rem;
}

.dates {
  display: none;
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  right: 0;
  background-color: #FFFFFF;
}
.dates.active {
  display: block;
}
.dates .arrows {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4A4C53;
  font-size: 20px;
}
.dates .arrows:hover {
  background-color: #F3F3F3;
}
.dates .arrows:active {
  background-color: #fb8f1d;
  color: #FFFFFF;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #EEEEEE;
}
.month .mth {
  font-size: 1.2rem;
}

.days {
  border-color: #EEEEEE;
  border-width: 1px;
  border-style: solid;
  border-top: none;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 200px;
}
.days .day {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4A4C53;
  font-size: 1.5rem;
}
.days .day.selected {
  background-color: #fb8f1d;
  color: #FFFFFF;
}

/* Header */
header {
  margin-top: 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav.open .nav-right {
  transform: translateX(0);
}

.nav-logo {
  width: 28rem;
  height: 4rem;
  min-height: 4rem;
  min-width: 4rem;
}

.nav-right {
  display: flex;
}

.nav-menu {
  display: flex;
}

.nav-item {
  padding: 1.5rem 2rem;
}

.nav-link {
  font-size: 1.6rem;
  font-family: "Inter", sans-serif;
  font-weight: 300;
  color: #B8BECD;
  transition: all 0.3s ease-in-out;
  width: 80%;
  max-width: 100%;
}
.nav-link.active {
  color: #202336;
  font-weight: 500;
}
.nav-link:hover {
  color: #fb8f1d;
}

.nav-form {
  display: flex;
  align-items: center;
  grid-gap: 1.5rem;
}

.btn-login {
  border: 1px solid #fb8f1d;
  color: #fb8f1d;
}

.btn-register {
  background-color: #fb8f1d;
  color: #FFFFFF;
}

.hamburger-menu-wrap {
  position: absolute;
  top: 3rem;
  right: 2rem;
  cursor: pointer;
  z-index: 1;
  display: none;
}

.hamburger-menu {
  width: 2rem;
  height: 2rem;
  display: flex;
  grid-row-gap: 0.2rem;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
}

.hamburger-menu .line {
  background-color: #202336;
  height: 0.3rem;
  width: 100%;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

.nav-close-icon {
  position: relative;
  padding: 3rem 2rem;
  height: 2.5rem;
  cursor: pointer;
  display: none;
}
.nav-close-icon:before, .nav-close-icon:after {
  position: absolute;
  content: "";
  width: 4px;
  right: 4rem;
  height: 40%;
  background-color: #202336;
}
.nav-close-icon:before {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg) translate(0.5rem, -1rem);
}
.nav-close-icon:after {
  -webkit-transform: rotateZ(-45deg);
  transform: rotateZ(-45deg) translate(1rem, 0.5rem);
}

/* Hero */
.hero {
  padding-top: 5rem;

}

.hero-content {
  display: flex;
  align-items: center;
}

.hero-form {
  flex: 1 1 50%;
  padding-right: 3rem;
}

.hero-title {
  font-size: 6.4rem;
  font-family: 'bukra-reg',sans-serif;;
  color: #202336;
}

.text{
  font-size: 3.4rem;
  font-family: 'bukra-bold',sans-serif;;
  color: #03649f;
}

.hero-subtitle {
  margin-top: 3rem;
  color: #03649f;
  font-size: 2.2rem;
  font-weight: 600;
  font-family: 'bukra-reg',sans-serif;
  margin-bottom: 6.4rem;
  position: relative;
  text-shadow: 0px 0px 2px #03649f;
}
.hero-subtitle:after {
  position: absolute;
  content: "";
  bottom: -2.4rem;
  left: 0;
  height: 0.2rem;
  width: 3.2rem;
  background-color: #202336;
}

.form-groups {
  display: flex;
  grid-gap: 1.5rem;
  flex-wrap: wrap;
}

.form-control {
  flex: 1 1 calc(50% - 1.5rem);
  margin-bottom: 10%; 
}

.btn-explore {
  margin-top: 3rem;
  padding: 1.5rem 6rem;
  background-color: #03649F;
  color: #FFFFFF;
  cursor: pointer;
}

.hero-img {
  flex: 1 1 50%;
}

/* Explore */
.section-content {
  display: flex;
  align-items: center;
}

.section-img, .section-text {
  flex: 1 1 50%;
}

.section-text {
  padding: 0 3rem;
}
.section-text .btn {
  padding: 1.5rem 3rem;
  max-width: 20rem;
}

.section-title {
  font-size: 3.6rem;
  font-family: 'bukra-bold',sans-serif;
  color: #03649f;
  text-align: right;
}

.p-description {
  color: #024873;
  font-size: 1.5rem;
  font-weight: 300;
  font-family: 'bukra-reg',sans-serif;
  margin: 2rem 0;
  text-align: right;
  line-height: 1.8;
  
}

@media screen and (max-width: 768px) {
  .p-description {
    text-align: justify;
  }
}

/* Features Destinations */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
}

.section-head-title {
  color: #000000;
  font-size: 3.6rem;
  font-family: "Playfair Display", serif;
}

.view-all, .read-more {
  color: #fb8f1d;
  font-size: 1.7rem;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  transition: 0.2s;
}

.view-all {
  width: 10rem;
}
.view-all span {
  transition: all 0.3s ease-in-out;
}
.view-all:hover span {
  width: 2rem;
  padding-left: 0.5rem;
}

.read-more:hover {
  border-bottom: 1px solid #fb8f1d;
}

.features-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 1.5rem;
}

.feature-card {
  flex: 0 1 calc(25% - 1.5rem);
  min-width: 20rem;
  cursor: pointer;
  position: relative;
}
.feature-card img {
  border-radius: 1rem;
}

.feature-card-desc {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #FFFFFF;
  border-top-right-radius: 0.6rem;
  padding: 1.5rem 1.5rem 0 0;
}

.location {
  display: block;
  font-size: 1.7rem;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: #042521;
}

.country {
  display: block;
  font-size: 1.5rem;
  font-family: "Inter", sans-serif;
  color: #80918E;
  font-weight: 400;
}

/* Testimonials */
.testimonials-content {
  position: relative;
}

.testimonial-list {
  display: flex;
  margin-top: 2rem;
  overflow: hidden;
}

.testimonial-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.testimonial-item.active {
  transition: 1s all;
}

.testimonial-text {
  flex: 1 1 60%;
}

.rating {
  display: flex;
  grid-gap: 1rem;
}
.rating img {
  width: 2.4rem;
  height: 2.5rem;
}

.testimonial-description {
  font-size: 2.4rem;
  font-family: "Mulish", sans-serif;
  font-weight: 400;
  color: #000000;
  width: 80%;
  margin: 2rem 0 3rem;
}

.author-name {
  font-size: 2.2rem;
  font-family: "Inter", sans-serif;
  color: #000000;
  font-weight: bold;
}

.author-position {
  display: block;
  margin-top: 0.5rem;
  font-size: 1.8rem;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  color: #000000;
}

.testimonial-img {
  flex: 1 1 40%;
  text-align: right;
}
.testimonial-img img {
  border-radius: 1rem;
  width: auto;
  max-height: 38rem;
}

.direction {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #FFFFFF;
  border-top-left-radius: 0.6rem;
  display: flex;
  grid-gap: 2rem;
  padding: 1rem;
}
.direction .arrow {
  border: 2px solid #000000;
  color: #000000;
  border-radius: 50%;
  outline: none;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}
.direction .arrow.passive {
  cursor: default;
  border-color: #D7D7D7;
  color: #D7D7D7;
}
.direction .arrow:not(.passive):hover {
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

/* Trending Stories */
.stories {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 3rem 1.5rem;
  justify-content: center;
}

.story {
  flex: 0 1 calc(25% - 1.5rem);
  min-width: 20rem;
  cursor: pointer;
}

.story-img {
  min-height: 20rem;
  max-height: 20rem;
}

.story-title {
  margin-top: 1rem;
  font-family: "Inter", sans-serif;
  font-size: 1.7rem;
  font-weight: 600;
  color: #000000;
}

.story-desc {
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #7D7987;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 1rem 0 2rem;
}

.read-more {
  font-size: 1.5rem;
}

/* Footer */
.footer {
  background-color: #F9F9FB;
  padding: 5rem 0 2rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  grid-row-gap: 3rem;
}

.footer-text {
  flex: 1 1 40%;
  padding: 0 2rem;
}

.footer-icon {
  width: 4rem;
  height: 4rem;
}

.footer-desc {
  font-size: 1.8rem;
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  color: #848484;
  margin: 3rem 0 6rem;
}

.copyright {
  font-family: "Mulish", sans-serif;
  color: #848484;
  font-size: 1.6rem;
  font-weight: 200;
}

.nav-footer {
  flex: 1 1 60%;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 3rem 1.5rem;
  justify-content: space-between;
}

.nav-footer-title {
  font-size: 1.9rem;
  font-family: "Mulish", sans-serif;
  font-weight: bold;
  color: #000000;
}

.nav-footer-item {
  padding: 0.75rem 1rem 0.75rem 0;
}

.nav-footer-links {
  margin-top: 1.5rem;
}

.nav-footer-link {
  font-size: 1.8rem;
  font-family: "Mulish", sans-serif;
  font-weight: 200;
  color: #848484;
  display: block;
}
.nav-footer-link:hover {
  color: #fb8f1d;
}

.social-media {
  flex-basis: 100%;
  display: flex;
  grid-gap: 2rem;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #C4C4C4;
  margin-top: 2rem;
  padding-top: 2rem;
}

.social-link {
  cursor: pointer;
}
.social-link img {
  width: auto;
  max-height: 2.5rem;
}

/*Back to Top Arrow*/
.arrow-up {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  background-color: #fb8f1d;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  font-size: 3.6rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.arrow-up i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  font-weight: bold;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.75);
}
.arrow-up:hover {
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

@media screen and (max-width: 1000px) {
  .hamburger-menu-wrap, .nav-close-icon {
    display: block;
  }

  .nav-right {
    position: fixed;
    top: 0;
    right: 0;
    width: 30rem;
    height: 100vh;
    background-color: #F9F9FB;
    z-index: 2;
    flex-direction: column;
    transform: translateX(40rem);
    transition: transform 0.3s ease-in-out;
  }

  .nav-menu {
    flex-direction: column;
  }

  .nav-link {
    color: #848484;
  }

  .nav-form {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
  }
  .nav-form .btn {
    width: 15rem;
  }
}
@media screen and (max-width: 900px) {
  /* Features */
  .feature-card, .story {
    min-width: 30rem;
  }

  /*Footer*/
  .nav-footer {
    order: 1;
  }

  .footer-text {
    flex-basis: 100%;
    order: 2;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }

  .footer-desc {
    padding: 0 2rem;
    margin: 0;
    width: calc(100% - 4rem);
  }

  .copyright {
    margin-top: 3rem;
    flex-basis: 100%;
    text-align: center;
  }

  .social-media {
    order: 3;
  }
}
@media screen and (max-width: 768px) {
  /*Hero */
  .hero-content {
    flex-direction: column;
    align-items: initial;
  }

  .hero-form {
    flex-basis: 100%;
    padding: 0;
  }
  .hero-form .btn {
    margin: 3rem auto 0 auto;
  }

  .hero-title {
    font-size: 4.8rem;
    text-align: center;
  }

  .hero-subtitle {
    text-align: center;
  }
  .hero-subtitle:after {
    left: 50%;
    transform: translateX(-50%);
  }

  .hero-img {
    display: block;
  }

  .selected-date {
    justify-content: initial;
    padding-left: 2rem;
  }

  .form-control {
    min-width: 20rem;
    margin-bottom: 10%; 
  }

  /* Explore  */
  .section-content {
    flex-direction: column;
    align-items: initial;
  }

  .section-text, .section-img {
    flex: initial;
  }

  .section-text {
    order: 1;
    text-align: right;
  }
  .section-text .btn {
    margin: 3rem auto 0;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .section-img {
    order: 2;
    width: 70%;
    margin: 3rem auto 0;
  }
}
@media screen and (max-width: 700px) {
  /* Features */
  .feature-card, .story {
    flex-basis: calc(50% - 1.5rem);
    min-width: 20rem;
  }

  .section-header {
    flex-direction: column;
  }

  .section-head-title {
    font-size: 3rem;
  }

  .view-all {
    text-align: center;
    margin-top: 1rem;
  }

  /*Testimonials */
  .testimonial-description {
    font-size: 2rem;
  }

  .author-name {
    font-size: 1.8rem;
  }

  .author-position {
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 500px) {
  /*Hero */
  .hero-title {
    font-size: 4rem;
  }
}
@media screen and (max-width: 450px) {
  /* Features */
  .feature-card, .story {
    flex-basis: 80%;
  }
}

#myHome{
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>