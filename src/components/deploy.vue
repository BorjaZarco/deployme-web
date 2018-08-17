<template>
    <div class="deploy">
        <h1>Desplega tu pagina desde GitHub</h1>
        <input type="text"  v-model="url.namefront" placeholder="Front Repositorio Github">
        <input type="text"  v-model="url.nameback" placeholder="Back Repositorio Github">
        <button v-on:click="deploy()">Desplegar</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Deploy',
    data(){
        return {
            url:{}
        }
    },
    methods: {
        deploy(){
            axios.post(`http://localhost:4000/api/`,this.url).then((res)=>{
                console.log("Respuesta desde el Vue->ok");
            })
        }

    }
}
</script>

<style>

</style>