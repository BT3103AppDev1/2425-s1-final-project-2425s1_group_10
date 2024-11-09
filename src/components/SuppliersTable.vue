<template>
    <table class="suppliers-table">
      <thead>
        <tr>
          <th @click="sortBy('name')">Supplier Name</th>
          <th @click="sortBy('id')">Supplier ID</th>
          <th>Contact Person</th>
          <th>Phone Number</th>
          <th>Email Address</th>
          <th>Products Supplied</th>
          <th>Lead Time</th>
          <th>Status</th>
          <th>Last Order Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="supplier in suppliers" :key="supplier.id">
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.id }}</td>
          <td>{{ supplier.contactPerson }}</td>
          <td>{{ supplier.phoneNumber }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.product }}</td>
          <td>{{ supplier.leadTime }}</td>
          <td>{{ supplier.status }}</td>
          <td>{{ supplier.lastOrderDate }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'SuppliersTable',
    props: {
      suppliers: {
        type: Array,
        required: true
      }
    },
    methods: {
      sortBy(key) {
        // eslint-disable-next-line vue/no-mutating-props
        this.suppliers.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      }
    }
  };
  </script>
  
  <style scoped>
  .suppliers-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .suppliers-table th {
    background-color: #d6a05c;
    color: #ffffff;
    padding: 12px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    text-align: left;
  }
  
  .suppliers-table td {
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #4a4a4a;
  }
  
  .suppliers-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  .suppliers-table tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  