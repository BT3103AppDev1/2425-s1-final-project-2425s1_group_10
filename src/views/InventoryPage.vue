<template>
  <div
        v-if="!user"
        style="text-align:center;"
    >
        <NoAccess />
    </div>
    <div class="inventory-page">
      <h2>Inventory Tracking</h2>
      <div class="left-side">
        <NavBar
            :collapsed="collapsed" 
            @update:collapsed="onToggleCollapse"
        />
      </div>

      <div class="right-side">
        <Logo />
        <LogOut />
      <!-- Search and Filter Component -->
      <div class="search-filter-container">
        <SearchAndFilter @search="onSearch" @filter="applyFilters" />
        <button class="add-button">+</button>
      </div>
  
      <!-- Inventory Table -->
      <InventoryTable :items="filteredInventory" />
      </div>
    </div>  
  </template>
  
  <script>
  import axios from 'axios';
  import InventoryTable from '@/components/InventoryTable.vue';
  import SearchAndFilter from '@/components/SearchAndFilter.vue';
  import NavBar from '@/components/NavBar.vue';
  import LogOut from "@/components/LogOut.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import NoAccess from '@/components/NoAccess.vue';
  import Logo from '@/components/Logo.vue';
  
  export default {
    name: 'InventoryPage',
    components: {
      InventoryTable,
      SearchAndFilter,
      NoAccess,
      NavBar,
      LogOut,
      Logo,
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
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
      this.loadInventoryData();
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
  