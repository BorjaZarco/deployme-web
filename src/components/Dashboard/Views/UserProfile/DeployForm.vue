<template>
  <card>
    <h4 slot="header" class="card-title">Levanta tu proyecto!</h4>
    <form>
      <p class="bold">Seleccione el tipo de proyecto a desplegar</p>
      <div class="radios-wrapper">
        <div class="radioFront">
          <ul class="lista" @click="EnableFront">
              <li><input type="radio" name="radio" value="estatica" v-model="service">Web estática</li>
              <li><input type="radio" name="radio" value="webpack" v-model="service">Web con webpack</li>
            </ul>
        </div>
        <div class="radioBack">
          <ul class="lista" @click="EnableBack">
              <li><input type="radio" name="radio" value="php" v-model="service">Php</li>
              <li><input type="radio" name="radio" value="node" v-model="service">Node</li>
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
                    v-model="clientProject.urlfront">
            </fg-input>
          </template>
          <template v-if="mostrarFront">
            <fg-input type="text"
                    label="Front"
                    placeholder="Home Address"
                    v-model="clientProject.urlfront">
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

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right button" @click.prevent="deploy">
          Launch!
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from "src/components/UIComponents/Cards/Card.vue";
import PRadio from "src/components/UIComponents/Inputs/Radio.vue";
import axios from "axios";

const serviceData = {
  estatica: 
  `Si tu proyecto esta realizado sobre algun tipo de framework de JavaScript
   asegurese de construir su proyeto y que su repositorio de github contenga la carpeta 
   \"dist\" una vez generada dicha construcción 
   \n En caso de que su proyecto sea una web
   estática simple, únicamente debe copiar el link del repositorio`,
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
      mostrarFront: false,
      mostrarBack: false,
      mostrarDisable: true,
      serviceInfo: ""
    };
  },
  methods: {
    deploy() {
      this.deletePosiblesSpaces();
      if (
        (this.clientProject.urlfront && this.clientProject.urlfront !== " ") ||
        (this.clientProject.urlback && this.clientProject.urlback !== " ")
      ) {
        this.showNotification(
          "Information:",
          "Desplegando... Esto suele tardar unos 3 minutos aproximadamente. Espere por favor.",
          180
        );
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
      axios
        .post(
          `http://localhost:5000/api/users/add-instance/${
            localStorage.username
          }`,
          data
        )
        .then(response => {
          thisRouter.push("my-projects");
        })
        .catch(err => {
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
    hideNotifications() {
      this.$notify({
        group: "notification-group",
        clean: true
      });
    },
    deployFrontProject() {
      axios
        .post(`http://localhost:4000/api/deploy-front`, this.clientProject)
        .then(res => {
          this.hideNotifications();
          this.showNotification(
            "Information:",
            "Su proyecto ha sido desplegado!",
            5
          );
          this.saveInstanceInDb(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    deployBackProject() {
      axios
        .post(`http://localhost:4000/api/deploy-back`, this.clientProject)
        .then(res => {
          this.hideNotifications();
          this.showNotification(
            "Information:",
            "Su proyecto ha sido desplegado!",
            5
          );
          this.saveInstanceInDb(res.data);
        })
        .catch(error => {
          console.log(error);
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
      this.serviceInfo = serviceData[this.service],
      this.clientProject.technology = this.service
    }
  }
};
</script>
<style>
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
</style>
