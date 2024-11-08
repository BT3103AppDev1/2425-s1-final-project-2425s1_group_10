<template>
    <table class="inventory-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>SKU</th>
          <th>Stock Level</th>
          <th>Reorder Status</th>
          <th>Category</th>
          <th>Price</th>
          <th>Sales Rank</th>
          <th>Last Restocked</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.sku">
          <td>{{ item.name }}</td>
          <td>{{ item.sku }}</td>
          <td>{{ item.stockLevel }}</td>
          <td>{{ item.reorderStatus }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price}}</td>
          <td>{{ item.salesRank }}</td>
          <td>{{ item.lastRestocked }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'InventoryTable',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    filters: {
      currency(value) {
        return `$${parseFloat(value).toFixed(2)}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .inventory-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .inventory-table th,
  .inventory-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .inventory-table th {
    background-color: #d6a05c;
    color: white;
    font-weight: bold;
  }
  
  .inventory-table tr:nth-child(even) {
    background-color: #fdf7e7;
  }
  
  .inventory-table tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  