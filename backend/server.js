const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API endpoint for dashboard metrics
app.get("/api/dashboard/metrics", (req, res) => {
  res.json({
    totalLoans: 24,
    activeLoans: 18,
    overduePayments: 3,
    totalCollection: 245800,
    totalCollectionFormatted: "₹2,45,800",
    totalLoansChange: "+12%",
    activeLoansRate: "75%",
    overduePaymentsNote: "Requires attention",
    totalCollectionChange: "+8%"
  });
});

// API endpoint for monthly collection trend (sample data)
app.get("/api/dashboard/monthly-collection", (req, res) => {
  res.json({
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep","Oct","Nov","Dec"],
    collection: [20000, 2000, 25000, 2000, 2700, 300, 32000, 3000,4533,24541,7855,12345]
  });
});

// API endpoint for loan status distribution (sample data)
app.get("/api/dashboard/loan-status", (req, res) => {
  res.json({
    statuses: ["Active", "Closed", "Overdue"],
    counts: [18, 5, 3]
  });
});

const customers = [
  {
    id: 1,
    name: 'John Doe',
    mobile: '1234567890',
    loanNumber: 'LN001',
    loanAmount: '1,00,000',
    vehicleNumber: 'KA01AB1234',
    loanStatus: 'Active',
    nextEmiDate: '2024-10-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    mobile: '0987654321',
    loanNumber: 'LN002',
    loanAmount: '2,50,000',
    vehicleNumber: 'KA02CD5678',
    loanStatus: 'Active',
    nextEmiDate: '2024-10-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    mobile: '1122334455',
    loanNumber: 'LN003',
    loanAmount: '5,00,000',
    vehicleNumber: 'KA03EF9012',
    loanStatus: 'Closed',
    nextEmiDate: '-',
  },
];

// GET customers
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

// POST add new customer
app.post("/api/customers", (req, res) => {
  const newCustomer = req.body;
  newCustomer.id = customers.length + 1;
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// GET customer by ID
app.get("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find(c => c.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json(customer);
});

// PUT update customer by ID
app.put("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const customerIndex = customers.findIndex(c => c.id === customerId);

  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  customers[customerIndex] = { ...customers[customerIndex], ...req.body };
  res.json(customers[customerIndex]);
});

// DELETE customer by ID
app.delete("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const customerIndex = customers.findIndex(c => c.id === customerId);

  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const deletedCustomer = customers.splice(customerIndex, 1);
  res.json(deletedCustomer[0]);
});

const vehicles = [
  {
    id: 1,
    purchaseDate: '2025-05-10',
    vehicleNumber: 'KA01AB1234',
    engineNumber: 'ENG123456',
    chassisNumber: 'M8EY4AA19HP000235',
    makeYear: '2023',
    model: 'MOVE STONE PRO ',
    color: 'Red',
    regnNumber: 'REG123456',
    toolKit: 'Available',
    batteryNumber: 'BAT123456',
    exShowroomPrice: 1500000,
    saleDate: '-',
    vehicleStatus: 'In Stock',
  },
  {
    id: 2,
    purchaseDate: '2025-05-10',
    vehicleNumber: 'KA02AB1234',
    engineNumber: 'ENG123456',
    chassisNumber: 'M8EY4AA19235',
    makeYear: '2023',
    model: 'Model121',
    color: 'Blue',
    regnNumber: 'REG123456',
    toolKit: 'Available',
    batteryNumber: 'BAT123456',
    exShowroomPrice: 1500000,
    saleDate: '2025-09-10',
    vehicleStatus: 'Sold',
  },
  {
    id: 3,
    purchaseDate: '2025-05-10',
    vehicleNumber: 'KA02AB1234',
    engineNumber: 'ENG123456',
    chassisNumber: 'M8EY4AA19235',
    makeYear: '2023',
    model: 'Model121',
    color: 'Blue',
    regnNumber: 'REG123456',
    toolKit: 'Available',
    batteryNumber: 'BAT123456',
    exShowroomPrice: 1500000,
    saleDate: '2025-09-12',
    vehicleStatus: 'Sold', 
  },
  
];

// GET vehicles
app.get("/api/vehicles", (req, res) => {
  res.json(vehicles);
});

// POST add new vehicle
app.post("/api/vehicles", (req, res) => {
  const newVehicle = req.body;
  newVehicle.id = vehicles.length + 1;
  vehicles.push(newVehicle);
  res.status(201).json(newVehicle);
});

// GET vehicle by ID
app.get("/api/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicle = vehicles.find(v => v.id === vehicleId);

  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  res.json(vehicle);
});

// PUT update vehicle by ID
app.put("/api/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);

  if (vehicleIndex === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  vehicles[vehicleIndex] = { ...vehicles[vehicleIndex], ...req.body };
  res.json(vehicles[vehicleIndex]);
});

// DELETE vehicle by ID
app.delete("/api/vehicles/:id", (req, res) => {
  const vehicleId = parseInt(req.params.id);
  const vehicleIndex = vehicles.findIndex(v => v.id === vehicleId);

  if (vehicleIndex === -1) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  const deletedVehicle = vehicles.splice(vehicleIndex, 1);
  res.json(deletedVehicle[0]);
});

// Sample customer enquiries data
const customerEnquiries = [
  {
    id: 1,
    customerName: 'Rajesh Kumar',
    customerAddress: '123 MG Road, Bangalore, Karnataka - 560001',
    mobile: '9876543210',
    interestedVehicle: 'Honda City 2024, Silver Color, Petrol Variant',
    estimateDate: '2024-10-25',
    status: 'New',
    createdAt: '2024-10-15T10:30:00Z'
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    customerAddress: '456 Brigade Road, Bangalore, Karnataka - 560025',
    mobile: '8765432109',
    interestedVehicle: 'Maruti Suzuki Swift, Red Color, Manual Transmission',
    estimateDate: '2024-10-28',
    status: 'In Progress',
    createdAt: '2024-10-14T14:20:00Z'
  },
  {
    id: 3,
    customerName: 'Amit Patel',
    customerAddress: '789 Residency Road, Bangalore, Karnataka - 560025',
    mobile: '7654321098',
    interestedVehicle: 'Hyundai Creta, White Color, Diesel Variant',
    estimateDate: '2024-10-20',
    status: 'Completed',
    createdAt: '2024-10-12T09:15:00Z'
  },
  {
    id: 4,
    customerName: 'Sneha Reddy',
    customerAddress: '321 Koramangala, Bangalore, Karnataka - 560034',
    mobile: '6543210987',
    interestedVehicle: 'Toyota Innova Crysta, Grey Color, Automatic',
    estimateDate: '2024-10-30',
    status: 'New',
    createdAt: '2024-10-16T16:45:00Z'
  },
  {
    id: 5,
    customerName: 'Vikram Singh',
    customerAddress: '654 JP Nagar, Bangalore, Karnataka - 560078',
    mobile: '5432109876',
    interestedVehicle: 'Mahindra XUV700, Black Color, Diesel Variant',
    estimateDate: '2024-10-22',
    status: 'In Progress',
    createdAt: '2024-10-13T11:30:00Z'
  }
];

// GET customer enquiries
app.get("/api/customer-enquiries", (req, res) => {
  res.json(customerEnquiries);
});

// POST add new customer enquiry
app.post("/api/customer-enquiries", (req, res) => {
  const newEnquiry = req.body;
  newEnquiry.id = customerEnquiries.length + 1;
  newEnquiry.status = newEnquiry.status || 'New';
  newEnquiry.createdAt = new Date().toISOString();
  customerEnquiries.push(newEnquiry);
  res.status(201).json(newEnquiry);
});

// GET customer enquiry by ID
app.get("/api/customer-enquiries/:id", (req, res) => {
  const enquiryId = parseInt(req.params.id);
  const enquiry = customerEnquiries.find(e => e.id === enquiryId);

  if (!enquiry) {
    return res.status(404).json({ error: 'Customer enquiry not found' });
  }

  res.json(enquiry);
});

// PUT update customer enquiry by ID
app.put("/api/customer-enquiries/:id", (req, res) => {
  const enquiryId = parseInt(req.params.id);
  const enquiryIndex = customerEnquiries.findIndex(e => e.id === enquiryId);

  if (enquiryIndex === -1) {
    return res.status(404).json({ error: 'Customer enquiry not found' });
  }

  customerEnquiries[enquiryIndex] = { ...customerEnquiries[enquiryIndex], ...req.body };
  res.json(customerEnquiries[enquiryIndex]);
});

// DELETE customer enquiry by ID
app.delete("/api/customer-enquiries/:id", (req, res) => {
  const enquiryId = parseInt(req.params.id);
  const enquiryIndex = customerEnquiries.findIndex(e => e.id === enquiryId);

  if (enquiryIndex === -1) {
    return res.status(404).json({ error: 'Customer enquiry not found' });
  }

  const deletedEnquiry = customerEnquiries.splice(enquiryIndex, 1);
  res.json(deletedEnquiry[0]);
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});

