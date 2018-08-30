<template>
  <div class="content">
    <div class="container-fluid">
       <div class="col-md-12">
          <card>
            <template slot="header">
              <h5 class="title">Proyectos</h5>
              <p class="category"></p>
            </template>
            <l-table v-if="hasServices"
                     :data="tableData.data"
                     :columns="tableData.columns">

              <template v-if="hasServices" class="headers" slot="columns">
                <td class="bold">Project name</td>
                <td class="bold">Public ip</td>
                <td class="bold">Url project</td>
                <td class="bold">Actions</td>
              </template>
              <template slot-scope="{row}" v-if="hasServices">
                <td>{{row.nameProyect}}</td>
                <td><a target="_blank" :href="'http://' + row.publicIp">{{row.publicIp}}</a></td>
                <td><a target="_blank" :href="row.gitUrl">{{row.gitUrl}}</a></td>
                <td class="td-actions text-right">
                  <button class="btn btn-danger btn-fill float-left button" @click="terminate(row)">
                    Terminate
                  </button>
                </td>
              </template>
            </l-table>
            <p v-if="!hasServices"> Todavía no ha levantado ninguna web. Para ello pinche <router-link to="/home/deploy">aquí</router-link></p>
          </card>

          <div class="sk-circle" v-if="terminateInProcess">
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
      </div>
    </div>
</template>
<script>
import LTable from "src/components/UIComponents/Table.vue";
import Card from "src/components/UIComponents/Cards/Card.vue";
import Checkbox from "src/components/UIComponents/Inputs/Checkbox.vue";

import axios from "axios";

const tableColumns = ["Id", "IP"];
const tableData = [
  {
    id: 1,
    ip: "asldnfkasdnf"
  }
];
export default {
  components: {
    Checkbox,
    LTable,
    Card
  },
  data() {
    return {
      tableData: {
        data: []
      },
      hasServices: false,
      terminateInProcess: false
    };
  },
  methods: {
    terminate(instance) {
      this.terminateInProcess = true;
      axios.post('http://34.247.235.142:4000/api/terminate-project', instance).then(response => {
        this.deleteInstanceInDb(instance);
      }).catch( error => {
        terminateInProcess = false;
        this.showNotification('Error:','Fallo al intentar terminar el servicio, intentelo de nuevo mas tarde', 5, 'error')
      });
    },
    deleteInstanceInDb(instanceData){
      const thisRouter = this.$router;
      axios.delete(`http://localhost:5000/api/users/delete-instance/${localStorage.username}/${instanceData.instanceId}`).then(response => {
        const instanceIdx = this.tableData.data.findIndex(i => i.instanceId == instanceData.instanceId);
        this.tableData.data.splice(instanceIdx, 1);
        this.getInstancesOfBd();
        this.terminateInProcess = false;
        this.showNotification('Info:','Su proyecto ha sido eliminado correctamente', 5, 'info')
      }).catch(err => {
        this.terminateInProcess = false;
        this.showNotification('Error:','Fallo al intentar eliminar el servicio de la base de datos', 5, 'error')
      })
    },
    showNotification(title, body, duration, type){
      this.$notify({
          group: 'notification-group',
          title: title,
          text: body,
          type: type,
          duration: duration * 1000
      });
    },
    hideNotifications(){
        this.$notify({
            group: 'notification-group',
            clean: true
        })
    },
    getInstancesOfBd(){
      const config = {
        headers: {
          authorization: localStorage.token
        }
      }

      axios.get(`http://localhost:5000/api/users/${localStorage.username}`, config).then(res => {
        this.tableData.data = [];
        if(res.data.ec2.length > 0){
          this.hasServices = true;
          const allInstances = res.data.ec2;
          for(let idx in allInstances){
            this.tableData.data.push( allInstances[idx] );
          }
        }else{
          this.hasServices = false;
        }
      }).catch(err => {
        console.log("Error al pedir el usuario", err);
      });
    }
  },
  created() {
    this.getInstancesOfBd();
  }
};
</script>
  
<style scoped>
  .bold{
    font-weight: bold;
  }
  .button{
    padding: 2px 10px;
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
