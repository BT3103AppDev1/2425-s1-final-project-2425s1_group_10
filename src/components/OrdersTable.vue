<template>
    <table class="orders-table">
      <thead>
        <tr>
          <th @click="sortBy('id')">Order ID</th>
          <th>Customer Name</th>
          <th>Order Date</th>
          <th>Total Amount</th>
          <th>Order Status</th>
          <th>Products Ordered</th>
          <th>Shipping Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.amount }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.products }}</td>
          <td>{{ order.shippingAddress }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'OrdersTable',
    props: {
      orders: {
        type: Array,
        required: true
      }
    },
    methods: {
      sortBy(key) {
        // eslint-disable-next-line vue/no-mutating-props
        this.orders.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      }
    }
  };
  </script>
  
  <style scoped>
  .orders-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .orders-table th {
    background-color: #d6a05c;
    color: #ffffff;
    padding: 12px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    text-align: left;
  }
  
  .orders-table td {
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #4a4a4a;
  }
  
  .orders-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  .orders-table tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  