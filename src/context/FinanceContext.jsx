import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  transactions: [],
  categories: [
    { id: '1', name: 'Food', color: '#38b000', type: 'expense' },
    { id: '2', name: 'Transportation', color: '#ffb700', type: 'expense' },
    { id: '3', name: 'Entertainment', color: '#9d4edd', type: 'expense' },
    { id: '4', name: 'Utilities', color: '#0466c8', type: 'expense' },
    { id: '5', name: 'Shopping', color: '#e85d04', type: 'expense' },
    { id: '6', name: 'Salary', color: '#38b000', type: 'income' },
    { id: '7', name: 'Freelance', color: '#0466c8', type: 'income' },
    { id: '8', name: 'Gifts', color: '#9d4edd', type: 'income' },
  ],
  budgets: [],
  isLoading: false,
  error: null
};

// Reducer
const financeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, isLoading: false };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case 'SET_BUDGETS':
      return { ...state, budgets: action.payload };
    case 'ADD_BUDGET':
      return { ...state, budgets: [...state.budgets, action.payload] };
    case 'UPDATE_BUDGET':
      return { 
        ...state, 
        budgets: state.budgets.map(b => 
          b.id === action.payload.id ? action.payload : b
        ) 
      };
    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    default:
      return state;
  }
};


const FinanceContext = createContext();


export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedBudgets = localStorage.getItem('budgets');
    
    if (savedTransactions) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: JSON.parse(savedTransactions) });
    }
    
    if (savedBudgets) {
      dispatch({ type: 'SET_BUDGETS', payload: JSON.parse(savedBudgets) });
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(state.budgets));
  }, [state.budgets]);

  // Calculate balance
  const calculateBalance = () => {
    return state.transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' 
        ? acc + parseFloat(transaction.amount) 
        : acc - parseFloat(transaction.amount);
    }, 0);
  };

  // Calculate income
  const calculateIncome = () => {
    return state.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  };

  // Calculate expenses
  const calculateExpenses = () => {
    return state.transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  };

  // Add transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  // Add budget
  const addBudget = (budget) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_BUDGET', payload: newBudget });
  };

  // Update budget
  const updateBudget = (budget) => {
    dispatch({ type: 'UPDATE_BUDGET', payload: budget });
  };

  // Add category
  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    dispatch({ type: 'ADD_CATEGORY', payload: newCategory });
  };

  // Get expenses by category
  const getExpensesByCategory = () => {
    const expensesByCategory = {};
    
    state.transactions
      .filter(transaction => transaction.type === 'expense')
      .forEach(transaction => {
        const { categoryId, amount } = transaction;
        expensesByCategory[categoryId] = (expensesByCategory[categoryId] || 0) + parseFloat(amount);
      });
      
    return expensesByCategory;
  };

  // Value to be provided
  const value = {
    transactions: state.transactions,
    categories: state.categories,
    budgets: state.budgets,
    isLoading: state.isLoading,
    error: state.error,
    calculateBalance,
    calculateIncome,
    calculateExpenses,
    addTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    addCategory,
    getExpensesByCategory,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

// Custom hook to use the finance context
export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};