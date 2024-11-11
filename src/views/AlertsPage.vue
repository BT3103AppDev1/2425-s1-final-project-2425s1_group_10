<template>
  <div v-if="!user" style="text-align:center;">
    <NoAccess />
  </div>
  <div class="alerts-page">
    <h2>Alerts Page</h2>
    <div class="left-side">
      <NavBar :collapsed="collapsed" @update:collapsed="onToggleCollapse" />
    </div>

    <div class="right-side">
      <Logo />
      <LogOut />

      <!-- Low Stock Alerts Section -->
      <section class="alerts-section">
        <h3>Low Stock Alerts</h3>
        <div class="section-content">
          <FilterPanel :isIncomingStock="false" @filter="filterLowStock" />
          <table class="alerts-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Last Reorder Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredLowStock" :key="item.sku">
                <td>{{ item.name }}</td>
                <td>{{ item.sku }}</td>
                <td>{{ item.currentStock }}</td>
                <td>{{ item.stockLevel }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.lastReorderDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Surplus Stock Alerts Section -->
      <section class="alerts-section">
        <h3>Surplus Stock Alerts</h3>
        <div class="section-content">
          <FilterPanel :isIncomingStock="false" @filter="filterSurplusStock" />
          <table class="alerts-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Last Reorder Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredSurplusStock" :key="item.sku">
                <td>{{ item.name }}</td>
                <td>{{ item.sku }}</td>
                <td>{{ item.currentStock }}</td>
                <td>{{ item.stockLevel }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.lastReorderDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Incoming Shipments Alerts Section -->
      <section class="alerts-section">
        <h3>Incoming Shipments Alerts</h3>
        <div class="section-content">
          <FilterPanel :isIncomingStock="true" @filter="filterIncomingStock" />
          <table class="alerts-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Incoming Stock</th>
                <th>Expected Arrival Date</th>
                <th>Current Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredIncomingStock" :key="item.sku">
                <td>{{ item.name }}</td>
                <td>{{ item.sku }}</td>
                <td>{{ item.incomingStock }}</td>
                <td>{{ item.expectedArrivalDate }}</td>
                <td>{{ item.currentStock }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FilterPanel from '@/components/FilterPanel.vue';
import NavBar from '@/components/NavBar.vue';
import LogOut from "@/components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoAccess from '@/components/NoAccess.vue';
import Logo from '@/components/Logo.vue';

export default {
  name: 'AlertsPage',
  components: {
    FilterPanel,
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

        const inventoryData = inventoryResponse.data.map(item => {
          const status = item.currentStock <= item.stockLevel
            ? (item.currentStock < item.stockLevel / 2 ? 'Critical Low' : 'Low Stock')
            : (item.currentStock > item.stockLevel * 1.5 ? 'Excess Stock' : 'Surplus');
          return { ...item, status };
        });

        this.lowStockItems = inventoryData.filter(item => item.status === 'Low Stock' || item.status === 'Critical Low');
        this.surplusStockItems = inventoryData.filter(item => item.status === 'Surplus' || item.status === 'Excess Stock');
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
.alerts-page {
  background-color: #FAEDCD; /* Consistent with project theme */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 20px;
  padding-left: 120px; /* Adjust for NavBar space */
  width: calc(100% - 120px);
  box-sizing: border-box;
  height: 100vh;
}

h2 {
  color: #606C38; /* Title color */
  font-size: 28px;
  text-align: center; /* Center the title */
  width: 100%; /* Full width for centering */
  margin-bottom: 20px;
}

.left-side {
  width: 50px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f4f4f4;
  transition: width 0.3s;
  z-index: 5;
}

.right-side {
  margin-left: 50px;
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s;
}

.alerts-section {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e2c499;
  border-radius: 8px;
  background-color: #FEFAE0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #C58E4F;
  font-size: 20px;
  margin-bottom: 10px;
}

.section-content {
  display: flex;
  gap: 20px;
}

.alerts-table {
  width: 100%; /* Full width */
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden; /* Removed scroll */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.alerts-table th {
  background-color: #D4A373;
  color: #283618;
  padding: 12px;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
}

.alerts-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.alerts-table tr:nth-child(even) {
  background-color: #E6CEAD;
}

.alerts-table tr:hover {
  background-color: #FFE4B2;
  transition: background-color 0.3s;
}

@media (max-width: 768px) {
  .alerts-page {
    padding-left: 10px;
    width: 100%;
  }

  .section-content {
    flex-direction: column;
    gap: 10px;
  }
}
</style>