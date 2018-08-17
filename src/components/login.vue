<template>
    <div class="login">
        <h1>Log In</h1>
        <input @keypress.enter="login" type="text" v-model="username" placeholder="Usuario">
        <input @keypress.enter="login" type="password" v-model="password" placeholder="Constraseña">
        <button @click="login">Log in</button>
    </div>
</template>


<script>
import { post } from 'axios';

export default  {
    name: 'login',
    data () {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login () {
            post('http://localhost:5000/api/login', {username: this.username, password: this.password})
            .then (res => {
                console.log(res);
            })
            .catch ( error => {
                console.log(error)
            })
        }
    }
}
</script>
<style>
</style>