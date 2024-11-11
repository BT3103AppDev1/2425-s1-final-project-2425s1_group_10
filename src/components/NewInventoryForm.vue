<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>Add New Inventory Item</h3>
        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="product_name" placeholder="Product Name" required />
          <input type="text" v-model="sku" placeholder="SKU" required />
          <input type="number" v-model="stock_level" placeholder="Stock Level" required />
          <input type="text" v-model="reorder_status" placeholder="Reorder Status" required />
          <input type="text" v-model="category" placeholder="Category" required />
          <input type="number" v-model="price" placeholder="Price" required />
          <input type="text" v-model="sales_rank" placeholder="Sales Rank" required />
          <input type="date" v-model="last_restocked" placeholder="Last Restocked" required />
          <button type="submit" class="submit-button">Submit</button>
        </form>
        <button @click="$emit('close')" class="close-button">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewInventoryForm',
    data() {
      return {
        product_name: '',
        sku: '',
        stock_level: '',
        reorder_status: '',
        category: '',
        price: '',
        sales_rank: '',
        last_restocked: ''
      };
    },
    methods: {
      handleSubmit() {
        const newInventoryItem = {
          product_name: this.product_name,
          sku: this.sku,
          stock_level: this.stock_level,
          reorder_status: this.reorder_status,
          category: this.category,
          price: this.price,
          sales_rank: this.sales_rank,
          last_restocked: this.last_restocked
        };
        this.$emit('add-inventory', newInventoryItem); // Emit event with the new inventory data
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .modal h3 {
    margin-bottom: 15px;
    color: #4a4a4a;
    text-align: center;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #d6a05c;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #c58e4f;
  }
  
  .close-button {
    margin-top: 10px;
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px;
  }
  </style>
  