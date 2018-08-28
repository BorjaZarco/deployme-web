<template>
  <card>
    <h4 slot="header" class="card-title">Levanta tu Página!</h4>
    <form>
      <p>Introduce tu repositorio de GitHub donde tengas la página</p>
      <div class="row">
        <div class="col-md-12">
          <template v-if="mostrarDisable">
            <fg-input type="text"
                    label="Front"
                    disabled=""
                    placeholder="Home Address"
                    v-model="url.urlfront">
            </fg-input>
          </template>
          <template v-if="mostrarFront">
            <fg-input type="text"
                    label="Front"
                    placeholder="Home Address"
                    v-model="url.urlfront">
            </fg-input>
          </template>
          <template v-if="mostrarBack">
            <fg-input type="text"
                    label="Back"
                    placeholder="Back Address"
                    v-model="url.urlback">
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
            <li><input type="radio" name="radio" value="estatica" v-model="tecnologia">Web estatica</input></li>
          </ul>
      </div>
      <div class="radioBack">
         <ul class="lista" @click="EnableBack">
            <li><input type="radio" name="radio" value="php" v-model="tecnologia">Php</input></li>
            <li><input type="radio" name="radio" value="node" v-model="tecnologia">Node</input></li>
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
            tecnologia:'',
            url:{},
            mostrarFront:false,
            mostrarBack:false,
            mostrarDisable:true
        }
    },
    methods: {
        deploy(){
          if(this.mostrarFront){
              axios.post(`http://localhost:4000/api/deploy-front`,this.url,this.tecnologia)
            .then((res)=>{
                console.log("Desplegando Front...");
            })
          }else{
            axios.post(`http://localhost:4000/api/deploy-back`,this.url,this.tecnologia)
            .then((res)=>{
                console.log("Desplegando Back...");
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
         
        }

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
