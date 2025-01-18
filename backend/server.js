const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];
let invoices = [];

// Signup endpoint
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ name, email, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return res.status(200).json({ message: "Login successful" });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// CRUD for invoices
app.post("/invoices", (req, res) => {
  const invoice = req.body;
  invoices.push(invoice);
  res.status(201).json({ message: "Invoice created successfully" });
});

app.get("/invoices", (req, res) => {
  res.status(200).json(invoices);
});

app.put("/invoices/:id", (req, res) => {
  const { id } = req.params;
  const updatedInvoice = req.body;
  invoices = invoices.map((invoice) =>
    invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
  );
  res.status(200).json({ message: "Invoice updated successfully" });
});

app.delete("/invoices/:id", (req, res) => {
  const { id } = req.params;
  invoices = invoices.filter((invoice) => invoice.id !== id);
  res.status(200).json({ message: "Invoice deleted successfully" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
