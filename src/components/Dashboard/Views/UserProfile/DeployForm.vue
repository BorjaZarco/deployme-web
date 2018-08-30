<template>
  <div>
    <card v-if="!deployInProcess">
      <h4 slot="header" class="card-title">Levanta tu proyecto!</h4>
      <form>
        <p class="bold">Seleccione el tipo de proyecto a desplegar</p>
        <div class="radios-wrapper">
          <div class="radioFront">
            <ul class="lista" @click="EnableFront">
                <li><input type="radio" name="radio" value="estatica" v-model="service">Web estática</li>
                 <!--<li><input type="radio" name="radio" value="webpack" v-model="service">Web con webpack</li>-->
              </ul>
          </div>
          <div class="radioBack">
            <ul class="lista" @click="EnableBack">
                <!--<li><input type="radio" name="radio" value="php" v-model="service">Php</li>-->
                <!--<li><input type="radio" name="radio" value="node" v-model="service">Node</li>-->
              </ul>
          </div>
        </div>

        <p class="text-danger">{{serviceInfo}}</p>

        <p class="bold">Introduce tu repositorio de GitHub donde tengas tu proyecto</p>
        <div class="row">
          <div class="col-md-12">
            <template v-if="mostrarDisable">
              <fg-input type="text"
                      label="Deploy type"
                      disabled=""
                      placeholder="Url github"
                      v-model="url">
              </fg-input>
            </template>
            <template v-if="mostrarFront">
              <fg-input type="text"
                      label="Front"
                      placeholder="Home Address"
                      v-model="url">
              </fg-input>
            </template>
            <template v-if="mostrarBack">
              <fg-input type="text"
                      label="Back"
                      placeholder="Back Address"
                      v-model="clientProject.urlback">
              </fg-input>
            </template>
          </div>
        </div>

        <div class="row justify-content-center" v-if="!validGit">
          <p class="text-danger">Introduce un repo válido</p>
        </div>  

        <div class="text-center">
          <button class="btn btn-info btn-fill float-right button"
                  @click.prevent="deploy"
                  type="submit"
                  :disabled="!validGit">
            Launch!
          </button>
        </div>
        <div class="clearfix"></div>
      </form>
    </card>
    <div class="sk-circle" v-if="deployInProcess">
      <div class="sk-circle1 sk-child"></div>
      <div class="sk-circle2 sk-child"></div>
      <div class="sk-circle3 sk-child"></div>
      <div class="sk-circle4 sk-child"></div>
      <div class="sk-circle5 sk-child"></div>
      <div class="sk-circle6 sk-child"></div>
      <div class="sk-circle7 sk-child"></div>
      <div class="sk-circle8 sk-child"></div>
      <div class="sk-circle9 sk-child"></div>
      <div class="sk-circle10 sk-child"></div>
      <div class="sk-circle11 sk-child"></div>
      <div class="sk-circle12 sk-child"></div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import PRadio from "src/components/UIComponents/Inputs/Radio.vue";
import axios from "axios";

var isGitUrl = require('is-git-url');

const gitRegex = new RegExp("((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)(\.git)(/)?");

const serviceData = {
  estatica: 
  `Para probar la funcionalidad, puede utilizar este proyecto de github: \n https://github.com/sakdev/TheFox.git`,
  webpack: 
  ``,

  php:
  ``,
  node:
  `Especifique el puerto en el que su aplicacion está preparada para escuchar, además en su package.json añada
  en una sección scripts lo siguiente:\n
  "scripts": {
    "start": COMANDO PARA DESPLEGAR SU PROYECTO
  }
  `
}

export default {
  components: {
    Card,
    PRadio
  },
  data() {
    return {
      clientProject: {},
      service: "",
      url: "",
      mostrarFront: false,
      mostrarBack: false,
      mostrarDisable: true,
      serviceInfo: "", 
      deployInProcess: false, 
      validGit: false
    };
  },
  methods: {
    deploy() {
      this.deletePosiblesSpaces();
      if ((this.clientProject.urlfront && this.clientProject.urlfront !== " ") || (this.clientProject.urlback && this.clientProject.urlback !== " ")) {
        this.showNotification(
          "Information:",
          "Desplegando... Esto suele tardar unos 3 minutos aproximadamente. Espere por favor.",
          180
        );
        this.deployInProcess = true;
        if (this.mostrarFront) {
          this.deployFrontProject();
        } else {
          this.deployBackProject();
        }
      } else {
        this.showNotification(
          "Information:",
          "Debe rellenar correctamente el campo de la url del repositorio",
          5
        );
      }
    },
    EnableFront() {
      this.mostrarDisable = false;
      this.mostrarBack = false;
      this.mostrarFront = true;
    },
    EnableBack() {
      this.mostrarDisable = false;
      this.mostrarFront = false;
      this.mostrarBack = true;
    },
    saveInstanceInDb(instanceData) {
      const thisRouter = this.$router;
      const config = {
        headers: {
          authorization: localStorage.token
        }
      };

      const data = {
        ec2: instanceData
      };
      axios.post(`http://localhost:5000/api/users/add-instance/${localStorage.username}`,data)
        .then(response => {
          thisRouter.push("my-projects");
          this.deployInProcess = false;
        })
        .catch(err => {
          this.deployInProcess = false;
          this.showError(
            "Error:",
            "Fallo al guardar la instancia en la base de datos",
            5
          );
          console.log("error al guardar la instancia: ", err);
        });
    },

    showNotification(title, body, duration) {
      this.$notify({
        group: "notification-group",
        title: title,
        text: body,
        duration: duration * 1000
      });
    },

    showError(title, body, duration) {
      this.$notify({
        group: "notification-group",
        title: title,
        text: body,
        type: 'error',
        duration: duration * 1000
      });
    },
    hideNotifications() {
      this.$notify({
        group: "notification-group",
        clean: true
      });
    },
    deployFrontProject() {
      axios.post(`http://34.247.235.142:4000/api/deploy-front`, this.clientProject)
        .then(res => {
          this.hideNotifications();
          this.showNotification(
            "Info:",
            "Su proyecto ha sido desplegado!",
            5
          );
          this.saveInstanceInDb(res.data);
        })
        .catch(error => {
          console.log(error);
          this.deployInProcess = false;
          this.showError(
            "Error:",
            "Fallo al desplegar el proyecto, intentelo de nuevo mas tarde",
            5
          );
        });
    },
    deployBackProject() {
      axios.post(`http://34.247.235.142:4000/api/deploy-back`, this.clientProject)
        .then(res => {
          this.hideNotifications();
          this.showNotification(
            "Info:",
            "Su proyecto ha sido desplegado!",
            5
          );
          this.saveInstanceInDb(res.data);
        })
        .catch(error => {
          console.log(error);
          this.deployInProcess = false;
          this.showError(
            "Error:",
            "Fallo al desplegar el proyecto, intentelo de nuevo mas tarde",
            5
          );
        });
    },
    deletePosiblesSpaces() {
      if (this.clientProject.urlfront)
        this.clientProject.urlfront = this.clientProject.urlfront.replace(/  +/g," ");

      if (this.clientProject.urlback)
        this.clientProject.urlback = this.clientProject.urlback.replace(/  +/g," ");
    }
  },
  watch: {
    service: function () {
      this.serviceInfo = serviceData[this.service];
      this.clientProject.technology = this.service;
    },
    url: function () {
      if (this.mostrarFront) {
        this.validGit = isGitUrl(this.url);
        this.clientProject.urlfront = this.url;
      } 
      if (this.mostrarBack) {
        this.validGit = isGitUrl(this.url);
        this.clientProject.urlback = this.url;
      } 
    }
  }
};
</script>
<style scoped>
.radios-wrapper {
  position: relative;
  overflow: hidden;
}
.lista {
  list-style: none;
}
.radioFront {
  width: 50%;
  float: left;
}
.radioBack {
  width: 50%;
  float: right;
}
.button {
  padding: 2px 10px;
}
input[type="radio"] {
  margin-right: 5px;
}
.bold {
  font-weight: bold;
}

.sk-circle {
  margin: 250px auto;
  width: 75px;
  height: 75px;
  position: relative;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: black;
  border-radius: 100%;
  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
          animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
  -webkit-transform: rotate(30deg);
      -ms-transform: rotate(30deg);
          transform: rotate(30deg); }
.sk-circle .sk-circle3 {
  -webkit-transform: rotate(60deg);
      -ms-transform: rotate(60deg);
          transform: rotate(60deg); }
.sk-circle .sk-circle4 {
  -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
          transform: rotate(90deg); }
.sk-circle .sk-circle5 {
  -webkit-transform: rotate(120deg);
      -ms-transform: rotate(120deg);
          transform: rotate(120deg); }
.sk-circle .sk-circle6 {
  -webkit-transform: rotate(150deg);
      -ms-transform: rotate(150deg);
          transform: rotate(150deg); }
.sk-circle .sk-circle7 {
  -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
          transform: rotate(180deg); }
.sk-circle .sk-circle8 {
  -webkit-transform: rotate(210deg);
      -ms-transform: rotate(210deg);
          transform: rotate(210deg); }
.sk-circle .sk-circle9 {
  -webkit-transform: rotate(240deg);
      -ms-transform: rotate(240deg);
          transform: rotate(240deg); }
.sk-circle .sk-circle10 {
  -webkit-transform: rotate(270deg);
      -ms-transform: rotate(270deg);
          transform: rotate(270deg); }
.sk-circle .sk-circle11 {
  -webkit-transform: rotate(300deg);
      -ms-transform: rotate(300deg);
          transform: rotate(300deg); }
.sk-circle .sk-circle12 {
  -webkit-transform: rotate(330deg);
      -ms-transform: rotate(330deg);
          transform: rotate(330deg); }
.sk-circle .sk-circle2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s; }
.sk-circle .sk-circle3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s; }
.sk-circle .sk-circle4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s; }
.sk-circle .sk-circle5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s; }
.sk-circle .sk-circle6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s; }
.sk-circle .sk-circle7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s; }
.sk-circle .sk-circle8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s; }
.sk-circle .sk-circle9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s; }
.sk-circle .sk-circle10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s; }
.sk-circle .sk-circle11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s; }
.sk-circle .sk-circle12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s; }

@-webkit-keyframes sk-circleBounceDelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  } 40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

@keyframes sk-circleBounceDelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  } 40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
</style>
