<template>
  <card>
    <h4 slot="header" class="card-title">Levanta tu Página!</h4>
    <form>
      <p>Introduce tu repositorio de GitHub donde tengas la página</p>
      <div class="row">
        <div class="col-md-12">
          <fg-input type="text"
                    label="Front"
                    placeholder="Url github"
                    v-model="url.urlfront">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="deploy">
          Launch!
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'

  export default {
    components: {
      Card
    },
    data(){
        return {
            url:{},
        }
    },
    methods: {
        deploy(){
          this.showNotification('Information:','Desplegando... Esto suele tardar unos 3 minutos aproximadamente. Espere por favor.', 180)
          axios.post(`http://localhost:4000/api/deploy-front`,this.url)
          .then((res)=>{
            this.hideNotifications();
            this.showNotification('Information:','Su proyecto ha sido desplegado!', 5)
            this.saveInstanceInDb(res.data);
          }).catch(error => {
            console.log(error);
          })
        },
        saveInstanceInDb(instanceData){
          const thisRouter = this.$router;
          const config = {
            headers: {
              authorization: localStorage.token
            }
          }
          
          const data = {
            ec2 : instanceData
          }
          axios.post(`http://localhost:5000/api/users/add-instance/${localStorage.username}`, data ).then( response => {
            thisRouter.push('my-projects');
          }).catch(err => {
            console.log("error al guardar la instancia: ", err);
          })
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

    }
  }

</script>
<style>

</style>
