<template>
  <div class="content">
    <div class="container-fluid">
       <div class="col-md-12">
          <card>
            <template slot="header">
              <h5 class="title">Servicios</h5>
              <p class="category">ID de los servidores con los páginas levantadas </p>
            </template>
            <l-table :data="tableData.data"
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
          </card>
        </div>
      </div>
    </div>
</template>
<script>
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  
  const tableColumns = ['Id', '']
  const tableData = []
  export default {
    components: {
      LTable,
      Card,
      Checkbox,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        tableData: {
          columns: [...tableColumns],
          data: [...tableData]
        }
      }
    }, 
    methods: {
      terminate() {
        console.log('pendiente')
      }
    }
  }
</script>
<style>
</style>
