<template>
    <div class="filter-panel">
      <input type="text" v-model="name" placeholder="Product Name" @input="emitFilter" />
      <input type="number" v-model="currentStock" placeholder="Current Stock" @input="emitFilter" />
      <select v-if="!isIncomingStock" v-model="status" @change="emitFilter">
        <option value="">Status</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Critical Low">Critical Low</option>
        <option value="Surplus">Surplus</option>
        <option value="Excess Stock">Excess Stock</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterPanel',
    props: {
      isIncomingStock: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        name: '',
        currentStock: '',
        status: ''
      };
    },
    methods: {
      emitFilter() {
        this.$emit('filter', {
          name: this.name,
          currentStock: this.currentStock,
          status: this.isIncomingStock ? null : this.status
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .filter-panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 15px;
    background-color: #fffaf2;
    border: 1px solid #e2c499;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 200px;
  }
  
  .filter-panel input,
  .filter-panel select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .filter-panel input:focus,
  .filter-panel select:focus {
    border-color: #c58e4f;
    outline: none;
  }
  </style>
  