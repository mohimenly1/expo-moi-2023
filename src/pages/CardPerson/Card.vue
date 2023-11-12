<template>
<div class="card-controller">
    <main class="ticket-system">
   <div class="top">
    <h1 class="text"></h1>
            
   <div class="printer" />
   </div>
   <div class="receipts-wrapper">
      <div class="receipts">
         <div class="receipt">
            <img  src="../../assets/svg/logo.svg" alt="">
   
            <div class="route">
               <h2 class="visit-card">زائـر</h2>
               <img class="plane-icon" src="../../assets/svg/avatar.svg" alt="">
               <h2 class="visit-card">بطاقـة</h2>
            </div>
            <div class="details">
       
               <div class="item">
                  <h1>الإســم</h1>
                  <h3>{{ responseData.data.name }}</h3>
               </div>

            </div>
         </div>
         <div class="receipt qr-code">
            <qr-code style="width:100px; height: 100px;" :text="generateQRCodeValue()"></qr-code>
            <div class="description">
               <h2 >Show QR-code</h2>
              
            </div>
         </div>
      </div>
   </div>
</main>
</div>
  </template>
  
  <script>
  export default {
    name: 'cardPerson',
    data() {
      return {
        responseData: {},
      };
    },
    methods: {
      generateQRCodeValue() {
        // Generate a formatted string representation of the visitor information
        const formattedVisitorInfo = this.formatVisitorInfo();
        
        // You can customize this value based on your specific requirements
        return formattedVisitorInfo;
      },
      formatVisitorInfo() {
        // Replace property names with custom labels
        const formattedInfo = {
          'الإسم': this.responseData.data.name,
          'رقم الهاتف': this.responseData.data.phoneNumber,
          'المدينة': this.responseData.data.city,
          'الجنسية': this.responseData.data.nationality_id,
        };
  
        // Convert the formatted info to a string
        return JSON.stringify(formattedInfo, null, 2);
      },
    },
    mounted() {

      // Fetch response data from the route params
      this.responseData = this.$route.params.responseData;
    },

    beforeMount(){
      document.addEventListener('DOMContentLoaded', function () {
      var message = {
        message: [
          '👋 مرحباً بك',
          'Expo 2023 For Tech',
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
  }
  }
  </script>
  <style scoped>
  @font-face {
  font-family: 'bukra-reg';
  src: url('../../assets/fonts/otf/29ltbukraregular.otf');

}
    .visit-card{
        font-family: 'bukra-reg',sans-serif;
        color:#03649f;
    }
.card-controller{
    font-family: 'Ubuntu', sans-serif;
    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  display: flex;
  justify-content: center;
}
  .ticket-system {
  max-width: 385px;
}
.ticket-system .top {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.ticket-system .top .title {
  font-weight: normal;
  font-size: 1.6em;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 50px;
  color: #fff;
}
.ticket-system .top .printer {
  width: 90%;
  height: 20px;
  border: 5px solid #fff;
  border-radius: 10px;
  box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.2);
}
.ticket-system .receipts-wrapper {
  overflow: hidden;
  margin-top: -10px;
  padding-bottom: 10px;
}
.ticket-system .receipts {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  transform: translateY(-510px);
  animation-duration: 2.5s;
  animation-delay: 500ms;
  animation-name: print;
  animation-fill-mode: forwards;
}
.ticket-system .receipts .receipt {
  padding: 25px 30px;
  text-align: left;
  min-height: 200px;
  width: 88%;
  background-color: #fff;
  border-radius: 10px 10px 20px 20px;
  box-shadow: 1px 3px 8px 3px rgba(0, 0, 0, 0.2);
}
.ticket-system .receipts .receipt .airliner-logo {
  max-width: 80px;
}
.ticket-system .receipts .receipt .route {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
}
.ticket-system .receipts .receipt .route .plane-icon {
  width: 30px;
  height: 30px;
  color: #03649f;
}
.ticket-system .receipts .receipt .route h2 {
  font-weight: 300;
  font-size: 2.2em;
  margin: 0;
}
.ticket-system .receipts .receipt .details {
  display: flex;
  justify-content: center;

}
@font-face {
  font-family: 'bukra-bold';
  src: url('../../assets/fonts/otf/29ltbukrabold.otf');

}
.ticket-system .receipts .receipt .details .item {
  display: flex;
  flex-direction: column;
  min-width: 70px;
}
.ticket-system .receipts .receipt .details .item h1 {
  font-size: 1.8em;
  color: #03649f;
  font-family: 'bukra-bold';
  text-align: center;
}
.ticket-system .receipts .receipt .details .item h3 {
  margin-top: 10px;
  margin-bottom: 25px;
  text-align: center;
  color: #03649f;
  font-family: 'bukra-reg';
}
.ticket-system .receipts .receipt.qr-code {
  height: 110px;
  min-height: unset;
  position: relative;
  border-radius: 20px 20px 10px 10px;
  display: flex;
  align-items: center;
}
.ticket-system .receipts .receipt.qr-code::before {
  content: "";
  background: linear-gradient(to right, #fff 50%, #02466f 50%);
  background-size: 22px 4px, 100% 4px;
  height: 4px;
  width: 90%;
  display: block;
  left: 0;
  right: 0;
  top: -1px;
  position: absolute;
  margin: auto;
}
.ticket-system .receipts .receipt.qr-code .qr {
  width: 70px;
  height: 70px;
}
.ticket-system .receipts .receipt.qr-code .description {
  margin-left: 20px;
}
.ticket-system .receipts .receipt.qr-code .description h2 {
  margin: 0 0 5px 0;
  font-weight: 500;
}
.ticket-system .receipts .receipt.qr-code .description p {
  margin: 0;
  font-weight: 400;
}

@keyframes print {
  0% {
    transform: translateY(-510px);
  }
  35% {
    transform: translateY(-395px);
  }
  70% {
    transform: translateY(-140px);
  }
  100% {
    transform: translateY(0);
  }
}

  </style>