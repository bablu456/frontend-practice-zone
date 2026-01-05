// storage.js
const STORAGE_KEY = 'expense-tracker-data';

export const getExpenses = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const getTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const saveTheme = (theme) => {
  localStorage.setItem('theme', theme);
};