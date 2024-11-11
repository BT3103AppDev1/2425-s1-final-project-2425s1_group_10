<template>
  <div v-if="user" style="text-align:center;">
    <NoAccess />
  </div>
  <div v-else class="suppliers-page">
    <NavBar />
    <Logo />

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
          <th @click="sortBy('name')">Supplier Name</th>
          <th @click="sortBy('id')">Supplier ID</th>
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
        <tr v-for="supplier in filteredSuppliers" :key="supplier.id">
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.id }}</td>
          <td>{{ supplier.contactPerson }}</td>
          <td>{{ supplier.phoneNumber }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.product }}</td>
          <td>{{ supplier.leadTime }}</td>
          <td>{{ supplier.status }}</td>
          <td>{{ supplier.lastOrderDate }}</td>
        </tr>
      </tbody>
    </table>

    <!-- New Supplier Form Modal -->
    <NewSupplierForm v-if="showForm" @close="showForm = false" @add-supplier="addSupplier" />
  </div>
</template>

<script>
import SearchAndFilter from '@/components/SearchAndFilter.vue';
import NewSupplierForm from '@/components/NewSupplierForm.vue';
import Supplier from '@/models/Supplier';
import axios from 'axios';
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
        const matchesSearch = !filters.searchQuery || supplier.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
        const matchesCategory = !filters.category || supplier.product.includes(filters.category);
        const matchesStatus = !filters.status || supplier.status === filters.status;
        const matchesDate = !filters.date || supplier.lastOrderDate === filters.date;

        return matchesSearch && matchesCategory && matchesStatus && matchesDate;
      });
    },
    addSupplier(newSupplier) {
      this.suppliers.push(newSupplier);
      this.filteredSuppliers = this.suppliers;
      this.showForm = false;
    },
    sortBy(key) {
      this.filteredSuppliers.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
  },
  mounted() {
    this.loadSuppliers();
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

  @media (max-width: 768px) {
    .suppliers-page {
      padding-left: 10px;
      width: 100%;
    }

    .top-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .new-supplier-button {
      margin-top: 10px;
      align-self: flex-end;
    }
  }
</style>