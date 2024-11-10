<template>
  <div v-if="user" style="text-align:center;">
    <NoAccess />
  </div>
  <div v-if="!user" class="orders-page">
    <NavBar />
    <Logo />
    <!-- Top bar with search, filter, and supplier functionality -->
    <div class="top-bar">
      <div class="search-filter-container">
        <input
          v-model="searchQuery"
          @input="filterOrders"
          type="text"
          placeholder="Search Supplier Name"
          class="search-input"
        />
        <select v-model="selectedCategory" @change="filterByCategory" class="filter-select">
          <option value="">Category</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <select v-model="selectedStatus" @change="applyFilters" class="filter-select">
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          v-model="selectedDate"
          @change="filterByDate"
          type="date"
          class="filter-select"
        />
      </div>
      <button class="new-order-button" @click="showForm = true">+ New Order</button>
    </div>

    <!-- Orders Table -->
    <table class="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Order Date</th>
          <th>Total Amount</th>
          <th>Order Status</th>
          <th>Products Ordered</th>
          <th>Shipping Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.amount }}</td>
          <td>{{ order.status }}</td>
          <td>{{ order.productsOrdered }}</td>
          <td>{{ order.shippingAddress }}</td>
        </tr>
      </tbody>
    </table>

    <!-- New Order Form Modal -->
    <NewOrderForm
      v-if="showForm"
      @close="showForm = false"
      @add-order="addOrder"
    />
  </div>
</template>

<script>
import NewOrderForm from '@/components/NewOrderForm.vue';
import Order from '@/models/Order';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import Logo from '@/components/Logo.vue';
import NoAccess from '@/components/NoAccess.vue';

export default {
  name: 'OrdersPage',
  components: {
    NewOrderForm,
    NoAccess,
    NavBar,
    Logo
  },
  data() {
    return {
      orders: [],
      filteredOrders: [],
      categories: ["Electronics", "Home Appliances", "Furniture"], // Example categories
      showForm: false,
      searchQuery: '',
      selectedCategory: '',
      selectedStatus: '',
      selectedDate: ''
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
    filterOrders() {
      this.filteredOrders = this.orders.filter(order =>
        order.supplierName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filterByCategory() {
      if (this.selectedCategory) {
        this.filteredOrders = this.orders.filter(
          order => order.category === this.selectedCategory
        );
      } else {
        this.filteredOrders = this.orders;
      }
    },
    applyFilters() {
      this.filteredOrders = this.orders.filter(order => {
        return (
          (!this.selectedStatus || order.status === this.selectedStatus) &&
          (!this.selectedCategory || order.category === this.selectedCategory)
        );
      });
    },
    filterByDate() {
      if (this.selectedDate) {
        this.filteredOrders = this.orders.filter(
          order => order.date === this.selectedDate
        );
      } else {
        this.filteredOrders = this.orders;
      }
    },
    addOrder(newOrder) {
      this.orders.push(newOrder);
      this.filteredOrders = this.orders;
      this.showForm = false;
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
  color: #4a4a4a;
  font-family: Arial, sans-serif;
}

.top-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.new-order-button {
  padding: 10px 15px;
  background-color: #606C38;
  color: #FEFAE0;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.new-order-button:hover {
  background-color: #356837;
  transform: scale(1.05);
}

.new-order-button:focus {
  outline: none;
  background-color: #50632D;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.orders-table th {
  background-color: #D4A373;
  color: #283618;
  padding: 12px 15px;
  text-transform: uppercase;
  font-size: 14px;
}

.orders-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ccc;
}

.orders-table tr:nth-child(even) {
  background-color: #E6CEAD;
}

.orders-table tr:hover {
  background-color: #FFE4B2;
  transition: background-color 0.3s;
}

.search-filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.search-input, .filter-select {
  width: 250px;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #FFF7E0;
  font-size: 14px;
}

.search-input:focus, .filter-select:focus {
  outline: none;
  border-color: #C4984A;
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
  .search-filter-container {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .new-order-button {
    align-self: flex-end;
    margin-top: 10px;
  }
}
</style>