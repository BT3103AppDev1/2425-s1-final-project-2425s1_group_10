<template>
    <div class="modal-overlay">
      <div class="modal">
        <h3>Add New Order</h3>
        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="order_id" placeholder="Order ID" required />
          <input type="text" v-model="customer_name" placeholder="Customer Name" required />
          <input type="date" v-model="order_date" placeholder="Order Date" required />
          <input type="number" v-model="total_amount" placeholder="Total Amount" required />
          <input type="text" v-model="order_status" placeholder="Order Status" required />
          <input type="text" v-model="products_ordered" placeholder="Products Ordered" required />
          <input type="text" v-model="shipping_address" placeholder="Shipping Address" required />
          <button type="submit" class="submit-button">Submit</button>
        </form>
        <button @click="$emit('close')" class="close-button">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NewOrderForm',
    data() {
      return {
        order_id: '',
        customer_name: '',
        order_date: '',
        total_amount: '',
        order_status: '',
        products_ordered: '',
        shipping_address: ''
      };
    },
    methods: {
      handleSubmit() {
        const newOrder = {
          order_id: this.order_id,
          customer_name: this.customer_name,
          order_date: this.order_date,
          total_amount: this.total_amount,
          order_status: this.order_status,
          products_ordered: this.products_ordered,
          shipping_address: this.shipping_address
        };
        this.$emit('add-order', newOrder); // Emit the new order to be added to the main list
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
  