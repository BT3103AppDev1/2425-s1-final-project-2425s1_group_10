<template>
  <div
        v-if="!user"
        style="text-align:center;"
    >
        <NoAccess />
    </div>
    <div class="suppliers-page">
      <div class="left-side">
        <NavBar
            :collapsed="collapsed" 
            @update:collapsed="onToggleCollapse"
        />
      </div>

      <div class="right-side">
        <Logo />
        <LogOut />
        <br>
        <br>
        <br>
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
    </div>
  </template>
  
  <script>
  import SearchAndFilter from '@/components/SearchAndFilter.vue';
  import SuppliersTable from '@/components/SuppliersTable.vue';
  import NewSupplierForm from '@/components/NewSupplierForm.vue';
  import Supplier from '@/models/Supplier';
  import axios from 'axios';
  import NavBar from '@/components/NavBar.vue';
  import LogOut from "@/components/LogOut.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import NoAccess from '@/components/NoAccess.vue';
  import Logo from '@/components/Logo.vue';
  
  export default {
    name: 'SuppliersPage',
    components: {
      SearchAndFilter,
      SuppliersTable,
      NewSupplierForm,
      NoAccess,
      NavBar,
      LogOut,
      Logo,
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
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
      this.loadSuppliers();
    }
  };
  </script>
  
  <style scoped>
  .left-side {
  width: 50px; /* Initially narrow for collapsed NavBar */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f4f4f4;
  transition: width 0.3s; /* Smooth transition for resizing */
  z-index: 5;
}

.right-side {
  margin-left: 50px; /* Initially push content to the right */
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s; /* Smooth transition for content resizing */
}
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
  