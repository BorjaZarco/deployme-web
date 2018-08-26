<template>
  <div class="content">
    <div class="container-fluid">
       <div class="col-md-12">
          <card>
            <template slot="header">
              <h5 class="title">Servicios</h5>
              <p class="category"></p>
            </template>
            <l-table v-if="hasServices"
                     :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="terminate">
                    <i class="fa fa-times"></i>
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
// import ChartCard from "src/components/UIComponents/Cards/ChartCard.vue";
// import StatsCard from "src/components/UIComponents/Cards/StatsCard.vue";

import { get } from "axios";

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
    // ChartCard,
    // StatsCard
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
    terminate() {
      console.log("pendiente");
    }
  },
  created() {
    const config = {
      headers: {
        authorization: localStorage.token
      }
    }

    get(`http://localhost:5000/api/users/${localStorage.username}`, config)
      .then(res => { 
        this.tableData.data.push( { title: res.data.ec2[0].id })
        this.hasServices = true;
      })
      .catch(err => {
        this.hasServices = false;
      });
  }
};
</script>
<style>
</style>
