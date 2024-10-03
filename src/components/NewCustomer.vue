<template>
  <div class="col-sm-10">
    <div class="container p-2 m-auto">
      <div class="row">
        <h4 class="col-sm-10">Hi Evano</h4>
        <button type="button" class="btn btn-primary col-sm-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add New Customers
        </button>
        <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add New Customer</h1>
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
                      placeholder="Customer Name"
                      v-model="customer.name"
                    />
                    <p v-if="errors.name" class="text-danger">{{ errors.name }}</p>
                  </div>
                  <div class="col-12">
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="company" 
                      name="company" 
                      placeholder="Company"
                      v-model="customer.company"
                    />
                    <p v-if="errors.company" class="text-danger">{{ errors.company }}</p>
                  </div>
                  <div class="col-12">
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="phone" 
                      name="phone" 
                      placeholder="Contact Phone"
                      v-model="customer.phone"
                    />
                    <p v-if="errors.phone" class="text-danger">{{ errors.phone }}</p>
                  </div>
                  <div class="col-12">
                    <input 
                      type="email" 
                      class="form-control form-control-sm" 
                      id="email" 
                      name="email" 
                      placeholder="E-mail"
                      v-model="customer.email"
                    />
                    <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
                  </div>
                  <div class="col-12">
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      id="country" 
                      name="country" 
                      placeholder="Country"
                      v-model="customer.country"
                    />
                    <p v-if="errors.country" class="text-danger">{{ errors.country }}</p>
                  </div>

                  <!-- Loop through addresses array to render multiple addresses -->
                  <div v-for="(address, index) in customer.addresses" :key="index" class="col-12 mt-3">
                    <h6>Address {{ index + 1 }}</h6>
                    <div class="row">
                    <div class="col-4">
                      <input
                        type="text"
                        v-model="address.adnumber"
                        class="form-control form-control-sm"
                        placeholder="Number"
                      />
                      <p v-if="errors.addresses && errors.addresses[index]?.adnumber" class="text-danger">{{ errors.addresses[index].adnumber }}</p>
                    </div>
                    <div class="col-8">
                      <input
                        type="text"
                        v-model="address.street"
                        class="form-control form-control-sm"
                        placeholder="Street"
                      />
                      <p v-if="errors.addresses && errors.addresses[index]?.street" class="text-danger">{{ errors.addresses[index].street }}</p>
                    </div>
                    </div>
                    
                    <div class="col-12">
                      <input
                        type="text"
                        v-model="address.city"
                        class="form-control form-control-sm"
                        placeholder="City, State"
                      />
                      <p v-if="errors.addresses && errors.addresses[index]?.city" class="text-danger">{{ errors.addresses[index].city }}</p>
                    </div>

                    <!-- Show Delete button only for the second address onward (index > 0) -->
                    <button
                      v-if="index > 0"
                      @click="removeAddress(index)"
                      class="btn btn-outline-danger mt-2"
                    >
                      DELETE
                    </button>
                  </div>

                  <button @click="addAddress" class="btn btn-outline-success col-12 mt-3">
                    ADD NEW ADDRESS
                  </button>

                  <button type="submit" class="btn btn-primary col-12">SUBMIT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
          <AllCustomers/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AllCustomers from "./../components/AllCustomers.vue";

export default {
  name: 'NewCustomer',
  components: {
    AllCustomers,
  },
  data() {
    return {
      customer: {
        name: '',
        company: '',
        phone: '',
        email: '',
        country: '',
        addresses: [
          {
            adnumber: '',
            street: '',
            city: '',
          },
        ],
      },
      errors: {},
    };
  },
  methods: {
    addAddress() {
      this.customer.addresses.push({ adnumber: '', street: '', city: '' });
    },
    removeAddress(index) {
      if (index > 0) {
        this.customer.addresses.splice(index, 1);
      }
    },
    validateForm() {
      let valid = true;
      this.errors = {}; // Reset errors

      // Check for required fields
      if (!this.customer.name) {
        this.errors.name = 'Customer name is required.';
        valid = false;
      }
      if (!this.customer.company) {
        this.errors.company = 'Company name is required.';
        valid = false;
      }
      if (!this.customer.phone) {
        this.errors.phone = 'Phone number is required.';
        valid = false;
      }
      if (!this.customer.email) {
        this.errors.email = 'Email is required.';
        valid = false;
      }
      if (!this.customer.country) {
        this.errors.country = 'Country is required.';
        valid = false;
      }

      // Initialize addresses errors as an object
      this.errors.addresses = {};

      // Validate addresses
      this.customer.addresses.forEach((address, index) => {
        const addressErrors = {};

        if (!address.adnumber) {
          addressErrors.adnumber = 'Number is required.';
          valid = false;
        }
        if (!address.street) {
          addressErrors.street = 'Street is required.';
          valid = false;
        }
        if (!address.city) {
          addressErrors.city = 'City is required.';
          valid = false;
        }

        // Only add errors for this address if there are any
        if (Object.keys(addressErrors).length) {
          this.errors.addresses[index] = addressErrors;
        }
      });

      return valid;
    },


    async submitForm() {
      if (this.validateForm()) {
        try {
          const response = await axios.post('http://localhost:8000/api/customer/new', this.customer);
          console.log('Customer added successfully', response.data);
          this.resetForm();
        } catch (error) {
          console.error('Error adding customer', error);
        }
      }
    },
    resetForm() {
      this.customer = {
        name: '',
        company: '',
        phone: '',
        email: '',
        country: '',
        addresses: [{ adnumber: '', street: '', city: '' }],
      };
      this.errors = {}; // Reset errors
    },
  },
};
</script>
