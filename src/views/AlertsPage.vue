<template>
  <div
        v-if="!user"
        style="text-align:center;"
    >
        <NoAccess />
    </div>
    <div class="alerts-page">
      <h2>Alerts Page</h2>
      <div class="left-side">
        <NavBar
            :collapsed="collapsed" 
            @update:collapsed="onToggleCollapse"
        />
      </div>

      <div class="right-side">
        <Logo />
        <LogOut />
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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import FilterPanel from '@/components/FilterPanel.vue';
  import AlertsTable from '@/components/AlertsTable.vue';
  import NavBar from '@/components/NavBar.vue';
  import LogOut from "@/components/LogOut.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import NoAccess from '@/components/NoAccess.vue';
  import Logo from '@/components/Logo.vue';
  
  export default {
    name: 'AlertsPage',
    components: {
      FilterPanel,
      AlertsTable,
      NoAccess,
      NavBar,
      LogOut,
      Logo,
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
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
      this.loadData();
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
  .alerts-page {
    background-color: #FAEDCD; /* Consistent with project theme */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align content to the left */
    margin: 0 auto;
    padding: 20px;
    padding-left: 120px; /* Ensure space for sidebar */
    width: calc(100% - 120px); /* Adjust to prevent overlap */
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
  }

  h1 {
    color: #606C38;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .alerts-section {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #e2c499;
    border-radius: 8px;
    background-color: #FEFAE0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%; /* Full width to align with content */
  }

  .section-content {
    display: flex;
    gap: 20px;
    overflow: hidden;
  }

  h3 {
    color: #C58E4F;
    font-size: 20px;
    margin-bottom: 10px;
  }

  /* Styling for table sections */
  .alerts-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .alerts-table th {
    background-color: #D4A373;
    color: #283618;
    padding: 12px 15px;
    text-transform: uppercase;
    font-size: 14px;
  }

  .alerts-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ccc;
  }

  .alerts-table tr:nth-child(even) {
    background-color: #E6CEAD;
  }

  .alerts-table tr:hover {
    background-color: #FFE4B2;
    transition: background-color 0.3s;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .alerts-page {
      padding-left: 10px; /* Adjust padding for smaller screens */
      width: 100%; /* Full width on smaller screens */
    }

    .section-content {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>
