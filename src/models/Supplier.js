// src/models/Supplier.js

export default class Supplier {
  constructor(suppliername, supplierid, contactperson, phonenumber, email, productssupplied, leadtime, status, lastorderdate) {
    this.suppliername = suppliername;              // Supplier ID
    this.supplierid = supplierid;  // Supplier Name
    this.contactperson = contactperson;  // Contact Person
    this.phonenumber = phonenumber;    // Phone Number
    this.email = email;                // Email Address
    this.productssupplied = productssupplied;  // Products Supplied
    this.leadtime = leadtime;          // Lead Time
    this.status = status;              // Supplier Status
    this.lastorderdate = lastorderdate;  // Last Order Date
  }
}

  