<template>
    <div class="deploy">
        <h1>Desplega tu pagina desde GitHub</h1>
        <input type="text"  v-model="urlfront" placeholder="Front Repositorio Github">
        <input type="text"  v-model="urlback" placeholder="Back Repositorio Github">
        <button v-on:click="deploy()">Desplegar</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Deploy',
    data(){
        return {
            urlfront:'',
            urlback:''
        }
    },
    methods: {
        deploy(){
            console.log(this.urlfront);
            axios.post(`http://localhost:4000/${this.urlfront}`).then((res)=>{
                console.log("pepe");
            })
        }

    }
}
</script>

<style>

</style>