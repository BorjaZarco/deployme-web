<template>
  <card>
    <h4 slot="header" class="text-center">Iniciar Sesión</h4>
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
          <fg-input type="password"
                    label="Contraseña"
                    placeholder=""
                    v-model="password">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <p>No tienes cuenta aún? <router-link to="/signup">Registrate aquí</router-link></p>
        
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-center" @click="login()">
          Log In
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
            token: ""
        }
    },
    methods: {
        login () {
          if (!this.username || !this.password) {
            this.notifyVue('warning', 'Comprueba que todos los campos sean correctos')
          } else {
            post('http://localhost:5000/api/login', {username: this.username, password: this.password})
            .then (res => {
              localStorage.token = res.data;
              localStorage.username = this.username;
              this.$router.push('home'); 
            })
            .catch ( error => {
              (error.response.status === 400)
              ? this.notifyVue('danger', 'Introduce un usuario y contraseña válidos')
              : this.notifyVue('info', 'Se ha producido un error interno, intentalo de nuevo mas tarde') 
            })
          }
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
    }
}
</script>
<style>
</style>
