<template>
  <ul class="nav nav-mobile-menu">

    <li class="nav-item">
      <router-link v-if="userIsLogged" to="/login" class="nav-link">
        <span class="no-icon">Log In</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link v-if="userIsLogged" to="/signup" class="nav-link">
        <span class="no-icon">Sign Up</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link v-if="!userIsLogged" to="/home" class="btn btn-danger btn-fill float-center" @click="logout">
        <span class="no-icon">Log out</span>
      </router-link>
    </li> 
  </ul>
</template>
<script>
  import DropDown from 'src/components/UIComponents/Dropdown.vue'

  export default {
    components: {
      DropDown
    }, 
    data () {
      return {
        userIsLogged: true
      }
    }
  }
</script>
<style scoped>
.float-center {
  display: flex;
  justify-content: center;
}
</style>
