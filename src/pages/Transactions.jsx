import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import TransactionFilter from '../components/transactions/TransactionFilter';
import Card from '../components/common/Card';

const Transactions = () => {
  const { transactions } = useFinance();
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    category: 'all',
    searchQuery: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }

    // Filter by category
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery && !transaction.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const today = new Date();
      const transactionDate = new Date(transaction.date);
      
      switch(filters.dateRange) {
        case 'today':
          return transactionDate.toDateString() === today.toDateString();
        case 'week':
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          return transactionDate >= weekAgo;
        case 'month':
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          return transactionDate >= monthAgo;
        default:
          return true;
      }
    }

    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm />
          </Card>
          
          <Card className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <TransactionFilter filters={filters} onFilterChange={handleFilterChange} />
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            <TransactionList transactions={filteredTransactions} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transactions;