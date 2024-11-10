<template>
  <div
    v-if="user"
    style = "text-align:center;"
    > 
    <NoAccess />
  </div>
  <div>
    <div v-if="!user" class="suppliers-page">
      <NavBar />
      <Logo />
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
  import Logo from '@/components/Logo.vue';
  import NoAccess from '@/components/NoAccess.vue';
  
  export default {
    name: 'SuppliersPage',
    components: {
      SearchAndFilter,
      SuppliersTable,
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
    background-color: #FAEDCD; /* Background color consistent with project */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
    margin: 0 auto; /* Center horizontally */
    padding: 20px;
    padding-left: 120px; /* Added padding to push content to the right */
    width: calc(100% - 120px); /* Adjust width to avoid overlapping */
    box-sizing: border-box;
  }

  /* Top bar styling */
  .top-bar {
    width: 100%; /* Make sure the top bar spans the full width */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  /* "New Supplier" button styling */
  .new-supplier-button {
    padding: 10px 15px;
    background-color: #606C38; /* Consistent with project color scheme */
    color: #FEFAE0;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
  }

  .new-supplier-button:hover {
    background-color: #356837; /* Darker green on hover */
    transform: scale(1.05); /* Slightly increase size on hover */
  }

  .new-supplier-button:focus {
    outline: none;
    background-color: #50632D; /* Focus color */
  }

  /* Table styling */
  .suppliers-table {
    width: 100%; /* Full width for better fitting */
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-top: 10px;
  }

  .suppliers-table th {
    background-color: #D4A373; /* Accent color for headers */
    color: #283618;
    padding: 12px 15px;
    text-transform: uppercase;
    font-size: 14px;
  }

  .suppliers-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ccc;
  }

  /* Alternate row coloring for readability */
  .suppliers-table tr:nth-child(even) {
    background-color: #E6CEAD; /* Light background for even rows */
  }

  .suppliers-table tr:hover {
    background-color: #FFE4B2; /* Highlight color on hover */
    transition: background-color 0.3s;
  }

  /* Styling for the search and filter bar */
  .search-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Full width to align with page */
    margin-bottom: 20px;
  }

  .search-input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background-color: #FFF7E0; /* Match background */
    font-size: 14px;
  }

  .search-input:focus {
    outline: none;
    border-color: #C4984A; /* Accent on focus */
  }

  .filter-select {
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background-color: #FFF7E0;
    font-size: 14px;
  }

  .filter-select:focus {
    outline: none;
    border-color: #C4984A; /* Accent on focus */
  }

  /* Responsive design adjustments */
  @media (max-width: 768px) {
    .suppliers-page {
      padding-left: 10px; /* Adjust padding for small screens */
      width: 100%; /* Ensure content takes full width */
    }

    .top-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .search-filter-container {
      flex-direction: column;
      gap: 10px;
      width: 100%; /* Full width on smaller screens */
    }

    .new-supplier-button {
      align-self: flex-end;
      margin-top: 10px; /* Adjusted space for better positioning */
    }
  }
</style>
