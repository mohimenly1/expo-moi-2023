<template lang="">
<div>
    <div class='container'>
 <div class='row'>
  <div class='content'>
   <h1>404</h1>
   <h2>Oops, the page you're looking for does not exist.</h2>
   <p>
    You may want to head back to the <a href="#">homepage</a>.
   </p>
  </div>
 </div>
</div>
</div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    

    html, body {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
	color: #4a4a4a;
}

.content {
  font-family: 'Avenir-Next', Avenir, Helvetica, sans-serif;
  background-color: none;
  z-index: 2;
  position: absolute;
  top: 50%;
	left: 0;
	right: 0;
	text-align: center;
  transform: translateY(-50%);
	padding: 0 10px;
}

h1 {
  font-size: 160px;
  margin-bottom: 0;
  margin-top: 0;
}

h2 {
  margin-top: 0;
  font-size: 30px;
}

p {
  padding-bottom: 32px;
}

@media only screen and (max-width: 480px) {
  h1 {
    font-size: 120px;
  }
  ;
}
</style>