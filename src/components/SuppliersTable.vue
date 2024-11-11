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
          <td>{{ supplier.suppliername }}</td>
          <td>{{ supplier.supplierid }}</td>
          <td>{{ supplier.contactperson }}</td>
          <td>{{ supplier.phonenumber }}</td>
          <td>{{ supplier.email }}</td>
          <td>{{ supplier.product }}</td>
          <td>{{ supplier.leadtime }}</td>
          <td>{{ supplier.status }}</td>
          <td>{{ supplier.lastorderdate }}</td>
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
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .suppliers-table th {
      background-color: #dda15e; /* Header color */
      color: #4a4a4a; /* Dark color for text */
      padding: 12px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }

    .suppliers-table td {
      padding: 12px;
      font-size: 14px;
      color: #4a4a4a;
      text-align: center; /* Center-align text */
    }

    /* Alternate row coloring */
    .suppliers-table tr:nth-child(odd) {
      background-color: #fefae0; /* Light cream color */
    }

    .suppliers-table tr:nth-child(even) {
      background-color: #e6cead; /* Slightly darker beige */
    }

    .suppliers-table tr:hover {
      background-color: #ffe4b2; /* Highlight color on hover */
    }


  </style>
  