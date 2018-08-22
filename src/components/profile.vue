<template>
  <div class="profile">                                                                                                                                                                                                                                                              
    <div class="profile profile-box">
        <h1>Instancias levantadas</h1>
        <ul>
            <li v-for="instance in instances">
                {{instance.name}} {{instance.type}}<button>Terminar</button>
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
  }
}
</script>

<style scoped>

</style>

