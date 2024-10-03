<template>
  <div>
    <h4>All Projects</h4>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Customer Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.name }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.customerName }}</td>
          <td>
            <router-link :to="{ name: 'EditProject', params: { id: project.id } }" class="btn btn-warning">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projects: [],
      loading: true,
      search: '',
    };
  },
  async created() {
    await this.fetchProjects();
  },
  computed: {
    filteredProjects() {
      return this.projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(this.search.toLowerCase()) ||
          project.customerName.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://localhost:8000/api/projects'); 
        this.projects = await Promise.all(response.data.map(async (project) => {
          // Fetch customer name for each project
          const customerResponse = await axios.get(`http://localhost:8000/api/customer/${project.customer_id}`); 
          return {
            ...project,
            customerName: customerResponse.data.data.name, // Assuming the API returns a name property
          };
        }));
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.projectRow:hover {
  cursor: pointer;
}
</style>
