<template>
  <div class="app">                                                                                                                                                                                                                                                              
    <div class="feed-main">
        <router-link :to="'/comics/1'">
            <div class="start-button">START EXPLORING</div>
        </router-link>
    </div>  
    
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  font-family: 'Oswald', sans-serif;
}

#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

