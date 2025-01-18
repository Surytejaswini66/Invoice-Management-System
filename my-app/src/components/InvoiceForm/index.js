import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    clientName: "",
    email: "",
    amount: "",
    status: "Unpaid", // Default value
  });

  const navigate = useNavigate();
  const { index } = useParams();
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices from localStorage on component mount
  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(storedInvoices);

    if (index !== undefined) {
      const invoiceToEdit = storedInvoices[index];
      if (invoiceToEdit) {
        setInvoiceData(invoiceToEdit);
      }
    }
  }, [index]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (index !== undefined) {
      // Update existing invoice
      const updatedInvoices = [...invoices];
      updatedInvoices[index] = invoiceData;
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    } else {
      // Add new invoice
      const updatedInvoices = [...invoices, invoiceData];
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    }

    // Navigate to the home page after saving
    navigate("/home");
  };

  return (
    <div>
      <h2>{index !== undefined ? "Edit Invoice" : "Create Invoice"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice Number:</label>
          <input
            type="text"
            name="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={invoiceData.clientName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={invoiceData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={invoiceData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            name="status"
            value={invoiceData.status}
            onChange={handleChange}
            required
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <button type="submit">
          {index !== undefined ? "Update Invoice" : "Create Invoice"}
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
