<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link v-if="userIsLogged" to="/login" class="nav-link">
              Log in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="userIsLogged" to="/signup" class="nav-link">
              Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <button v-if="!userIsLogged" to="/signup" class="btn btn-danger btn-fill float-right" @click="logout">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
    },
    data () {
      return {
        activeNotifications: false,
        userIsLogged : null,
      }
    },
    created(){
      this.isLogged();
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      isLogged() {
        localStorage.token !== "" || localStorage.token !== undefined ? this.userIsLogged = true : this.userIsLogged = false; 
      },
      logout() {
        localStorage.token = "";
        this.isLogged();
        this.$router.push('Landing'); 
      }
    }
  }

</script>
<style>

</style>
