<template>
    <div class="signup">
        <h1>Log In</h1>
        <input @keypress.enter="signup" type="text" v-model="username" placeholder="Usuario">
        <input @keypress.enter="signup" type="password" v-model="password" placeholder="Constraseña">
        <input @keypress.enter="signup" type="text" v-model="email" placeholder="E-mail">
        <button @click="signup">Sign Up</button>
    </div>
</template>


<script>
import { post } from 'axios';

export default  {
    name: 'signup',
    data () {
        return {
            username: "",
            password: "",
            email: ""

        }
    },
    methods: {
        signup () {
            post('http://localhost:5000/api/users', { username: this.username, password: this.password, email: this.email })
            .then (res => {
                correctSignUp();
            })
            .catch ( error => {
                badSignUp();
            })
        },

        correctSignUp() {
            signedUp = true;
        },

        badSignUp () {
            notSignedUp = true;        
        }
    }
}
</script>
<style>
</style>