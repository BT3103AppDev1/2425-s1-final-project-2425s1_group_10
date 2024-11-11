<template>
  <div
  v-if="!user"
  style = "text-align:center;"
  > 
<NoAccess />
</div>

  <div v-if ="user" class="app-layout">
    <NavBar />
    <Logo />
 
    <!-- Centering Container -->
    <div class="center-container">
      <div class="content">
        <h1>Sales Overview</h1>
        
        <!-- Toggle Sales Records and Add New Sale Form Buttons -->
        <div class="actions">
          <button @click="toggleSalesRecords">{{ showSalesRecords ? 'Hide Sales Records' : 'View Sales Records' }}</button>
          <button @click="exportSalesData" class="export-button">Export Sales Data</button>
          <button @click="toggleAddSaleForm">+</button>
        </div>

      <!-- Add Sale Form (Shown only if showAddSaleForm is true) -->
      <div v-if="showAddSaleForm" class="add-sales-form-container">
        <div class="add-sales-form">
          
          <h2>Add New Sale</h2>
          <button type="button" class="close-button" @click="closeAddSaleForm">X</button>
          <form @submit.prevent="addSale">
            <div class="form-group">
              <label>Product Name:</label>
              <input v-model="newSale.product_name" required />
            </div>
            <div class="form-group">
              <label>SKU:</label>
              <input v-model="newSale.sku" required />
            </div>
            <div class="form-group">
              <label>Category:</label>
              <select v-model="newSale.category" required>
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Tablets">Tablets</option>
                <option value="Accessories">Accessories</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
            </div>
            <div class="form-group">
              <label>Units Sold:</label>
              <input type="number" v-model.number="newSale.units_sold" required />
            </div>
            <div class="form-group">
              <label>Sale Date:</label>
              <input type="date" v-model="newSale.sale_date" required />
            </div>
            <div class="form-group">
              <label>Revenue:</label>
              <input type="number" v-model.number="newSale.revenue" required />
            </div>
            <div class="form-group">
              <label>Profit:</label>
              <input type="number" v-model.number="newSale.profit" required />
            </div>
            <div class="form-group">
              <label>Sales Rank:</label>
              <select v-model="newSale.sales_rank" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="submit">Add Sale</button>
          </form>
        </div>
      </div>
     


      <!-- Sales Records List (Shown only if showSalesRecords is true) -->
      <div v-if="showSalesRecords" class="all-sales-records">
        <h2>All Sales Records</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Units Sold</th>
              <th>Sale Date</th>
              <th>Revenue</th>
              <th>Profit</th>
              <th>Sales Rank</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sale, index) in salesData" :key="index">
              <td>{{ sale.product_name }}</td>
              <td>{{ sale.sku }}</td>
              <td>{{ sale.category }}</td>
              <td>{{ sale.units_sold }}</td>
              <td>{{ sale.sale_date }}</td>
              <td>{{ sale.revenue }}</td>
              <td>{{ sale.profit }}</td>
              <td>{{ sale.sales_rank }}</td>
              <td><button @click="deleteSale(sale.id)">Delete</button></td>
            </tr>
          </tbody>
        </table>
        <div class="actions-bottom">
    <button @click="toggleSalesRecords">Hide Sales Records</button>
  </div>
</div>


      <!-- Year Selection Dropdown -->
      <div class="year-selector">
        <label for="year">Select Year: </label>
        <select id="year" v-model="selectedYear">
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <!-- Sales Summary -->
      <div class="summary">
        <p>Total Revenue: {{ totalRevenue }}</p>
        <p>Top-Selling Product: {{ topProduct }}</p>
      </div>

      <!-- Charts Section -->
      <div class="charts-container">
        <div class="chart-container">
          <h2>Monthly Revenue Trends</h2>
          <canvas id="salesTrendChart"></canvas>
        </div>
        <div class="chart-container">
          <h2>Revenue by Category</h2>
          <canvas id="salesCategoryChart"></canvas>
        </div>
      </div>

      <!-- Performance Tables Section -->
      <div class="performance-tables">
        <div class="table-container">
          <h2>Best Performers</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Units Sold</th>
                <th>Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in bestPerformers" :key="index">
                <td>{{ product.product_name }}</td>
                <td>{{ product.units_sold }}</td>
                <td>{{ product.revenue }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-container">
          <h2>Worst Performers</h2>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Units Sold</th>
                <th>Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in worstPerformers" :key="index">
                <td>{{ product.product_name }}</td>
                <td>{{ product.units_sold }}</td>
                <td>{{ product.revenue }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, inject, computed, onMounted, watch, nextTick } from 'vue';
import { ref as dbRef, push, remove } from 'firebase/database';
import Chart from 'chart.js/auto';
import NavBar from '@/components/NavBar.vue';
import { salesDatabase } from '@/firebaseSales'; // Adjust this path as needed
import Logo from '@/components/Logo.vue';
import NoAccess from '@/components/NoAccess.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const groupProducts = (salesData) => {
  const productMap = salesData.reduce((acc, sale) => {
    if (!acc[sale.product_name]) {
      acc[sale.product_name] = {
        product_name: sale.product_name,
        units_sold: 0,
        revenue: 0,
      };
    }
    acc[sale.product_name].units_sold += sale.units_sold;
    acc[sale.product_name].revenue += sale.revenue;
    return acc;
  }, {});
  return Object.values(productMap);
};

export default {
  name: 'SalesPage',
  components: {
    NavBar,
    Logo,
    NoAccess
  },
  setup() {
    const user = ref(null);
    
    const salesData = inject('salesData');
    const showAddSaleForm = ref(false); // Controls visibility of the add sale form
    const showSalesRecords = ref(false); // Controls visibility of the sales records list
    const selectedYear = ref(new Date().getFullYear());

    // Define newSale to hold form data for adding new sales
    const newSale = ref({
      product_name: '',
      sku: '',
      category: '',
      units_sold: 0,
      sale_date: '',
      revenue: 0,
      profit: 0,
      sales_rank: 'Low',
    });

    // Toggles visibility of the add sale form
    const toggleAddSaleForm = () => {
  if (!showAddSaleForm.value) {
    showAddSaleForm.value = true; // Show the form only
  }
};


    // Toggles visibility of the sales records list
    const toggleSalesRecords = () => {
      showSalesRecords.value = !showSalesRecords.value;
    };

    // Add a new sale to Firebase
    const addSale = async () => {
  try {
    // Push new sale data to Firebase and retrieve the generated reference
    const newSaleRef = await push(dbRef(salesDatabase, 'sales'), newSale.value);
    const newSaleId = newSaleRef.key; // Firebase-generated ID

    // Update the local salesData with the new record and its ID
    salesData.push({
      id: newSaleId, // Use Firebase's unique ID
      ...newSale.value,
    });

    // Clear the form after submission
    newSale.value = {
      product_name: '',
      sku: '',
      category: '',
      units_sold: 0,
      sale_date: '',
      revenue: 0,
      profit: 0,
      sales_rank: 'Low',
    };

    showAddSaleForm.value = false;
    alert('Sale added successfully!');
  } catch (error) {
    console.error('Error adding sale:', error);
    alert('Failed to add sale. Please try again.');
  }
};


    // Delete a sale from Firebase
   // SalesPage.vue

const deleteSale = async (saleId) => {
  try {
    console.log('Deleting sale with ID:', saleId);
    const dbSaleRef = dbRef(salesDatabase, `sales/${saleId}`);
    await remove(dbSaleRef);
    console.log('Successfully deleted from Firebase');

    // Find the index of the sale in `salesData` and remove it
    const index = salesData.findIndex((sale) => sale.id === saleId);
    if (index !== -1) {
      salesData.splice(index, 1); // Remove from the reactive array
      console.log('Successfully removed from local array');
    } else {
      console.warn('Sale not found in local array');
    }

    alert('Sale deleted successfully!');
  } catch (error) {
    console.error('Error deleting sale:', error);
    alert('Failed to delete sale. Please try again.');
  }
};



    // Computed properties and chart logic
    const filteredSalesData = computed(() =>
      salesData.filter((sale) => {
        const saleYear = new Date(sale.sale_date).getFullYear();
        return saleYear === selectedYear.value;
      })
    );

    const availableYears = computed(() => [
      ...new Set(salesData.map((sale) => new Date(sale.sale_date).getFullYear())),
    ].sort((a, b) => a - b)); // Sort years in ascending order

    const groupedProducts = computed(() => groupProducts(filteredSalesData.value));

    const totalRevenue = computed(() =>
      groupedProducts.value.reduce((sum, product) => sum + product.revenue, 0)
    );

    const topProduct = computed(() => {
      if (groupedProducts.value.length === 0) return 'N/A';
      const topSale = groupedProducts.value.reduce((a, b) =>
        a.units_sold > b.units_sold ? a : b
      );
      return topSale.product_name;
    });

    const bestPerformers = computed(() =>
      [...groupedProducts.value].sort((a, b) => b.units_sold - a.units_sold).slice(0, 5)
    );

    const worstPerformers = computed(() =>
      [...groupedProducts.value].sort((a, b) => a.units_sold - b.units_sold).slice(0, 5)
    );

    const getMonthlyChartData = () => {
      const revenueByMonth = filteredSalesData.value.reduce((acc, sale) => {
        const date = new Date(sale.sale_date);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        acc[month] = (acc[month] || 0) + sale.revenue;
        return acc;
      }, {});
      return { labels: Object.keys(revenueByMonth).sort(), data: Object.values(revenueByMonth) };
    };

    const getCategoryChartData = () => {
      const revenueByCategory = filteredSalesData.value.reduce((acc, sale) => {
        acc[sale.category] = (acc[sale.category] || 0) + sale.revenue;
        return acc;
      }, {});
      return { labels: Object.keys(revenueByCategory), data: Object.values(revenueByCategory) };
    };

    let monthlyChart = null;
    let categoryChart = null;

    function renderCharts() {
      const { labels: monthlyLabels, data: monthlyData } = getMonthlyChartData();
      if (monthlyChart) monthlyChart.destroy();
      monthlyChart = new Chart(document.getElementById('salesTrendChart').getContext('2d'), {
        type: 'line',
        data: {
          labels: monthlyLabels,
          datasets: [{ label: 'Monthly Revenue', data: monthlyData, borderColor: '#606c38' }],
        },
        options: { responsive: true },
      });

      const { labels: categoryLabels, data: categoryData } = getCategoryChartData();
      if (categoryChart) categoryChart.destroy();
      categoryChart = new Chart(document.getElementById('salesCategoryChart').getContext('2d'), {
        type: 'bar',
        data: {
          labels: categoryLabels,
          datasets: [{ label: 'Revenue by Category', data: categoryData, backgroundColor: '#606c38' }],
        },
        options: { responsive: true },
      });
    }

    // Watch for changes to `selectedYear` and re-render charts
    watch(selectedYear, async () => {
      await nextTick(); // Ensure DOM updates before rendering
      renderCharts();   // Re-render charts when year changes
    });
    
    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (authUser) => {
        user.value = authUser;
        if (user.value) {
          await nextTick(); // Wait for the DOM to update with charts
          renderCharts();
        }
      });
    });
    const closeAddSaleForm = () => {
  showAddSaleForm.value = false;
};
const exportSalesData = () => {
// Convert sales data to CSV format
const csvContent = [
  ["Product Name", "SKU", "Category", "Units Sold", "Sale Date", "Revenue", "Profit", "Sales Rank"], // Header row
  ...salesData.map(sale => [
    sale.product_name,
    sale.sku,
    sale.category,
    sale.units_sold,
    sale.sale_date,
    sale.revenue,
    sale.profit,
    sale.sales_rank
  ])
]
  .map(e => e.join(","))
  .join("\n");

// Create a blob and a download link
const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.setAttribute("download", "sales_data.csv");
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
};


    return {
      user,
      showAddSaleForm,
   closeAddSaleForm,
      toggleAddSaleForm,
      showSalesRecords,
      toggleSalesRecords,
      newSale,
      addSale,
      deleteSale,
      salesData,
      selectedYear,
      availableYears,
      totalRevenue,
      topProduct,
      bestPerformers,
      worstPerformers,
      exportSalesData
    };
  },
};
</script>


<style scoped>
.actions button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s;
}

/* "View Sales Records" button styling */
.actions button:first-child {
  background-color: #606c38; /* Green color for "View Sales Record" */
  color: white;

}

.actions button:first-child:hover {
  background-color: #356837 /* Darker green on hover */
}

/* "Add New Sale" button styling */
.actions button:last-child {
  position: fixed;
  bottom: 20px; /* Distance from the bottom of the screen */
  right: 20px; /* Distance from the right side of the screen */
  background-color: #606c38;
  color: white;
  font-size: 24px; /* Larger font for visibility */
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%; /* Circular shape */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  z-index: 1000; /* Ensures button stays above other elements */
}

.actions button:last-child:hover {
  background-color: #356837;
  transform: scale(1.2); /* Increases size on hover */
}
.add-sales-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.add-sales-form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f3e1bc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Space between form groups */
}

.form-group label {
  width: 120px; /* Fixed width for consistent alignment */
  text-align: right;
  margin-right: 10px;
}

.form-group input,
.form-group select {
  flex: 1; /* Take up remaining space */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #606c38;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

button[type="submit"]:hover {
  background-color: #50632d;
}

.add-sales-form-container.add-sales-form.close-button {
  background-color: #d9534f; /* Red color for visibility */
  color: white;
  border: none;
  font-size: 18px;
  width: 30px;
  height: 30px;
  border-radius: 50%; /* Circular shape */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.all-sales-records {
  margin-top: 20px;
  padding: 15px;
  background-color: #faedcd;
  border-radius: 8px;
}

.all-sales-records h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.all-sales-records table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.all-sales-records th, .all-sales-records td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.all-sales-records button {
  padding: 5px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.all-sales-records button:hover {
  background-color: #c9302c;
}
.close-button {
  position: absolute;
  top:110px;
  left:560px;
  width: 30px;
  height: 30px;
  background-color: #d9534f; /* Bright red color for visibility */
  color: white;
  border: none;
  font-size: 15px;
  font-weight: bold;
  border-radius: 50%; /* Make it circular */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow */
  transition: transform 0.2s, background-color 0.2s; /* Animation effects */
}

.close-button:hover {
  background-color: #c9302c; /* Darker red on hover */
  transform: scale(1.1); /* Slightly enlarge on hover */
}
/* Add styling for the year selector dropdown */
.year-selector {
  margin-bottom: 20px;
  font-size: 18px;
}
.year-selector select {
  padding: 5px;
  font-size: 16px;
}


/* Main layout container */
.app-layout {
  display: flex;
  height: 100vh; /* Full viewport height */

}
.center-container {
  display: flex;
  justify-content: center; /* Center horizontally */

  width: 100%;
  padding: -200px; /* Optional: Adjust for spacing */
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px; /* Adjust width to fit sidebar content */
  background-color: #dda15e;
}




/* Main content area */
.content {
flex: 1;
overflow-y: auto;

box-sizing: border-box;
background-color: #faedcd;

}


/* Adjust other elements like summary, charts, and tables */
.summary {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.charts-container {
  display: flex;
  gap: 20px;
}

.chart-container {
  flex: 1;
  max-width: 45%;
}

.performance-tables {
  display: flex;
  justify-content: left;
  gap: 20px;
  margin-top: 30px;
}

.table-container {
  flex: 1;
  max-width: 45%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #d4a373;
  color: #283618;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

tbody tr {
  background-color: #e6cead;
  transition: background-color 0.3s;
}

tbody tr:nth-child(even) {
  background-color: #f3e1bc;
}

tbody tr:hover {
  background-color: #ffe4b2;
}
content.h1 {
margin-top: 0; 
align-items: center;


}
.actions-bottom {
  display: flex;
  justify-content: center; 
  margin-top: 20px;
}

.actions-bottom button {
  background-color: #606c38;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions-bottom button:hover {
  background-color: #356837;
}
.actions button.export-button {
background-color: #606c38;
color: white;
}

.actions button.export-button:hover {
background-color: #356837; 
}

</style>