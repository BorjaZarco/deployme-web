<template>
  <div id="app">
    <router-view/>
    <router-link to="/">Home</router-link>
    <router-link to="/deploy">Desplegar</router-link>
    <router-link to="/login">Log in</router-link>
    <router-link to="/signup">Sign Up</router-link>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
}

header {
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: gray;
  color: orange;
}

#app { 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
