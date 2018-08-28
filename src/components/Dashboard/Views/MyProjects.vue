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
              <template slot-scope="{row}">
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
      hasServices: false
    };
  },
  methods: {
    terminate(instance) {
      axios.post('http://localhost:4000/api/terminate-project', instance).then(response => {
        this.deleteInstanceInDb(instance);
      }).catch( error => {
        console.log("error: ", error);
      });
    },
    deleteInstanceInDb(instanceData){
      const thisRouter = this.$router;
      axios.delete(`http://localhost:5000/api/users/delete-instance/${localStorage.username}/${instanceData.instanceId}`).then(response => {
        this.showNotification('Information:','Su proyecto ha sido eliminado!', 5)
        const instanceIdx = this.tableData.data.findIndex(i => i.instanceId == instanceData.instanceId);
        this.tableData.data.splice(instanceIdx, 1);
        this.tableData.data.length == 0 ? this.hasServices = true : this.hasServices = false;
      }).catch(err => {
        console.log(err);
      })
    },
    showNotification(title, body, duration){
      this.$notify({
          group: 'notification-group',
          title: title,
          text: body,
          duration: duration * 1000
      });
    },
    hideNotifications(){
        this.$notify({
            group: 'notification-group',
            clean: true
        })
    },
    getInstanceOfBd(){
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
    this.getInstanceOfBd();
  }
};
</script>
  
<style>
  .bold{
    font-weight: bold;
  }
  .button{
    padding: 2px 10px;
  }
</style>
