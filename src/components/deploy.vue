<template>
    <div class="deploy">
        <div class="deploy deploy-box">
            <h1>Despliega tu página en un click</h1>
            <p>Introduce tu Repo de Github</p>
            <input type="text"  v-model="url.urlfront" placeholder="Front Repositorio Github">
            <button class="deploy-button" @click="deploy">Deploy</button>
        </div>
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
            axios.post(`http://localhost:4000/api/deploy-front`,this.url)
            .then((res)=>{
                console.log("Respuesta desde el Vue->ok");
            })
        }

    }
}
</script>


<style scoped>

.deploy p {
    color: #062b3b;
}

.deploy {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 1fr;
    background-color: #0c5170;
    padding: 50px 0;
}

input {
    margin: 10px;
    height: 20px;
    width: 300px;
    border: solid #062b3b 1px;
    border-radius: 20px;
    padding: 10px;
}

.deploy-box {
    background-color: #fff;
    height: 350px;
    padding: 50px;
    border-radius: 50px;
    box-shadow: 10px 10px 5px #062b3b;
}

.deploy-button {
    color: #fff;
    height: 45px;
    width: 175px;
    border-radius: 50px;
    background-color: #062b3b;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
}
</style>