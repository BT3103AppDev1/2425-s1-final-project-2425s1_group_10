<template>
  <div
        v-if="!user"
        style="text-align:center;"
    >
        <NoAccess />
    </div>
    <div class="orders-page">
      <div class="left-side">
        <NavBar
            :collapsed="collapsed" 
            @update:collapsed="onToggleCollapse"
        />
      </div>
      <div class="right-side">
        <Logo />
        <LogOut />
        <br>
        <br>
        <br>
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
    </div>
  </template>
  
  <script>
  import SearchAndFilter from '@/components/SearchAndFilter.vue';
  import OrdersTable from '@/components/OrdersTable.vue';
  import NewOrderForm from '@/components/NewOrderForm.vue';
  import Order from '@/models/Order';
  import axios from 'axios';
  import NavBar from '@/components/NavBar.vue';
  import LogOut from "@/components/LogOut.vue";
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import NoAccess from '@/components/NoAccess.vue';
  import Logo from '@/components/Logo.vue';
  
  export default {
    name: 'OrdersPage',
    components: {
      SearchAndFilter,
      OrdersTable,
      NewOrderForm,
      NoAccess,
      NavBar,
      LogOut,
      Logo,
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
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      });
      this.loadOrders();
    }
  };
  </script>
  
  <style scoped>
  .left-side {
  width: 50px; /* Initially narrow for collapsed NavBar */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #f4f4f4;
  transition: width 0.3s; /* Smooth transition for resizing */
  z-index: 5;
}

.right-side {
  margin-left: 50px; /* Initially push content to the right */
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s; /* Smooth transition for content resizing */
}

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
  