<template>
  <router-view />
</template>
  
  <script>
  console.log("in App")
  export default{
    name: 'App',
  }
  </script>
  
  <style>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #faedcd; /* Set your desired background color */
  font-family: Arial, sans-serif; /* Optional: Set a global font */
}

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 30px;
  }
  </style>