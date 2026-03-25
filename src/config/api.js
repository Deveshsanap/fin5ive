import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Changed to local backend
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

// --- AUTH ENDPOINTS ---
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (userData) => API.post("/auth/register", userData);

// --- USER ENDPOINTS ---
export const createUser = (userData) => API.post("/users", userData);
export const getAllUsers = () => API.get("/users");
export const getUser = (id) => API.get(`/users/${id}`);
export const updateUser = (id, userData) => API.patch(`/users/${id}`, userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// --- CONTACTS ENDPOINTS ---
export const createContact = (data) => API.post("/contacts", data);
export const getAllContacts = () => API.get("/contacts");
export const getContactById = (id) => API.get(`/contacts/${id}`);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

// --- CUSTOMERS ENDPOINTS ---
export const createCustomer = (data) => API.post("/customers", data);
export const getAllCustomers = () => API.get("/customers");
export const getCustomer = (id) => API.get(`/customers/${id}`);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

// --- DOCUMENTS ENDPOINTS ---
export const getAllDocuments = () => API.get("/documents"); // <-- Add this line back!
export const uploadDocumentAdmin = (formData) => API.post("/documents/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
export const getCustomerDocuments = (customerId) => API.get(`/documents/customer/${customerId}`);
export const getDocument = (id) => API.get(`/documents/${id}`);
export const deleteDocumentApi = (id) => API.delete(`/documents/${id}`);
export const downloadDocument = (id) => API.get(`/documents/${id}/download`);
// --- APPLICATIONS ENDPOINTS ---
export const submitApplication = (formData) => API.post("/applications", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
export const getAllApplications = () => API.get("/applications");

// --- LEADS ENDPOINTS (New from Docs) ---
export const createLead = (leadData) => API.post("/leads", leadData);
export const getAllLeads = () => API.get("/leads");
export const getLeadStats = () => API.get("/leads/stats");
export const getLead = (id) => API.get(`/leads/${id}`);
export const updateLead = (id, leadData) => API.put(`/leads/${id}`, leadData);
export const deleteLead = (id) => API.delete(`/leads/${id}`);