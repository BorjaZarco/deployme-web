<template>
  <card>
    <h4 slot="header" class="justify-content-center">Registrate!</h4>
    <form class="justify-content-center">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <fg-input type="text"
                    label="Username"
                    placeholder=""
                    v-model="username">
          </fg-input>
        </div>
      </div>
      
      <div class="row justify-content-center">
        <div class="col-md-10">
          <fg-input type="text"
                    label="Email"
                    placeholder=""
                    v-model="email">
          </fg-input>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-10">
          <fg-input type="password"
                    label="Contraseña"
                    placeholder=""
                    v-model="password"
                    @input="updatePassword">
          </fg-input>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-10">
          <fg-input type="password"
                    label="Repite Contraseña"
                    placeholder=""
                    v-model="doubleP"
                    @input="updateDoubleP">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <p>Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
      </div>

      <div class="row justify-content-center" v-if="badPassword">
        <p class="text-danger">Las contraseñas no coinciden</p>
      </div>      

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-center" @click="signup">
          Sign Up
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import { post } from 'axios';
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {
        username: "",
        password: "",
        doubleP: "",
        email: "",
        badPassword: false
      }
    },
    methods: {
      signup () {
        if (this.badPassword || !this.username || !this.password || !this.email) {
          this.showNotification('Information:','Rellena todos los campos', 5)
        } else {
          post('http://localhost:5000/api/users', { username: this.username, password: this.password, email: this.email })
          .then (res => {
            this.$router.push('login'); 
          })
          .catch ( error => {
            this.showNotification('Information:','Usuario ya registrado', 5)
          })      
        }
      },
      updateDoubleP (newDP) {
        this.doubleP = newDP;
      },
      updatePassword (newP) {
        this.password = newP;
      },
      checkPassword() {
        return this.badPassword = password !== this.doubleP
      },
      showNotification(title, body, duration){
        this.$notify({
            group: 'notification-group',
            title: title,
            text: body,
            duration: duration * 1000
        });
      },
      hideNotifications(){
          this.$notify({
              group: 'notification-group',
              clean: true
          })
      },
    },
    watch: {
      password: function () {
        this.badPassword = this.password !== this.doubleP; 
      },
      doubleP: function () {
        this.badPassword = this.password !== this.doubleP;
      }
    }
}
</script>
<style>
</style>
