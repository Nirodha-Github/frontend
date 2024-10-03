<template>
  <div class="row p-0 m-0">
    <SideBar />
    <div class="col-sm-10"> <!-- Main content area -->
      <router-view /> <!-- Render the routed components here -->
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
  },
};
</script>

<style>
/* You can add styles for the layout if needed */
</style>
