<template>
  <div id="app">
    <header class="grid">
      <div class="grid-half">
        <ul class="nav-menu left">
            <li><router-link :to="'/'">DeployMe</router-link></li>
            <li><router-link :to="'/deploy'">Services</router-link></li>
            <li><router-link :to="'/'">About Us</router-link></li>
        </ul>
        <ul class="nav-menu right">
          <li><router-link :to="'/login'" class="user-button">Log In</router-link></li>
          <li><router-link :to="'signup/'" class="user-button">Sign Up</router-link></li>
        </ul>
      </div>
    </header>   
    <main>
      <router-view/>
    </main>
    <footer class="grid">
      <div class="grid-half">
        <ul class="nav-menu left">
            <li><p>Facebook</p></li>
            <li><p>Twitter</p></li>
            <li><p>Github</p></li>
        </ul>
        <ul class="nav-menu right">
          <li><p>Log In</p></li>
          <li><p>Sign Up</p></li>
        </ul>
      </div>
    </footer>
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
  color: #fff;
}
#app {
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  height: 1fr;
}

p {
  color: #fff;
}

header, footer {
    height: 1fr;
    background-color: #0c5170; 
    border-bottom: solid 2px;
    border-bottom-color: #2c3e50;
}

ul {
    list-style: none;
}

a {
  text-decoration: none;
}
.grid {
    display: grid;
    grid-template-columns: minmax(1em, 1fr) minmax(0, 1170px) minmax(1em, 1fr);
}

.grid-half {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column: 2/3
}

.nav-menu {
    display: flex;
    align-items: center;
    justify-content: center; 
}


.nav-menu  ul {
  display: flex;
  align-items: center;
  justify-content: stretch; 
  padding: 0;
}

.right {
  justify-content: flex-end
}

.left {
  justify-content: flex-start;
}

.nav-menu li {
    margin-right: 40px;
}

.nav-menu a {
    color: #fff;
}

.nav-menu a:hover {
    color: rgb(226, 111, 3);
    transition-duration: 250ms;
    border-color   : rgb(226, 111, 3);
}

.user-button {
  border: solid #fff 1px;
  border-radius: 2px;
  padding: 5px;
}


</style>
