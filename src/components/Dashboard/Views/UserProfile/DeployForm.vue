<template>
  <card>
    <h4 slot="header" class="card-title">Levanta tu Página!</h4>
    <form>
      <p>Introduce tu repositorio de GitHub donde tengas la página</p>
      <div class="row">
        <div class="col-md-12">
          <fg-input type="text"
                    label="Front"
                    placeholder="Home Address"
                    v-model="url.urlfront">
          </fg-input>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="deploy">
          Launch!
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import axios from 'axios'

  export default {
    components: {
      Card
    },
    data(){
        return {
            url:{}
        }
    },
    methods: {
        deploy(){
            axios.post(`http://localhost:4000/api/deploy-front`,this.url)
            .then((res)=>{
                console.log("Respuesta desde el Vue->ok");
            })
        }

    }
  }

</script>
<style>

</style>
