<template>
    <div class="signup">
        <div class="signup signup-box">
            <h1>Sign Up</h1>
            <input type="text" v-model="username" placeholder="Usuario">
            <input type="text" v-model="email" placeholder="E-mail">
            <input type="password" v-model="password" placeholder="Constraseña">
            <input @keyup="checkPassword" type="password" v-model="doubleP" placeholder="Repite Constraseña">
            <div class="error" v-if="badPassword">Las conraseñas han de coincidir</div>
            <button class="signup-button" @click="signup">Sign Up</button>
        </div>
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
            doubleP:"",
            email: "",
            badPassword: false,
        }
    },
    methods: {
        signup () {
            if (this.badPassword || !this.username || !this.password || !this.email) {
                alert("Comprueba que todos los campos estén correctos")
            } else {
                post('http://localhost:5000/api/users', { username: this.username, password: this.password, email: this.email })
                .then (res => {
                    console.log('OK');
                })
                .catch ( error => {
                    console.log('NOT OK')
                })
                    
            }
        },
        checkPassword() {
            this.badPassword = this.password !== this.doubleP
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

<style scoped>
.error {
    margin-bottom: 10px;
    color: red;
    font-size: 15px;
}

.signup {
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

.signup-box {
    background-color: #fff;
    height: 350px;
    padding: 50px;
    border-radius: 50px;
    box-shadow: 10px 10px 5px #062b3b;
}

.signup-button {
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