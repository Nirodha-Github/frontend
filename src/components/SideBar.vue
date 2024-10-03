<template>
  <div class="col-sm-2 bg-secondary">
    <h3 class="">Dashboard</h3>
    <nav class="nav flex-column">
      <router-link to="/customers" class="nav-link">Customers</router-link>
      <router-link to="/projects" class="nav-link">Projects</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>
