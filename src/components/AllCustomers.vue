<template>
  <div class="container">
    <h2 class="mt-4">Customers</h2>

    <div class="mb-3">
      <input
        type="text"
        v-model="search"
        class="form-control"
        placeholder="Search..."
      />
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Company Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="5" class="text-center">Loading...</td>
        </tr>
        <tr v-if="!loading && !filteredCustomers.length">
          <td colspan="5" class="text-center">No customers found.</td>
        </tr>
        <template v-for="customer in filteredCustomers" :key="customer.id">
          <tr @click="toggleDetails(customer)" class="customerRow">
            <td>{{ customer.name }}</td>
            <td>{{ customer.company }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.country }}</td>
          </tr>
          <template v-if="customer.showDetails">
            <tr v-for="(address, index) in customer.addresses" :key="index">
                <td></td>
                <th>Address: {{index+1}}</th>
                <td>{{ address.adnumber }}</td>
                <td>{{ address.street }}</td>
                <td>{{ address.city }}</td>
            </tr>
        </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      customers: [],
      loading: true,
      search: '',
    };
  },
  async created() {
    await this.fetchCustomers();
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter((customer) => {
        return (
          customer.name.toLowerCase().includes(this.search.toLowerCase()) ||
          customer.email.toLowerCase().includes(this.search.toLowerCase()) ||
          customer.phone.includes(this.search)
        );
      });
    },
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:8000/api/customers'); // Replace with your API URL
        console.log('API Response:', response.data); // Check the structure of the response
        this.customers = response.data.map((customer) => ({
          ...customer,
          showDetails: false, // Add a property to manage visibility of address details
        })); // Make sure response.data is an array
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        this.loading = false;
      }
    },
    toggleDetails(customer) {
      // Toggle the visibility of the address details
      customer.showDetails = !customer.showDetails;
    },
  },
};
</script>

<style scoped>
    .customerRow:hover{
        cursor:pointer;
    }
</style>
