<template>
  <div class="col-sm-10">
    <div class="container p-2 m-auto">
      <div class="row">
        <h4 class="col-sm-10">Add New Project</h4>
        <button type="button" class="btn btn-primary col-sm-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add New Project
        </button>
        <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Project</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="row g-3" @submit.prevent="submitForm">
                  <div class="col-12">
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="name" 
                      name="name" 
                      placeholder="Project Name"
                      v-model="project.name"
                    />
                    <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
                  </div>
                  <div class="col-12">
                    <textarea
                      class="form-control form-control-sm"
                      id="description"
                      name="description"
                      placeholder="Project Description"
                      v-model="project.description"
                    ></textarea>
                    <p v-if="errors.description" class="text-danger">{{ errors.description }}</p>
                  </div>
                  <div class="col-12">
                    <label for="customer" class="form-label">Select Customer</label>
                    <select
                      id="customer"
                      class="form-select form-select-sm"
                      v-model="project.customer_id"
                    >
                      <option disabled value="">Select a Customer</option>
                      <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                        {{ customer.name }}
                      </option>
                    </select>
                    <p v-if="errors.customer_id" class="text-danger">{{ errors.customer_id }}</p>
                  </div>
                  <button type="submit" class="btn btn-primary col-12">SUBMIT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <AllProjects />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AllProjects from "./../components/AllProjects.vue";

export default {
  name: 'NewProject',
  components: {
    AllProjects,
  },
  data() {
    return {
      project: {
        name: '',
        description: '',
        customer_id: '',
      },
      customers: [], // List to store customers
      errors: {},
    };
  },
  created() {
    this.fetchCustomers(); // Fetch customers when the component is created
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:8000/api/customers'); // Adjust the API endpoint as needed
        this.customers = response.data; // Store the fetched customers
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    },
    validateForm() {
      let valid = true;
      this.errors = {}; // Reset errors

      // Check for required fields
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
        try {
          const response = await axios.post('http://localhost:8000/api/project/new', this.project); // Adjust the API endpoint as needed
          console.log('Project added successfully', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error adding project', error);
        }
      }
    },
    resetForm() {
      this.project = {
        name: '',
        description: '',
        customer_id: '',
      };
      this.errors = {}; // Reset errors
    },
  },
};
</script>
