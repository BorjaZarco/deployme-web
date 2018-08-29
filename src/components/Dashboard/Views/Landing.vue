<template>
  <div class="content">
    <div class="row">
      <div class="col-xl-3 col-md-12 hero">
        <img src="static/img/landing-image.jpg">
        <div class="hero-text">
          <h1>Tu creas, nosotros desplegamos</h1>
          <router-link to="/deploy" class="btn btn-info btn-fill btn-center">
            Despliega tu código ahora >>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-3 col-md-4">
        <stats-card>
          <div slot="header" class="icon-warning">
            <i class="nc-icon nc-chart text-warning"></i>
          </div>
          <div slot="content">
            <p class="card-category">Despliega</p>
            <h4 class="card-title">Front & Back</h4>
          </div>
          <div slot="footer">
            JavaScript, Node, Php...
          </div>
        </stats-card>
      </div>

      <div class="col-xl-3 col-md-4">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Date a</p>
              <h4 class="card-title">Conocer</h4>
            </div>
            <div slot="footer">
              Haz que tu trabajo salga a la luz
            </div>
          </stats-card>
        </div>

      <div class="col-xl-3 col-md-4">
        <stats-card>
          <div slot="header" class="icon-info">
            <i class="nc-icon nc-favourite-28 text-primary"></i>
          </div>
          <div slot="content">
            <p class="card-category">Paginas DeployMe</p>
            <h4 class="card-title">87</h4>
          </div>
          <div slot="footer">
            <i class="fa fa-refresh"></i>Updated now
          </div>
        </stats-card>
      </div>

    </div>
  </div>
</template>
<script>
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue' 

  export default {
    components: {
      Card,
      StatsCard
    },
    data () {
      return {
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove'
      }
    },
    methods: {
      
    },
    created(){

    },
    mounted(){
      
    }
  }
</script>
<style scoped>
.hero {
  overflow: hidden;
  max-width: 890px;
  margin: 0 15px 15px 0;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}

</style>
