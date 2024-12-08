<template>
  <div
    v-if="!user"
    style="text-align:center;"
  >
    <NoAccess />
  </div>
  
  <div 
    v-if="user"
    class="main-dashboard"
  >
    <div class="left-side">
      <NavBar
        :collapsed="collapsed" 
        @update:collapsed="onToggleCollapse"
      />
    </div>

    <div class="right-side">
      <div class="dashboard-container">
        <Logo />
        <LogOut />
        <div class="dashboard-content">
          <div class="dashboard-card">
            <h2 class="dashboard-title">Total Items</h2>
            <div class="card-value">
              {{ totalItems }}
            </div>
            <div 
              v-for="item in topTotalItems"
              :key="item.sku"
            >
              {{ item.product_name }}: {{ item.stock_quantity }}
            </div>
            <router-link 
              to="/inventory" 
              class="see-more-btn"
            >
              See More
            </router-link>
          </div>
          
          <div class="dashboard-card">
            <h2 class="dashboard-title">Restock</h2>
            <div class="card-value">
              {{ restock }}
            </div>
            <div 
              v-for="item in topRestockItems" 
              :key="item.sku"
            >
              {{ item.product_name }}: {{ item.low_stock_threshold - item.stock_quantity }}
            </div>
            <router-link 
              to="/inventory" 
              class="see-more-btn"
            >
              See More
            </router-link>
          </div>
            
          <div class="dashboard-card">
            <h2 class="dashboard-title">Excess Stock</h2>
            <div class="card-value">
              {{ excessStock }}
            </div>
            <div 
              v-for="item in topExcessStockItems" 
              :key="item.sku"
            >
              {{ item.product_name }}: {{ item.stock_quantity - item.low_stock_threshold }}
            </div>
            <router-link 
              to="/inventory" 
              class="see-more-btn"
            >
              See More
            </router-link>
          </div>

          <div class="dashboard-card">
            <h2 class="dashboard-title">2023 Sales Performance</h2>
            <div style="height: 150px; width: 100%;">
              <canvas id="salesPerformanceChart" />
              <router-link 
                to="/sales" 
                class="see-more-btn"
              >
                See More
              </router-link>  
            </div>
          </div>

          <div class="dashboard-card">
            <h2 class="dashboard-title">Stock Levels by Category</h2>
            <div class="chart-container">
              <canvas id="categoryPieChart" />
            </div>
          </div>

          <div class="dashboard-card">
            <h2 class="dashboard-title">Alerts</h2>
            <div class="card-content">
              <div v-if="topRestockItem">
                <strong>Restock Needed:</strong><br>
                {{ topRestockItem.product_name }}: {{ topRestockItem.low_stock_threshold - topRestockItem.stock_quantity }} items
              </div>
              <br>
              <div v-if="topExcessStockItem">
                <strong>Excess Stock:</strong> <br>
                {{ topExcessStockItem.product_name }}: {{ topExcessStockItem.stock_quantity - topExcessStockItem.low_stock_threshold }} items
              </div>
              <br>
              <div class="check-notifications">
                <strong>Check Notifications for More Alerts</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LogOut from "@/components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoAccess from '@/components/NoAccess.vue';
import Logo from '@/components/Logo.vue';
import inventoryData from '@/data/inventory_data.json';
import { Chart } from 'chart.js'; 
import salesData from '@/data/sales_data.json';

export default {
  name: 'MainDashboard',
  components: {
    NoAccess,
    NavBar,
    LogOut,
    Logo,
  },
  data() {
    return {
      user: null,
      collapsed: false,
      inventoryData: inventoryData,
      salesData: salesData
    };
  },
  computed: {
    totalItems() {
      return this.inventoryData.reduce((sum, item) => sum + item.stock_quantity, 0);
    },
    restock() {
      // Calculate the total quantity needed to restock items below their threshold
      return this.inventoryData.reduce((sum, item) => {
        if (item.stock_quantity < item.low_stock_threshold) {
          return sum + (item.low_stock_threshold - item.stock_quantity);
        }
        return sum;
      }, 0);
    },
    excessStock() {
      // Calculate the total excess stock above the threshold
      return this.inventoryData.reduce((sum, item) => {
        if (item.stock_quantity > item.low_stock_threshold) {
          return sum + (item.stock_quantity - item.low_stock_threshold);
        }
        return sum;
      }, 0);
    },
    topTotalItems() {
      // Sort by stock_quantity in descending order and take the top 3
      return [...this.inventoryData]
        .sort((a, b) => b.stock_quantity - a.stock_quantity)
        .slice(0, 3);
    },
    topRestockItems() {
      // Sort by the difference (low_stock_threshold - stock_quantity) in descending order and take the top 3
      return [...this.inventoryData]
        .filter(item => item.stock_quantity < item.low_stock_threshold)
        .sort((a, b) => (b.low_stock_threshold - b.stock_quantity) - (a.low_stock_threshold - a.stock_quantity))
        .slice(0, 3);
    },
    topExcessStockItems() {
      // Sort by the difference (stock_quantity - low_stock_threshold) in descending order and take the top 3
      return [...this.inventoryData]
        .filter(item => item.stock_quantity > item.low_stock_threshold)
        .sort((a, b) => (b.stock_quantity - b.low_stock_threshold) - (a.stock_quantity - a.low_stock_threshold))
        .slice(0, 3);
    },
    topRestockItem() {
    return [...this.inventoryData]
      .filter(item => item.stock_quantity < item.low_stock_threshold)
      .sort((a, b) => (b.low_stock_threshold - b.stock_quantity) - (a.low_stock_threshold - a.stock_quantity))[0];
    },
    topExcessStockItem() {
      return [...this.inventoryData]
        .filter(item => item.stock_quantity > item.low_stock_threshold)
        .sort((a, b) => (b.stock_quantity - b.low_stock_threshold) - (a.stock_quantity - a.low_stock_threshold))[0];
    },
    monthlyRevenue() {
      // Initialize an array of 12 elements (one for each month) with zero revenue
      const revenueByMonth = new Array(12).fill(0);

      // Iterate over sales data to aggregate revenue by month
      this.salesData.sales.forEach(sale => {
        const saleDate = new Date(sale.sale_date);
        const monthIndex = saleDate.getMonth(); // Get month as 0-11 index
        revenueByMonth[monthIndex] += sale.revenue; // Add revenue to respective month
      });

      return revenueByMonth;
    },
    filteredData() {
      if (this.selectedCategory) {
        return this.inventoryData.filter(item => item.category === this.selectedCategory);
      }
      return this.inventoryData;
    },
    uniqueCategories() {
      // Get unique categories
      const categories = this.inventoryData.map(item => item.category);
      return [...new Set(categories)];
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log("Inventory data loaded:", this.inventoryData);
        this.$nextTick(() => {
          this.renderPieChart();
          this.renderSalesPerformanceChart();
        });
      }
    });
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    renderSalesPerformanceChart() {
      const ctx = document.getElementById('salesPerformanceChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [{
            label: 'Monthly Revenue',
            data: this.monthlyRevenue,
            borderColor: '#4CAF50', // Set line color
            backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green for area under the line
            fill: true,
            tension: 0.3 // Smooth curve
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Revenue ($)'
              },
              beginAtZero: true
            }
          }
        }
      });
    },
    renderPieChart() {
      // Aggregate the stock quantities by category
      const categoryStock = this.inventoryData.reduce((acc, item) => {
        if (acc[item.category]) {
          acc[item.category] += item.stock_quantity;
        } else {
          acc[item.category] = item.stock_quantity;
        }
        return acc;
      }, {});

      // Prepare data for the pie chart
      const categories = Object.keys(categoryStock);
      const stockQuantities = categories.map(category => categoryStock[category]);

      // Calculate total stock for percentage calculation
      const totalStock = stockQuantities.reduce((sum, quantity) => sum + quantity, 0);

      // Create the pie chart using the Chart constructor
      new Chart(document.getElementById('categoryPieChart'), {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [{
            data: stockQuantities,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'], // Customize colors as needed
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
              boxWidth: 12,
              padding: 10,
              font: {
                size: 11
              }
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  const quantity = tooltipItem.raw;
                  const percentage = ((quantity / totalStock) * 100).toFixed(2);  // Calculate percentage with two decimals
                  return `${tooltipItem.label}: ${quantity} items (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.main-dashboard {
  display: flex;
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

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

.left-side.expanded {
  width: 250px; /* Expand to full width when extended */
}

.right-side {
  margin-left: 50px; /* Initially push content to the right */
  width: calc(100% - 50px);
  padding: 20px;
  transition: margin-left 0.3s, width 0.3s; /* Smooth transition for content resizing */
}

.right-side.expanded {
  margin-left: 250px; /* Shift content right when NavBar is expanded */
  width: calc(100% - 250px);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  position: fixed;
  top: 0;
  left: 50px; /* Start the top bar after the collapsed NavBar */
  right: 0;
  z-index: 10; /* Ensure top bar appears above NavBar */
  box-sizing: border-box;
}

.dashboard-top-container {
  border: 2px solid #ddd; /* Example border */
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9; /* Light background color */
  margin-bottom: 20px; /* Space between this container and the next row */
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px; /* Adjusted space to accommodate the fixed top bar */
  width: 100%;
}

.dashboard-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: start;
  width: 100%;
  max-width: 1600px;
  margin-top: -30px;
  padding-left: 13%;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Creates a square aspect ratio */
  overflow: hidden;
}

.chart-container canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 80% !important;
  height: 80% !important;
}

.dashboard-top,
.dashboard-bottom {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.card-title {
  display: none; /* Remove old card titles */
}

.card-value {
  font-size: 2.5em;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.see-more-btn {
  display: inline-block;
  margin-top: 20px; /* Adjust as needed to move the button lower */
  padding: 10px 20px;
  background-color: #606c38; /* New green shade */
  color: white;
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  text-decoration: none; /* Removes underline for links */
  font-size: 16px;
  transition: background-color 0.3s;
}

.see-more-btn:hover {
  background-color: #4a552b; /* Slightly darker green on hover */
}

.dashboard-title {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0 0 20px 0;
  padding: 0;
  color: #333;
  text-align: center;
  width: 100%;
}

.card-title {
  display: none; /* Remove old card titles */
}

.dashboard-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 25%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Changed from center to ensure consistent header placement */
  min-height: 300px;
  max-height: 400px;
  overflow: hidden;
}

.restock-card {
  background-color: #A6BE96;
}

@media (max-width: 768px) {
  .left-side {
    display: none;
  }

  .right-side {
    margin-left: 0;
    width: 100%;
  }

  .dashboard-card {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .dashboard-content {
    padding-top: 0;
    margin-right: 0;
    margin-left: 0;
    margin-top: -40px;
  }

  .dashboard-top-container {
    margin-bottom: 0; /* Space between this container and the next row */
  }

  .see-more-btn {
    display: none;
  }
}
</style>
