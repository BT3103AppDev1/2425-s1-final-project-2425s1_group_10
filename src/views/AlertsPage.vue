<template>
  <div
    v-if="user"
    style = "text-align:center;"
    >
  <NoAccess />
  </div> 
    <div v-if="!user" class="alerts-page">
        <NavBar />
        <Logo />

      <h1>Alerts Page</h1>
  
      <!-- Low Stock Alerts Section -->
      <section class="alerts-section">
        <h3>Low Stock Alerts</h3>
        <div class="section-content">
          <FilterPanel :isIncomingStock="false" @filter="filterLowStock" />
          <AlertsTable :items="filteredLowStock" :isIncomingStock="false" />
        </div>
      </section>
  
      <!-- Surplus Stock Alerts Section -->
      <section class="alerts-section">
        <h3>Surplus Stock Alerts</h3>
        <div class="section-content">
          <FilterPanel :isIncomingStock="false" @filter="filterSurplusStock" />
          <AlertsTable :items="filteredSurplusStock" :isIncomingStock="false" />
        </div>
      </section>
  
      <!-- Incoming Shipments Alerts Section -->
      <section class="alerts-section">
        <h3>Incoming Shipments Alerts</h3>
        <div class="section-content">
          <FilterPanel :isIncomingStock="true" @filter="filterIncomingStock" />
          <AlertsTable :items="filteredIncomingStock" :isIncomingStock="true" />
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import FilterPanel from '@/components/FilterPanel.vue';
  import AlertsTable from '@/components/AlertsTable.vue';
  import NavBar from '@/components/NavBar.vue';
  import Logo from '@/components/Logo.vue';
  import NoAccess from '@/components/NoAccess.vue';
  
  export default {
    name: 'AlertsPage',
    components: {
      FilterPanel,
      AlertsTable,
      NavBar,
      Logo,
      NoAccess
    },
    data() {
      return {
        lowStockItems: [],
        surplusStockItems: [],
        incomingStockItems: [],
        filteredLowStock: [],
        filteredSurplusStock: [],
        filteredIncomingStock: []
      };
    },
    methods: {
      async loadData() {
        try {
          const inventoryResponse = await axios.get('/inventory_data.json');
          const incomingStockResponse = await axios.get('/incoming_stock_data.json');
  
          this.lowStockItems = inventoryResponse.data.filter(item => item.status === 'Low Stock' || item.status === 'Critical Low');
          this.surplusStockItems = inventoryResponse.data.filter(item => item.status === 'Surplus' || item.status === 'Excess Stock');
          this.incomingStockItems = incomingStockResponse.data;
  
          this.filteredLowStock = this.lowStockItems;
          this.filteredSurplusStock = this.surplusStockItems;
          this.filteredIncomingStock = this.incomingStockItems;
        } catch (error) {
          console.error("Error loading data:", error);
        }
      },
      filterLowStock(filters) {
        this.filteredLowStock = this.lowStockItems.filter(item =>
          (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.currentStock || item.currentStock <= filters.currentStock) &&
          (!filters.status || item.status === filters.status)
        );
      },
      filterSurplusStock(filters) {
        this.filteredSurplusStock = this.surplusStockItems.filter(item =>
          (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.currentStock || item.currentStock >= filters.currentStock) &&
          (!filters.status || item.status === filters.status)
        );
      },
      filterIncomingStock(filters) {
        this.filteredIncomingStock = this.incomingStockItems.filter(item =>
          (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.incoming || item.incomingStock >= filters.incoming)
        );
      }
    },
    mounted() {
      this.loadData();
    }
  };
  </script>
  
  <style scoped>
  .alerts-page {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #FEFAE0;
    color: #4a4a4a;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
  }
  
  .alerts-section {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #e2c499;
    border-radius: 8px;
    background-color: #FEFAE0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .section-content {
    display: flex;
    gap: 20px;
    overflow: hidden;
  }
  
  h2 {
    color: #b56d00;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  h3 {
    color: #c58e4f;
    font-size: 20px;
    margin-bottom: 10px;
  }
  </style>
  