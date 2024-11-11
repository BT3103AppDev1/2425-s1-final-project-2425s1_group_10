<template>
  <div v-if="user" style="text-align:center;">
    <NoAccess />
  </div>
  <div v-else class="suppliers-page">
    <NavBar />
    <Logo />

    <!-- Page Title -->
    <h2 style="text-align:center; color: #606C38; margin-top: 20px;">Suppliers Page</h2>

    <!-- Top bar with the "New Supplier" button -->
    <div class="top-bar">
      <div class="search-and-filter">
        <SearchAndFilter @search="filterSuppliers" @filter="applyFilters" />
      </div>
      <button class="new-supplier-button" @click="showForm = true">+ New Supplier</button>
    </div>

    <!-- Merged Supplier Table -->
    <table class="suppliers-table">
      <thead>
        <tr>
          <th>Supplier Name</th>
          <th>Supplier ID</th>
          <th>Contact Person</th>
          <th>Phone Number</th>
          <th>Email Address</th>
          <th>Products Supplied</th>
          <th>Lead Time</th>
          <th>Status</th>
          <th>Last Order Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="supplier in filteredSuppliers" :key="supplier.supplierid">
          <td>{{ supplier.suppliername }}</td>
          <td>{{ supplier.supplierid }}</td>
          <td>{{ supplier.contactperson }}</td>
          <td>{{ supplier.phonenumber }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.productssupplied }}</td>
          <td>{{ supplier.leadtime }}</td>
          <td>{{ supplier.status }}</td>
          <td>{{ supplier.lastorderdate }}</td>
        </tr>
      </tbody>
    </table>

    <!-- New Supplier Form Modal -->
    <NewSupplierForm v-if="showForm" @close="showForm = false" @add-supplier="addNewSupplier" />
  </div>
</template>

<script>
import { loadSuppliers, addSupplier } from '@/firebaseSuppliers';  // Import Firebase methods
import SearchAndFilter from '@/components/SearchAndFilter.vue';
import NewSupplierForm from '@/components/NewSupplierForm.vue';
import Supplier from '@/models/Supplier';
import NavBar from '@/components/NavBar.vue';
import Logo from '@/components/Logo.vue';
import NoAccess from '@/components/NoAccess.vue';

export default {
  name: 'SuppliersPage',
  components: {
    SearchAndFilter,
    NewSupplierForm,
    NoAccess,
    NavBar,
    Logo
  },
  data() {
    return {
      suppliers: [],
      filteredSuppliers: [],
      showForm: false // Controls the visibility of the form modal
    };
  },
  methods: {
    async loadSuppliersData() {
      try {
        const suppliersData = await loadSuppliers(); // Fetch data from Firebase
        this.suppliers = suppliersData.map(item => new Supplier(
          item.suppliername,
          item.supplierid,
          item.contactperson,
          item.phonenumber,
          item.email,
          item.productssupplied,
          item.leadtime,
          item.status,
          item.lastorderdate
        ));
        this.filteredSuppliers = this.suppliers;  // Set the filtered list to the full list of suppliers
      } catch (error) {
        console.error("Error loading suppliers:", error);
      }
    },
    filterSuppliers(query) {
      this.filteredSuppliers = this.suppliers.filter(supplier =>
        supplier.suppliername.toLowerCase().includes(query.toLowerCase())
      );
    },
    applyFilters(filters) {
      this.filteredSuppliers = this.suppliers.filter(supplier => {
        const matchesSearch = !filters.searchQuery || supplier.suppliername.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesCategory = !filters.category || supplier.productssupplied.includes(filters.category);
        const matchesStatus = !filters.status || supplier.status === filters.status;
        const matchesDate = !filters.date || supplier.lastorderdate === filters.date;

        return matchesSearch && matchesCategory && matchesStatus && matchesDate;
      });
    },
    async addNewSupplier(newSupplier) {
      try {
        await addSupplier(newSupplier);  // Add supplier to Firebase
        this.loadSuppliersData();  // Reload the suppliers list
        this.showForm = false;  // Close the form modal
      } catch (error) {
        console.error("Error adding new supplier:", error);
      }
    },
    sortBy(key) {
      this.filteredSuppliers.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
  },
  mounted() {
    this.loadSuppliersData();  // Load suppliers when the component is mounted
  }
};
</script>

<style scoped>
  .suppliers-page {
    background-color: #FAEDCD;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 20px;
    padding-left: 120px;
    width: calc(100% - 120px);
    box-sizing: border-box;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .search-and-filter {
    flex-grow: 1;
    margin-right: 20px;
  }

  .new-supplier-button {
    padding: 10px 20px;
    background-color: #606C38;
    color: #FEFAE0;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s, transform 0.3s;
  }

  .new-supplier-button:hover {
    background-color: #356837;
    transform: scale(1.05);
  }

  .suppliers-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .suppliers-table th {
    background-color: #dda15e;
    color: #4a4a4a;
    padding: 12px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  .suppliers-table td {
    padding: 12px;
    font-size: 14px;
    color: #4a4a4a;
    text-align: center;
  }

  .suppliers-table tr:nth-child(odd) {
    background-color: #fefae0;
  }

  .suppliers-table tr:nth-child(even) {
    background-color: #e6cead;
  }

  .suppliers-table tr:hover {
    background-color: #ffe4b2;
  }
</style>
