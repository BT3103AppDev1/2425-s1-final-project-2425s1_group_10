<template>
    <div
    v-if="user"
    style = "text-align:center;"
    >
  <NoAccess />
  </div> 
      <div v-if="!user" class="inventory-page">       
          <NavBar />
          <Logo />

        <h1>Inventory Tracking</h1>
      <!-- Search and Filter Component -->
      <div class="search-filter-container">
        <SearchAndFilter @search="onSearch" @filter="applyFilters" />
        <button class="add-button">+</button>
      </div>
  
      <!-- Inventory Table -->
      <InventoryTable :items="filteredInventory" />
    </div>
  </template>
  
  <script>
    import axios from 'axios';
    import InventoryTable from '@/components/InventoryTable.vue';
    import SearchAndFilter from '@/components/SearchAndFilter.vue';
    import NavBar from '@/components/NavBar.vue';
    import Logo from '@/components/Logo.vue';
    import NoAccess from '@/components/NoAccess.vue';
  
  export default {
    name: 'InventoryPage',
    components: {
      InventoryTable,
      SearchAndFilter,
      NavBar,
      Logo,
      NoAccess,

    },
    data() {
      return {
        inventoryItems: [],
        filteredInventory: [],
        searchQuery: '',
        filters: {
          category: '',
          status: '',
          date: ''
        }
      };
    },
    methods: {
      async loadInventoryData() {
        try {
          const response = await axios.get('/inventory_page_data.json');
          this.inventoryItems = response.data;
          this.filteredInventory = this.inventoryItems;
        } catch (error) {
          console.error('Failed to load inventory data:', error);
        }
      },
      onSearch(query) {
        this.searchQuery = query;
        this.applyFilters();
      },
      applyFilters(filters = this.filters) {
        this.filters = filters;
  
        this.filteredInventory = this.inventoryItems.filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesCategory = !this.filters.category || item.category === this.filters.category;
          const matchesStatus = !this.filters.status || item.reorderStatus === this.filters.status;
          const matchesDate = !this.filters.date || item.lastRestocked === this.filters.date;
          
          return matchesSearch && matchesCategory && matchesStatus && matchesDate;
        });
      }
    },
    mounted() {
      this.loadInventoryData();
    }
  };
  </script>
  
  <style scoped>
  .inventory-page {
    background-color: #FAEDCD; /* Consistent with the overall project theme */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align content to the left */
    margin: 0 auto;
    padding: 20px;
    padding-left: 120px; /* Ensure space for sidebar */
    width: calc(100% - 120px); /* Adjust width to prevent overlap */
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
  }

  h1 {
    color: #606C38; /* Consistent heading color */
    font-size: 28px;
    margin-bottom: 20px;
  }

  .search-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Full width to align with content */
    margin-bottom: 20px;
  }

  .add-button {
    background-color: #606C38; /* Consistent button color */
    color: #FEFAE0;
    font-size: 24px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%; /* Round shape */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
    transition: background-color 0.3s, transform 0.3s;
  }

  .add-button:hover {
    background-color: #356837; /* Darker green on hover */
    transform: scale(1.05); /* Slight size increase */
  }

  .add-button:focus {
    outline: none;
    background-color: #50632D; /* Focus state color */
  }

  /* Inventory Table Styling */
  .inventory-table {
    width: 100%; /* Full width */
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-top: 10px;
  }

  .inventory-table th {
    background-color: #D4A373; /* Header color */
    color: #283618;
    padding: 12px 15px;
    text-transform: uppercase;
    font-size: 14px;
  }

  .inventory-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ccc;
  }

  .inventory-table tr:nth-child(even) {
    background-color: #E6CEAD; /* Light background for even rows */
  }

  .inventory-table tr:hover {
    background-color: #FFE4B2; /* Highlight on hover */
    transition: background-color 0.3s;
  }

  /* Responsive Design Adjustments */
  @media (max-width: 768px) {
    .inventory-page {
      padding-left: 10px; /* Adjust padding for smaller screens */
      width: 100%; /* Full width for smaller screens */
    }

    .search-filter-container {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
