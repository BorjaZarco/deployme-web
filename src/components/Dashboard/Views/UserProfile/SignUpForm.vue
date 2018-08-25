<template>
  <card>
    <h4 slot="header" class="justify-content-center">Iniciar Sesión</h4>
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
                    v-model="password">
          </fg-input>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-10">
          <fg-input type="password"
                    label="Repite Contraseña"
                    placeholder=""
                    v-model="doubleP">
          </fg-input>
        </div>
      </div>

      <div class="row justify-content-center" v-if="badPassword">
        <p class="text-danger">Las contraseñas no coinciden</p>
      </div>      

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-center" @click.prevent="updateProfile">
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
        doubleP:"",
        email: "",
        badPassword: false
      }
    },
    methods: {
      signup () {
        if (this.badPassword || !this.username || !this.password || !this.email) {
          this.notifyVue('warning', 'Rellena todos los campos')
        } else {
          post('http://localhost:5000/api/users', { username: this.username, password: this.password, email: this.email })
          .then (res => {
            router.push('login');
          })
          .catch ( error => {
            this.notifyVue('error', 'Usuario ya registrado')
          })      
        }
      },
      checkPassword() {
        console.log('a');
        return this.badPassword = this.password !== this.doubleP
      },
      notifyVue (type, message) {
        const notification = {
          template: `<span>${message}</span>`
        }

        this.$notifications.notify(
          {
            component: notification,
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: type
          })
      }
    },
    watch: {
      password: this.checkPassword,
      doubleP: this.checkPassword
    }
}
</script>
<style>
</style>
