import axios from "axios";

const API_URL = "http://localhost:5000/invoices"; // Replace with your actual API URL

// GET: Fetch all invoices
export const getInvoices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices", error);
  }
};

// POST: Create a new invoice
export const createInvoice = async (invoice) => {
  try {
    const response = await axios.post(API_URL, invoice);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice", error);
  }
};

// PUT: Update an invoice by ID
export const updateInvoice = async (id, updatedInvoice) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedInvoice);
    return response.data;
  } catch (error) {
    console.error("Error updating invoice", error);
  }
};

// DELETE: Delete an invoice by ID
export const deleteInvoice = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting invoice", error);
  }
};
