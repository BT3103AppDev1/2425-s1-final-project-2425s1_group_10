// src/models/Supplier.js

export default class Supplier {
    constructor(supplier_id, supplier_name, contact_person, phone_number, email, products_supplied, lead_time, status, last_order_date) {
      this.id = supplier_id;
      this.name = supplier_name;
      this.contactPerson = contact_person;
      this.phoneNumber = phone_number;
      this.email = email;
      this.product = products_supplied;
      this.leadTime = lead_time;
      this.status = status;
      this.lastOrderDate = last_order_date;
    }
  }
  