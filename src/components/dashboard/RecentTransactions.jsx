import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { useFinance } from '../../context/FinanceContext';

const RecentTransactions = () => {
  const { transactions } = useFinance();

  const recentTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'food':
        return '🍔';
      case 'transportation':
        return '🚗';
      case 'entertainment':
        return '🎬';
      case 'shopping':
        return '🛍️';
      case 'utilities':
        return '💡';
      case 'housing':
        return '🏠';
      case 'salary':
        return '💰';
      case 'investment':
        return '📈';
      default:
        return '📋';
    }
  };

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      {recentTransactions.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-10">
          No recent transactions
        </div>
      ) : (
        <ul className="space-y-4">
          {recentTransactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{getCategoryIcon(tx.category)}</span>
                <div>
                  <div className="font-medium text-gray-800">{tx.description}</div>
                  <div className="text-xs text-gray-500">
                    {tx.category} • {formatDate(tx.date)}
                  </div>
                </div>
              </div>
              <div
                className={`text-sm font-semibold ${
                  tx.type === 'income' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {tx.type === 'expense' ? '-' : '+'}
                {formatCurrency(tx.amount)}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/transactions"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View all transactions
        </Link>
      </div>
    </Card>
  );
};

export default RecentTransactions;
