import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import * as api from '../utils/api';

// Create context
const FinanceContext = createContext();

// Custom hook to use finance context
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

// Provider component
export const FinanceProvider = ({ children }) => {
  // State
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await api.getData();
        setTransactions(data.transactions);
        setBudgets(data.budgets);
        setCategories(data.categories);
        setCurrency(data.currency);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate total balance
  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        return total + parseFloat(transaction.amount);
      } else {
        return total - parseFloat(transaction.amount);
      }
    }, 0);
  };

  const updateBudget = async (id, updatedBudget) => {
    try {
      const updatedBudgets = await api.updateBudget(id, updatedBudget);
      setBudgets(updatedBudgets);
      return true;
    } catch (err) {
      setError('Failed to update budget');
      console.error(err);
      return false;
    }
  };

  // Calculate total income
  const calculateIncome = () => {
    return transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
  };

  // Calculate total expenses
  const calculateExpenses = () => {
    return transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);
  };

  // Add a transaction
  const addTransaction = async (transaction) => {
    try {
      const updatedTransactions = await api.addTransaction(transaction);
      setTransactions(updatedTransactions);
      return true;
    } catch (err) {
      setError('Failed to add transaction');
      console.error(err);
      return false;
    }
  };

  // Delete a transaction
  const deleteTransaction = async (id) => {
    try {
      const updatedTransactions = await api.deleteTransaction(id);
      setTransactions(updatedTransactions);
      return true;
    } catch (err) {
      setError('Failed to delete transaction');
      console.error(err);
      return false;
    }
  };

  // Add a budget
  const addBudget = async (budget) => {
    try {
      const updatedBudgets = await api.addBudget(budget);
      setBudgets(updatedBudgets);
      return true;
    } catch (err) {
      setError('Failed to add budget');
      console.error(err);
      return false;
    }
  };

  // Delete a budget
  const deleteBudget = async (id) => {
    try {
      const updatedBudgets = await api.deleteBudget(id);
      setBudgets(updatedBudgets);
      return true;
    } catch (err) {
      setError('Failed to delete budget');
      console.error(err);
      return false;
    }
  };

  // Add a category
  const addCategory = async (category) => {
    try {
      const updatedCategories = await api.addCategory(category);
      setCategories(updatedCategories);
      return true;
    } catch (err) {
      setError('Failed to add category');
      console.error(err);
      return false;
    }
  };

  // Update currency
  const updateCurrency = async (newCurrency) => {
    try {
      const data = await api.updateCurrency(newCurrency);
      setCurrency(data.currency);
      return true;
    } catch (err) {
      setError('Failed to update currency');
      console.error(err);
      return false;
    }
  };

  // Clear all data
  const clearAllData = async () => {
    try {
      const data = await api.clearAllData();
      setTransactions(data.transactions);
      setBudgets(data.budgets);
      setCategories(data.categories);
      setCurrency(data.currency);
      return true;
    } catch (err) {
      setError('Failed to clear data');
      console.error(err);
      return false;
    }
  };

  // Get recent transactions
  const getRecentTransactions = (limit = 5) => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  // Context value
  const value = {
    transactions,
    budgets,
    categories,
    currency,
    isLoading,
    error,
    balance: calculateBalance(),
    totalIncome: calculateIncome(),
    totalExpenses: calculateExpenses(),
    addTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addCategory,
    setCurrency: updateCurrency,
    clearAllData,
    getRecentTransactions
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
export { FinanceContext };