<template>
  <div
    v-if="user"
    style = "text-align:center;"
    >
  <NoAccess />
  </div> 
    <div v-if="!user" class="orders-page">
      <NavBar />
      <Logo />
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
  import NavBar from '@/components/NavBar.vue';
  import Logo from '@/components/Logo.vue';
  import NoAccess from '@/components/NoAccess.vue';
  
  export default {
    name: 'OrdersPage',
    components: {
      SearchAndFilter,
      OrdersTable,
      NewOrderForm,
      NoAccess,
      NavBar,
      Logo
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
    background-color: #FAEDCD; /* Background color consistent with project */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Align items to the left */
    margin: 0 auto; /* Center horizontally */
    padding: 20px;
    padding-left: 120px; /* Added padding to push content to the right */
    width: calc(100% - 120px); /* Adjust width to avoid overlapping */
    box-sizing: border-box;
    color: #4a4a4a;
    font-family: Arial, sans-serif;
  }

  /* Top bar styling */
  .top-bar {
    width: 100%; /* Full width of the page */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  /* "New Order" button styling */
  .new-order-button {
    padding: 10px 15px;
    background-color: #606C38; /* Consistent green color */
    color: #FEFAE0;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  }

  .new-order-button:hover {
    background-color: #356837; /* Darker green on hover */
    transform: scale(1.05); /* Slightly increase size on hover */
  }

  .new-order-button:focus {
    outline: none;
    background-color: #50632D; /* Focus color */
  }

  /* Table styling */
  .orders-table {
    width: 100%; /* Full width for better fitting */
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    margin-top: 10px;
  }

  .orders-table th {
    background-color: #D4A373; /* Accent color for headers */
    color: #283618;
    padding: 12px 15px;
    text-transform: uppercase;
    font-size: 14px;
  }

  .orders-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #ccc;
  }

  /* Alternate row coloring for readability */
  .orders-table tr:nth-child(even) {
    background-color: #E6CEAD; /* Light background for even rows */
  }

  .orders-table tr:hover {
    background-color: #FFE4B2; /* Highlight color on hover */
    transition: background-color 0.3s;
  }

  /* Styling for the search and filter bar */
  .search-filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; /* Full width to align with page */
    margin-bottom: 20px;
  }

  .search-input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background-color: #FFF7E0; /* Match background */
    font-size: 14px;
  }

  .search-input:focus {
    outline: none;
    border-color: #C4984A; /* Accent on focus */
  }

  .filter-select {
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background-color: #FFF7E0;
    font-size: 14px;
  }

  .filter-select:focus {
    outline: none;
    border-color: #C4984A; /* Accent on focus */
  }

  /* Responsive design adjustments */
  @media (max-width: 768px) {
    .orders-page {
      padding-left: 10px; /* Adjust padding for small screens */
      width: 100%; /* Ensure content takes full width */
    }

    .top-bar {
      flex-direction: column;
      align-items: stretch;
    }

    .search-filter-container {
      flex-direction: column;
      gap: 10px;
      width: 100%; /* Full width on smaller screens */
    }

    .new-order-button {
      align-self: flex-end;
      margin-top: 10px; /* Adjusted space for better positioning */
    }
  }
</style>
