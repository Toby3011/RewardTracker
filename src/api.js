import axios from 'axios';

const API_URL = 'http://192.168.178.143:5000/api';

export const fetchTasks = () => axios.get(`${API_URL}/tasks`).then(res => res.data);
export const createTask = (task) => axios.post(`${API_URL}/tasks`, task).then(res => res.data);
export const updateTask = (id, updates) => axios.put(`${API_URL}/tasks/${id}`, updates).then(res => res.data);
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`).then(res => res.data);
export const fetchLogs = (date) => axios.get(`${API_URL}/logs/${date}`).then(res => res.data);
export const upsertLog = (log) => axios.post(`${API_URL}/logs`, log).then(res => res.data);
export const fetchRewards = () => axios.get(`${API_URL}/rewards`).then(res => res.data);
export const createReward = (reward) => axios.post(`${API_URL}/rewards`, reward).then(res => res.data);
export const purchaseReward = (purchase) => axios.post(`${API_URL}/reward-purchases`, purchase).then(res => res.data);
export const fetchBudgetTotal = () => axios.get(`${API_URL}/budget/total`).then(res => res.data.total);
