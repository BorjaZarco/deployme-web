<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <sign-up-form>
          </sign-up-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import SignUpForm from './UserProfile/SignUpForm.vue'
  import UserCard from './UserProfile/UserCard.vue'

  export default {
    components: {
      SignUpForm,
      UserCard
    }
  }

</script>
<style>

</style>
