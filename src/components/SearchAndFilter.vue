<template>
    <div class="search-and-filter">
      <!-- Search input on the left -->
      <div class="search-container">
        <input
          type="text"
          placeholder="Search Supplier Name"
          v-model="searchQuery"
          @input="onSearch"
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>
  
      <!-- Filters on the right -->
      <div class="filter-container">
        <select v-model="selectedCategory" @change="onFilterChange" class="filter-select">
          <option value="">Category</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Tablets">Tablets</option>
          <option value="Accessories">Accessories</option>
        </select>
        
        <select v-model="selectedStatus" @change="onFilterChange" class="filter-select">
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="On Hold">On Hold</option>
        </select>
        
        <input
          type="date"
          v-model="selectedDate"
          @change="onFilterChange"
          class="filter-select date-filter"
          placeholder="Date"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchAndFilter',
    data() {
      return {
        searchQuery: '',
        selectedCategory: '',
        selectedStatus: '',
        selectedDate: ''
      };
    },
    methods: {
      onSearch() {
        this.$emit('search', this.searchQuery);
      },
      onFilterChange() {
        this.$emit('filter', {
          category: this.selectedCategory,
          status: this.selectedStatus,
          date: this.selectedDate
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Container for search bar on left and filters on right */
  .search-and-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  /* Search container with icon */
  .search-container {
    position: relative;
    width: 250px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px 40px 10px 20px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    color: #4a4a4a;
    background-color: #f5f5f5;
  }
  
  .search-icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    font-size: 16px;
    color: #a3a3a3;
  }
  
  /* Filter container on the right */
  .filter-container {
    display: flex;
    gap: 15px;
  }
  
  /* Common styling for all filters */
  .filter-select {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #4a4a4a;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='%234A4A4A' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 15px center;
  }
  
  .date-filter {
    width: 130px; /* Adjust as needed */
  }
  
  .filter-select:focus {
    outline: none;
    border-color: #a3a3a3;
  }
  </style>
  