<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications group="notification-group" />
    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>
<style lang="scss">
  
</style>
