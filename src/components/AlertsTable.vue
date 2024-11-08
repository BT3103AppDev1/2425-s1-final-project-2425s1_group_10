<template>
    <table class="alerts-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>SKU</th>
          <th v-if="!isIncomingStock">Current Stock</th>
          <th v-if="!isIncomingStock">Stock Level</th>
          <th v-if="!isIncomingStock">Status</th>
          <th v-if="!isIncomingStock">Last Reorder Date</th>
          <th v-if="isIncomingStock">Incoming Stock</th>
          <th v-if="isIncomingStock">Expected Arrival Date</th>
          <th v-if="isIncomingStock">Current Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.sku">
          <td>{{ item.name }}</td>
          <td>{{ item.sku }}</td>
          <td v-if="!isIncomingStock">{{ item.currentStock }}</td>
          <td v-if="!isIncomingStock">{{ item.stockLevel }}</td>
          <td v-if="!isIncomingStock">{{ item.status }}</td>
          <td v-if="!isIncomingStock">{{ item.lastReorderDate }}</td>
          <td v-if="isIncomingStock">{{ item.incomingStock }}</td>
          <td v-if="isIncomingStock">{{ item.expectedArrivalDate }}</td>
          <td v-if="isIncomingStock">{{ item.currentStock }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'AlertsTable',
    props: {
      items: {
        type: Array,
        required: true
      },
      isIncomingStock: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  
  <style scoped>
  .alerts-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .alerts-table th, .alerts-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .alerts-table th {
    background-color: #f4a261;
    color: white;
    font-weight: bold;
  }
  
  .alerts-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  .alerts-table tr:hover {
    background-color: #f1f1f1;
  }
  
  /* Ensures the table fits within the viewport */
  .alerts-table {
    max-height: calc(100vh - 150px); /* Adjust based on header and other elements */
    overflow-y: auto;
  }
  </style>
  