import React from 'react';
import BalanceSummary from '../components/dashboard/BalanceSummary';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Balance Summary */}
        <div className="lg:col-span-1">
          <BalanceSummary />
        </div>
        
        {/* Right Column - Expense Chart */}
        <div className="lg:col-span-2">
          <ExpenseChart />
        </div>
      </div>
      
      {/* Full Width - Recent Transactions */}
      <div className="mt-6">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;