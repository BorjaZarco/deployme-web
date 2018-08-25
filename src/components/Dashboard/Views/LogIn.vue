<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <log-in-form>
          </log-in-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LogInForm from './UserProfile/LogInForm.vue'

  export default {
    components: {
      LogInForm
    }
  }

</script>
<style>
</style>
