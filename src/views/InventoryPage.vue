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
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #FEFAE0;
    height: 100vh;
  }
  
  h2 {
    color: #4a4a4a;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .search-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .add-button {
    background-color: #d6a05c;
    color: #FEFAE0;
    font-size: 24px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  