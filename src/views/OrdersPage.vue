<template>
  <div v-if="user" style="text-align:center;">
    <NoAccess />
  </div>
  <div v-else class="orders-page">
    <NavBar />
    <Logo />
    
    <!-- Heading for Orders Page -->
    <h2 class="orders-heading" style="color: #606C38; margin-top: 20px;">Orders Page</h2>

    <!-- Top bar with the "New Order" button -->
    <div class="top-bar">
      <div class="search-and-filter">
        <input
          type="text"
          placeholder="Search Order ID"
          v-model="filters.searchQuery"
          @input="filterOrders"
          class="search-input"
        />
        <select v-model="filters.minAmount" @change="filterOrders" class="filter-select">
          <option value="">Min Amount</option>
          <option v-for="amount in minAmounts" :key="amount" :value="amount">{{ amount }}</option>
        </select>
        <select v-model="filters.status" @change="filterOrders" class="filter-select">
          <option value="">Status</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          v-model="filters.date"
          @change="filterOrders"
          class="filter-select date-filter"
          placeholder="Date"
        />
      </div>
      <button class="new-order-button" @click="showForm = true">+ New Order</button>
    </div>

    <!-- Orders Table -->
    <table class="orders-table">
      <thead>
        <tr>
          <th @click="sortBy('order_id')">Order ID</th>
          <th @click="sortBy('customer_name')">Customer Name</th>
          <th @click="sortBy('order_date')">Order Date</th>
          <th @click="sortBy('total_amount')">Total Amount</th>
          <th @click="sortBy('order_status')">Status</th>
          <th>Products Ordered</th>
          <th>Shipping Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.order_id">
          <td>{{ order.order_id }}</td>
          <td>{{ order.customer_name }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.total_amount.toFixed(2) }}</td>
          <td>{{ order.order_status }}</td>
          <td>
            <span v-if="order.products_ordered && order.products_ordered.length">
              {{ order.products_ordered }}
            </span>
            <span v-else>No products listed</span>
          </td>
          <td>{{ order.shipping_address }}</td>
        </tr>
      </tbody>
    </table>

    <!-- New Order Form Modal -->
    <NewOrderForm v-if="showForm" @close="showForm = false" @add-order="addOrder" />
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import Logo from '@/components/Logo.vue';
import NoAccess from '@/components/NoAccess.vue';
import NewOrderForm from '@/components/NewOrderForm.vue';

export default {
  name: 'OrdersPage',
  components: {
    NavBar,
    Logo,
    NoAccess,
    NewOrderForm
  },
  data() {
    return {
      orders: [],
      filteredOrders: [],
      filters: {
        searchQuery: '',
        minAmount: '',
        status: '',
        date: ''
      },
      minAmounts: [50, 100, 150, 200, 250], // Example min amounts
      showForm: false // Controls the visibility of the form modal
    };
  },
  methods: {
    async loadOrders() {
      try {
        const response = await axios.get('/orders_data.json');
        this.orders = response.data.map(order => ({
          ...order,
          products_ordered: order.products_ordered || 'No products listed'
        }));
        this.filteredOrders = this.orders;
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
    filterOrders() {
      this.filteredOrders = this.orders.filter(order => {
        const matchesSearch = !this.filters.searchQuery || order.order_id.toLowerCase().includes(this.filters.searchQuery.toLowerCase());
        const matchesAmount = !this.filters.minAmount || parseFloat(order.total_amount) >= parseFloat(this.filters.minAmount);
        const matchesStatus = !this.filters.status || order.order_status === this.filters.status;
        const matchesDate = !this.filters.date || order.order_date === this.filters.date;

        return matchesSearch && matchesAmount && matchesStatus && matchesDate;
      });
    },
    addOrder(newOrder) {
      this.orders.push(newOrder);
      this.filteredOrders = this.orders;
      this.showForm = false;
    },
    sortBy(key) {
      this.filteredOrders.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }
  },
  mounted() {
    this.loadOrders();
  }
};
</script>

<style scoped>
.orders-page {
  background-color: #FAEDCD;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 20px;
  padding-left: 120px;
  width: calc(100% - 120px);
  box-sizing: border-box;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.search-and-filter {
  flex-grow: 1;
  display: flex;
  gap: 10px;
  margin-right: 20px;
}

.search-input,
.filter-select,
.date-filter {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #4a4a4a;
  width: 200px;
}

.filter-select {
  appearance: none;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  width: auto;
}

.date-filter {
  width: 150px;
}

.search-input:focus,
.filter-select:focus,
.date-filter:focus {
  outline: none;
  border-color: #a3a3a3;
}

.new-order-button {
  padding: 10px 20px;
  background-color: #606C38;
  color: #FEFAE0;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
}

.new-order-button:hover {
  background-color: #356837;
  transform: scale(1.05);
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.orders-table th {
  background-color: #dda15e;
  color: #4a4a4a;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

.orders-table td {
  padding: 12px;
  font-size: 14px;
  color: #4a4a4a;
  text-align: center;
}

.orders-table tr:nth-child(odd) {
  background-color: #fefae0;
}

.orders-table tr:nth-child(even) {
  background-color: #e6cead;
}

.orders-table tr:hover {
  background-color: #ffe4b2;
}

@media (max-width: 768px) {
  .orders-page {
    padding-left: 10px;
    width: 100%;
  }

  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .new-order-button {
    margin-top: 10px;
    align-self: flex-end;
  }
}
</style>
