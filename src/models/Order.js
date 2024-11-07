// src/models/Order.js

export default class Order {
    constructor(order_id, customer_name, order_date, total_amount, order_status, products_ordered, shipping_address) {
      this.id = order_id;
      this.customerName = customer_name;
      this.date = order_date;
      this.amount = total_amount;
      this.status = order_status;
      this.products = products_ordered;
      this.shippingAddress = shipping_address;
    }
  }
  