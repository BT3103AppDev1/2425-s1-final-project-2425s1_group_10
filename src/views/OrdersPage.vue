<template>
    <div class="orders-page">
      <!-- Top bar with search and filter functionality -->
      <div class="top-bar">
        <SearchAndFilter
          @search="filterOrders"
          @filter="applyFilters"
        />
        <button class="new-order-button" @click="showForm = true">+ New Order</button>
      </div>
  
      <!-- Orders Table -->
      <OrdersTable :orders="filteredOrders" />
  
      <!-- New Order Form Modal -->
      <NewOrderForm
        v-if="showForm"
        @close="showForm = false"
        @add-order="addOrder"
      />
    </div>
  </template>
  
  <script>
  import SearchAndFilter from '@/components/SearchAndFilter.vue';
  import OrdersTable from '@/components/OrdersTable.vue';
  import NewOrderForm from '@/components/NewOrderForm.vue';
  import Order from '@/models/Order';
  import axios from 'axios';
  
  export default {
    name: 'OrdersPage',
    components: {
      SearchAndFilter,
      OrdersTable,
      NewOrderForm
    },
    data() {
      return {
        orders: [],
        filteredOrders: [],
        showForm: false // Controls the visibility of the form modal
      };
    },
    methods: {
      async loadOrders() {
        try {
          const response = await axios.get('/orders_data.json');
          this.orders = response.data.map(
            item => new Order(
              item.order_id,
              item.customer_name,
              item.order_date,
              item.total_amount,
              item.order_status,
              item.products_ordered,
              item.shipping_address
            )
          );
          this.filteredOrders = this.orders;
        } catch (error) {
          console.error("Error loading orders:", error);
        }
      },
      filterOrders(query) {
        this.filteredOrders = this.orders.filter(order =>
          order.id.toLowerCase().includes(query.toLowerCase())
        );
      },
      applyFilters(filters) {
        this.filteredOrders = this.orders.filter(order => {
          return (
            (!filters.amount || parseFloat(order.amount) >= parseFloat(filters.amount)) &&
            (!filters.date || order.date === filters.date) &&
            (!filters.status || order.status === filters.status)
          );
        });
      },
      addOrder(newOrder) {
        // Add the new order to the list and update the filteredOrders
        this.orders.push(newOrder);
        this.filteredOrders = this.orders;
        this.showForm = false; // Close the form modal
      }
    },
    mounted() {
      this.loadOrders();
    }
  };
  </script>
  
  <style scoped>
  .orders-page {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #FEFAE0;
    color: #4a4a4a;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .new-order-button {
    padding: 10px 15px;
    background-color: #d6a05c;
    color: #FEFAE0;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  
  .new-order-button:hover {
    background-color: #c58e4f;
  }
  </style>
  