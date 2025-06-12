import API from './api';

export const loginUser = (data) => API.post('/auth/login', data);
export const createUser = (data) => API.post('/users', data);
export const getUsers = () => API.get('/users');
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const createInvoice = (data) => API.post('/invoices', data);
export const getInvoices = (params) => API.get('/invoices', { params });
export const updateInvoice = (invoiceNumber, data) => API.put(`/invoices/${invoiceNumber}`, data);
export const deleteInvoice = (invoiceNumber) => API.delete(`/invoices/${invoiceNumber}`);
