<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
          <li>
            <router-link :to="{path:'/admin'}">Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; Coded with
        <i class="fa fa-heart heart"></i> by
        <a href="https://github.com/BorjaZarco" target="_blank">Borja</a>,
        <a href="https://github.com/SamuelLopezMartel" target="_blank">Samuel</a>,
        <a href="https://github.com/apemarr" target="_blank">Adrian</a> and
        <a href="https://github.com/sakdev" target="_blank">Isaac</a>
        as <a href="" target="_blank">DeployMe Team</a>.
      </div>
    </div>
  </footer>
</template>
<script>
  export default {}

</script>
<style>

</style>
