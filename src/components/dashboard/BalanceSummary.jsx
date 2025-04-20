import React from 'react';
import Card from '../common/Card';
import { useFinance } from '../../context/FinanceContext';

const BalanceSummary = () => {
  const { balance, totalIncome, totalExpenses } = useFinance();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {/* Current Balance */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-md" noPadding>
        <div className="p-6">
          <p className="text-sm uppercase font-semibold opacity-80">Current Balance</p>
          <h2 className="text-3xl font-bold mt-2">{formatCurrency(balance)}</h2>
        </div>
      </Card>

      {/* Total Income */}
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-md" noPadding>
        <div className="p-6">
          <p className="text-sm uppercase font-semibold opacity-80">Total Income</p>
          <h2 className="text-3xl font-bold mt-2">{formatCurrency(totalIncome)}</h2>
          <div className="mt-4 flex items-center text-sm opacity-90">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 15l-6-6-6 6" />
            </svg>
            <span>Income this month</span>
          </div>
        </div>
      </Card>

      {/* Total Expenses */}
      <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-md" noPadding>
        <div className="p-6">
          <p className="text-sm uppercase font-semibold opacity-80">Total Expenses</p>
          <h2 className="text-3xl font-bold mt-2">{formatCurrency(totalExpenses)}</h2>
          <div className="mt-4 flex items-center text-sm opacity-90">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
            <span>Expenses this month</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BalanceSummary;
