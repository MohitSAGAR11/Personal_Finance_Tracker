import React from 'react';
import { useFinance } from '../context/FinanceContext';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetProgress from '../components/budget/BudgetProgress';
import Card from '../components/common/Card';

const Budget = () => {
  const { budgets, transactions } = useFinance();

  // Calculate spending for each budget category
  const categorySpending = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += parseFloat(transaction.amount);
    }
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Budget Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Create Budget</h2>
            <BudgetForm />
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
            {budgets.length > 0 ? (
              <div className="space-y-6">
                {budgets.map(budget => (
                  <BudgetProgress 
                    key={budget.id}
                    budget={budget}
                    spent={categorySpending[budget.category] || 0}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No budgets created yet. Use the form to set up your first budget.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Budget;