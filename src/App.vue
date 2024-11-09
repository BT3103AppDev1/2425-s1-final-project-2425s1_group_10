<template>
  <router-view />
</template>
  
  <script>
  import { ref, get, child } from 'firebase/database';
  import { salesDatabase } from './firebaseSales'; 
  import { reactive } from 'vue';
  console.log("in App")
  export default{
    name: 'App',
    provide() {
    return {
      salesData: this.sales, // Provide sales data reactively
    };
  },
  data() {
    return {
      sales: reactive([]), // Use reactive array for reactivity
    };
  },
  async created() {
    await this.fetchSalesData(); // Fetch sales data on component creation
  },
  methods: {
    async fetchSalesData() {
  try {
    const dbRef = ref(salesDatabase); // Reference to Firebase Database
    const snapshot = await get(child(dbRef, 'sales')); // Fetch 'sales' node

    if (snapshot.exists()) {
      const rawData = snapshot.val(); // Get raw data from Firebase
      console.log('Raw Firebase data:', rawData); // Debugging log

      // Convert the Firebase data to an array of sales objects with `id` as the Firebase key
      const salesData = Object.keys(rawData).map((key) => ({
        id: key, // Firebase-generated key as 'id'
        ...rawData[key],
      }));
      console.log('Parsed sales data with IDs:', salesData); // Debugging log

      // Update the reactive sales array
      this.sales.splice(0, this.sales.length, ...salesData);
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
}

  },
  }
  </script>
  
  <style>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #faedcd; /* Set your desired background color */
  font-family: Arial, sans-serif; /* Optional: Set a global font */
}

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }
  </style>