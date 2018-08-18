<template>
    <div class="login">
        <div class="login login-box">
            <h1>Log In</h1>
            <input @keypress.enter="login" type="text" v-model="username" placeholder="Usuario">
            <input @keypress.enter="login" type="password" v-model="password" placeholder="Constraseña">
            <button class="login-button" @click="login">Log in</button>
        </div>
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

<style scoped>

.login {
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

.login-box {
    background-color: #fff;
    height: 350px;
    padding: 50px;
    border-radius: 50px;
    box-shadow: 10px 10px 5px #062b3b;
}

.login-button {
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