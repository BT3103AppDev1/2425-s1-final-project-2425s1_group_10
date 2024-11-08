<template>
    <div class="suppliers-page">
      <!-- Top bar with the "New Supplier" button -->
      <div class="top-bar">
        <SearchAndFilter
          @search="filterSuppliers"
          @filter="applyFilters"
        />
        <button class="new-supplier-button" @click="showForm = true">+ New Supplier</button>
      </div>
  
      <!-- Supplier Table -->
      <SuppliersTable :suppliers="filteredSuppliers" />
  
      <!-- New Supplier Form Modal -->
      <NewSupplierForm
        v-if="showForm"
        @close="showForm = false"
        @add-supplier="addSupplier"
      />
    </div>
  </template>
  
  <script>
  import SearchAndFilter from '@/components/SearchAndFilter.vue';
  import SuppliersTable from '@/components/SuppliersTable.vue';
  import NewSupplierForm from '@/components/NewSupplierForm.vue';
  import Supplier from '@/models/Supplier';
  import axios from 'axios';
  
  export default {
    name: 'SuppliersPage',
    components: {
      SearchAndFilter,
      SuppliersTable,
      NewSupplierForm
    },
    data() {
      return {
        suppliers: [],
        filteredSuppliers: [],
        showForm: false // Controls the visibility of the form modal
      };
    },
    methods: {
      async loadSuppliers() {
        try {
          const response = await axios.get('/suppliers_data.json');
          this.suppliers = response.data.map(
            item => new Supplier(
              item.supplier_id,
              item.supplier_name,
              item.contact_person,
              item.phone_number,
              item.email,
              item.products_supplied,
              item.lead_time,
              item.status,
              item.last_order_date
            )
          );
          this.filteredSuppliers = this.suppliers;
        } catch (error) {
          console.error("Error loading suppliers:", error);
        }
      },
      filterSuppliers(query) {
        this.filteredSuppliers = this.suppliers.filter(supplier =>
          supplier.name.toLowerCase().includes(query.toLowerCase())
        );
      },
      applyFilters(filters) {
        this.filteredSuppliers = this.suppliers.filter(supplier => {
          return (
            (!filters.category || supplier.product.includes(filters.category)) &&
            (!filters.status || supplier.status === filters.status)
          );
        });
      },
      addSupplier(newSupplier) {
        // Add the new supplier to the list and close the form
        this.suppliers.push(newSupplier);
        this.filteredSuppliers = this.suppliers;
        this.showForm = false;
      }
    },
    mounted() {
      this.loadSuppliers();
    }
  };
  </script>
  
  <style scoped>
  .suppliers-page {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #FEFAE0;
    color: #4a4a4a;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .new-supplier-button {
    padding: 10px 15px;
    background-color: #d6a05c;
    color: #FEFAE0;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .new-supplier-button:hover {
    background-color: #c58e4f;
  }
  </style>
  