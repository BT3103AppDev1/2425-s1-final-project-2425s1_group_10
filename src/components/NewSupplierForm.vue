<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>Add New Supplier</h3>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="supplier_name" placeholder="Supplier Name" required />
        <input type="text" v-model="supplier_id" placeholder="Supplier ID" required />
        <input type="text" v-model="contact_person" placeholder="Contact Person" required />
        <input type="tel" v-model="phone_number" placeholder="Phone Number" required />
        <input type="email" v-model="email" placeholder="Email Address" required />
        <input type="text" v-model="products_supplied" placeholder="Products Supplied" required />
        <input type="text" v-model="lead_time" placeholder="Lead Time" required />
        <input type="text" v-model="status" placeholder="Status (Active / On Hold)" required />
        <input type="date" v-model="last_order_date" placeholder="Last Order Date" required />
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <button @click="$emit('close')" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
import { addSupplierToFirebase } from '@/firebaseSuppliers';  // Import the method to add supplier data to Firebase

export default {
  name: 'NewSupplierForm',
  data() {
    return {
      supplier_id: '',
      supplier_name: '',
      contact_person: '',
      phone_number: '',
      email: '',
      products_supplied: '',
      lead_time: '',
      status: '',
      last_order_date: ''
    };
  },
  methods: {
    async handleSubmit() {
      const newSupplier = {
        supplierid: this.supplier_id,  // Use supplierid as the key
        suppliername: this.supplier_name,
        contactperson: this.contact_person,
        phonenumber: this.phone_number,
        email: this.email,
        productssupplied: this.products_supplied,
        leadtime: this.lead_time,
        status: this.status,
        lastorderdate: this.last_order_date
      };

      try {
        // Call the Firebase function to add the new supplier
        await addSupplierToFirebase(newSupplier);
        this.$emit('close');  // Close the modal
      } catch (error) {
        console.error("Error adding new supplier:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Your modal styles */
</style>

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
