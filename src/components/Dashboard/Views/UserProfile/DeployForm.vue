<template>
  <card>
    <h4 slot="header" class="card-title">Levanta tu Página!</h4>
    <form>
      <p>Introduce tu repositorio de GitHub donde tengas tu proyecto</p>
      <div class="row">
        <div class="col-md-12">
          <template v-if="mostrarDisable">
            <fg-input type="text"
                    label="Front"
                    disabled=""
                    placeholder="Url github"
                    v-model="clientProject.urlfront">
            </fg-input>
          </template>
          <template v-if="mostrarFront">
            <fg-input type="text"
                    label="Front"
                    placeholder="Home Address"
                    v-model="clientProject.urlfront">
            </fg-input>
          </template>
          <template v-if="mostrarBack">
            <fg-input type="text"
                    label="Back"
                    placeholder="Back Address"
                    v-model="clientProject.urlback">
            </fg-input>
          </template>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="deploy">
          Launch!
        </button>
      </div>
      <div class="clearfix"></div>
      <div class="radioFront">
        <ul class="lista" @click="EnableFront">
            <li><input type="radio" name="radio" value="estatica" v-model="clientProject.technology">Web estatica</input></li>
          </ul>
      </div>
      <div class="radioBack">
         <ul class="lista" @click="EnableBack">
            <li><input type="radio" name="radio" value="php" v-model="clientProject.technology">Php</input></li>
            <li><input type="radio" name="radio" value="node" v-model="clientProject.technology">Node</input></li>
           </ul>
      </div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import PRadio from 'src/components/UIComponents/Inputs/Radio.vue'
  import axios from 'axios'

  export default {
    
    components: {
      Card,
      PRadio
    },
    data(){
        return {
            clientProject:{},
            mostrarFront:false,
            mostrarBack:false,
            mostrarDisable:true
        }
    },
    methods: {
        deploy(){
          this.showNotification('Information:','Desplegando... Esto suele tardar unos 3 minutos aproximadamente. Espere por favor.', 180)
          if(this.mostrarFront){
            axios.post(`http://localhost:4000/api/deploy-front`,this.clientProject)
            .then((res)=>{
              this.hideNotifications();
              this.showNotification('Information:','Su proyecto ha sido desplegado!', 5)
              this.saveInstanceInDb(res.data);
            }).catch(error => {
              console.log(error);
            })
          }else{
            axios.post(`http://localhost:4000/api/deploy-back`,this.clientProject)
            .then((res)=>{
              this.hideNotifications();
              this.showNotification('Information:','Su proyecto ha sido desplegado!', 5)
              this.saveInstanceInDb(res.data);
            }).catch(error => {
              console.log(error);
            })
          }
            
        },
        EnableFront(){
          this.mostrarDisable=false;
          this.mostrarBack=false;
          this.mostrarFront=true
         
        },
        EnableBack(){
          this.mostrarDisable=false;
          this.mostrarFront=false;
          this.mostrarBack=true;
         
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
.lista{
  list-style: none;
}
.radioFront{
  width: 50%;
  float: left;
}
.radioBack{
  width: 50%;
  float: right;
}
</style>
