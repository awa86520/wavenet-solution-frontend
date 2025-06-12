import React, { useEffect, useState } from 'react';
import { createInvoice, getInvoices, deleteInvoice, updateInvoice } from '../services/auth';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({ invoiceNumber: '', invoiceDate: '', invoiceAmount: '' });

  const fetchInvoices = async () => {
    const res = await getInvoices();
    setInvoices(res.data);
  };

  useEffect(() => { fetchInvoices(); }, []);

  const handleCreate = async () => {
    await createInvoice(form);
    setForm({ invoiceNumber: '', invoiceDate: '', invoiceAmount: '' });
    fetchInvoices();
  };

  const handleDelete = async (invoiceNumber) => {
    await deleteInvoice(invoiceNumber);
    fetchInvoices();
  };

  const handleUpdate = async (invoiceNumber, invoiceAmount) => {
    await updateInvoice(invoiceNumber, { invoiceAmount });
    fetchInvoices();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Invoices</h2>

      <div>
        <input 
          placeholder="Invoice Number" 
          value={form.invoiceNumber} 
          onChange={(e) => setForm({...form, invoiceNumber: e.target.value})} 
        />
        <input 
          placeholder="Invoice Date (YYYY-MM-DD)" 
          value={form.invoiceDate} 
          onChange={(e) => setForm({...form, invoiceDate: e.target.value})} 
        />
        <input 
          placeholder="Amount" 
          value={form.invoiceAmount} 
          onChange={(e) => setForm({...form, invoiceAmount: e.target.value})} 
        />
        <button onClick={handleCreate}>Create Invoice</button>
      </div>

      <table border="1" style={{ marginTop: 20 }}>
        <thead><tr><th>Invoice #</th><th>Date</th><th>Amount</th><th>Actions</th></tr></thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv._id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.invoiceDate.slice(0,10)}</td>
              <td>
                <input 
                  type="number" 
                  value={inv.invoiceAmount} 
                  onChange={(e) => handleUpdate(inv.invoiceNumber, e.target.value)}
                />
              </td>
              <td><button onClick={() => handleDelete(inv.invoiceNumber)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDashboard;
