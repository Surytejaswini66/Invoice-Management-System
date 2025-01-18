import React, { useState, useEffect } from "react";
import { getInvoices, deleteInvoice } from "../../services/invoiceService";
import { Link } from "react-router-dom";
import "animate.css";
import "./index.css"
const Home = () => {
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices on component mount
  useEffect(() => {
    const fetchInvoices = async () => {
      const invoicesData = await getInvoices();
      setInvoices(invoicesData);
    };
    fetchInvoices();
  }, []);

  // Handle delete invoice
  const handleDelete = async (id) => {
    await deleteInvoice(id);
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  return (
    <div>
      <h2>Invoice List</h2>
      <Link to="/invoiceForm">Create New Invoice</Link>
      <div>
        {invoices.length === 0 ? (
          <p>No invoices available!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.clientName}</td>
                  <td>{invoice.email}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.status}</td>
                  <td>
                    <Link to={`/invoiceForm/${invoice.id}`}>Edit</Link> |
                    <button onClick={() => handleDelete(invoice.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
