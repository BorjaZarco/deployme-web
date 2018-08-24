<template>
  <div class="profile">                                                                                                                                                                                                                                                              
    <div class="profile profile-box">
        <h1>Instancias levantadas</h1>
        <ul>
            <li v-for="instance in instances">
                {{instance.name}} {{instance.type}}<button @click="terminate">Terminar</button>
            </li>
        </ul>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'profile',
  data () {
    return {
        instances:{}
    }
  },
  created(){
      axios.get(`http://localhost:5000/api/services`).then((res)=>{
          this.instances=res.data;
      })
  },
  methods:{
      terminate(){
          axios.delete(`http://localhost:5000/api/services/${this.instances.id}`).then(res=>{
              console.log("Terminando instancia...");
          });
          axios.delete(`http://localhost:4000/api/${this.instances.id}`).then(res=>{
              console.log("Instacia terminada");
          })
      }
  }
}
</script>

<style scoped>

</style>

