import axios from "axios";

const API = axios.create({
  baseURL: "https://fin-five-server.vercel.app", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT Token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("fin5ive_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- PUBLIC ENDPOINTS ---
export const createContact = (data) => API.post("/contacts", data);
export const submitApplication = (formData) => API.post("/applications", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});

// --- AUTH ENDPOINTS ---
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);

// --- CLIENT PORTAL ENDPOINTS ---
export const getUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, userData) => API.patch(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// --- ADMIN PORTAL ENDPOINTS ---
// Contacts / Leads
export const getAllContacts = () => API.get("/contacts");
export const updateContact = (id, data) => API.patch(`/contacts/${id}`, data).catch(() => API.put(`/contacts/${id}`, data));
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

// Customers (Auto-Fallback: Tries plural /customers, if 404, tries singular /customer)
export const getCustomer = (id) => API.get(`/customers/${id}`).catch(() => API.get(`/customer/${id}`));
export const getAllCustomers = () => API.get("/customers").catch(() => API.get("/customer"));
export const createCustomer = (data) => API.post("/customers", data).catch(() => API.post("/customer", data));
export const deleteCustomer = (id) => API.delete(`/customers/${id}`).catch(() => API.delete(`/customer/${id}`));

// Documents
export const getAllDocuments = () => API.get("/documents");
export const getCustomerDocuments = (customerId) => API.get(`/documents/customer/${customerId}`);
export const downloadDocument = (id) => API.get(`/documents/${id}/download`, { responseType: 'blob' });
export const deleteDocumentApi = (id) => API.delete(`/documents/${id}`);

// Upload Document (Auto-Fallback between /documents/upload and /documents)
export const uploadDocumentAdmin = (formData) => API.post("/documents/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
}).catch(() => API.post("/documents", formData, { headers: { "Content-Type": "multipart/form-data" } }));