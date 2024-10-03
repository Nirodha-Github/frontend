<template>
  <div class="col-sm-10">
    <div class="container p-2 m-auto">
      <h4>Edit Project</h4>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Project Name</label>
          <input type="text" class="form-control" id="name" v-model="project.name" />
          <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" v-model="project.description"></textarea>
          <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
        </div>
        <div class="mb-3">
          <label for="customer" class="form-label">Select Customer</label>
          <select id="customer" class="form-select" v-model="project.customer_id">
            <option disabled value="">Select a Customer</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
          <p v-if="errors.customer_id" class="text-danger">{{ errors.customer_id }}</p>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditProject',
  data() {
    return {
      project: {
        name: '',
        description: '',
        customer_id: '',
      },
      customers: [], // List of customers
      errors: {},
    };
  },
  created() {
    this.fetchCustomers();  // Fetch customers for the dropdown
    this.fetchProject();    // Fetch project data based on ID
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:8000/api/customers');
        this.customers = response.data;  // Store fetched customers
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    },
    async fetchProject() {
      const { id } = this.$route.params; // Get the project ID from route parameters
      try {
        const response = await axios.get(`http://localhost:8000/api/project/${id}`); // Fetch project data by ID
        this.project = response.data; // Assuming response.data contains the project object
      } catch (error) {
        console.error('Error fetching project', error);
      }
    },
    validateForm() {
      let valid = true;
      this.errors = {}; // Reset errors

      if (!this.project.name) {
        this.errors.name = 'Project name is required.';
        valid = false;
      }
      if (!this.project.description) {
        this.errors.description = 'Project description is required.';
        valid = false;
      }
      if (!this.project.customer_id) {
        this.errors.customer_id = 'Please select a customer.';
        valid = false;
      }

      return valid;
    },
    async submitForm() {
      if (this.validateForm()) {
        const { id } = this.$route.params; // Get the project ID from route parameters
        try {
          const response = await axios.put(`http://localhost:8000/api/project/${id}`, this.project);
          console.log('Project updated successfully', response.data);
          this.$router.push({ name: 'AllProjects' }); // Redirect to all projects after successful update
        } catch (error) {
          console.error('Error updating project', error);
        }
      }
    },
  },
};
</script>
