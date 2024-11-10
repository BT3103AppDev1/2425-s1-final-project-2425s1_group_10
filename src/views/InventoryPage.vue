<template>
  <div v-if="user" style="text-align:center;">
    <NoAccess />
  </div>
  <div v-else class="inventory-page">
    <NavBar />
    <Logo />

    <!-- Top bar with Search and Add Item Button -->
    <div class="top-bar">
      <div class="search-and-filter">
        <SearchAndFilter @search="onSearch" @filter="applyFilters" />
      </div>
      <button class="add-button" @click="showForm = true">+ Add Item</button>
    </div>

    <!-- Inventory Table -->
    <table class="inventory-table">
      <thead>
        <tr>
          <th @click="sortBy('name')">Product Name</th>
          <th @click="sortBy('sku')">SKU</th>
          <th @click="sortBy('stockLevel')">Stock Level</th>
          <th @click="sortBy('reorderStatus')">Reorder Status</th>
          <th @click="sortBy('category')">Category</th>
          <th @click="sortBy('price')">Price</th>
          <th @click="sortBy('salesRank')">Sales Rank</th>
          <th @click="sortBy('lastRestocked')">Last Restocked</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredInventory" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.sku }}</td>
          <td>{{ item.stockLevel }}</td>
          <td>{{ item.reorderStatus }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.salesRank }}</td>
          <td>{{ item.lastRestocked }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import SearchAndFilter from '@/components/SearchAndFilter.vue';
import NavBar from '@/components/NavBar.vue';
import Logo from '@/components/Logo.vue';
import NoAccess from '@/components/NoAccess.vue';

export default {
  name: 'InventoryPage',
  components: {
    SearchAndFilter,
    NavBar,
    Logo,
    NoAccess
  },
  data() {
    return {
      inventoryItems: [],
      filteredInventory: [],
      searchQuery: '',
      filters: {
        category: '',
        stockLevel: '',
        date: ''
      },
      showForm: false // Control the display of add item form
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
        const matchesStockLevel = !this.filters.stockLevel || item.stockLevel >= parseInt(this.filters.stockLevel, 10);
        const matchesDate = !this.filters.date || item.lastRestocked === this.filters.date;

        return matchesSearch && matchesCategory && matchesStockLevel && matchesDate;
      });
    },
    sortBy(key) {
      this.filteredInventory.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
  },
  mounted() {
    this.loadInventoryData();
  }
};
</script>

<style scoped>
.inventory-page {
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

h1 {
  color: #606C38;
  font-size: 28px;
  margin-bottom: 20px;
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

.add-button {
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

.add-button:hover {
  background-color: #356837;
  transform: scale(1.05);
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.inventory-table th {
  background-color: #dda15e;
  color: #4a4a4a;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.inventory-table td {
  padding: 12px;
  font-size: 14px;
  color: #4a4a4a;
  text-align: center;
}

.inventory-table tr:nth-child(odd) {
  background-color: #fefae0;
}

.inventory-table tr:nth-child(even) {
  background-color: #e6cead;
}

.inventory-table tr:hover {
  background-color: #ffe4b2;
}

.filter-select {
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #4a4a4a;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%234A4A4A' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 12px;
  width: auto;
}

.filter-select:focus {
  outline: none;
  border-color: #a3a3a3;
}

.search-input {
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #4a4a4a;
  width: 100%;
}

.search-input:focus {
  outline: none;
  border-color: #a3a3a3;
}

.date-filter {
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #4a4a4a;
  width: 150px;
}

.date-filter:focus {
  outline: none;
  border-color: #a3a3a3;
}

@media (max-width: 768px) {
  .inventory-page {
    padding-left: 10px;
    width: 100%;
  }

  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .add-button {
    margin-top: 10px;
    align-self: flex-end;
  }
}
</style>
