import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import InvoiceForm from "./components/InvoiceForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/invoiceForm" element={<InvoiceForm />} />
        <Route path="/invoiceForm/:index" element={<InvoiceForm />} />
      </Routes>
    </Router>
  );
};

export default App;
