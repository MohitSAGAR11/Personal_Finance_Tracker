import React, { useContext, useEffect, useState } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import Card from '../common/Card';

const BudgetProgress = () => {
  const { budgets, transactions, updateBudget } = useContext(FinanceContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();

    budgets.forEach(budget => {
      let relevantTransactions = transactions.filter(
        t => t.type === 'expense' && t.category === budget.category
      );

      switch (budget.period) {
        case 'weekly': {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(currentDay - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          relevantTransactions = relevantTransactions.filter(
            t => new Date(t.date) >= startOfWeek
          );
          break;
        }

        case 'monthly':
          relevantTransactions = relevantTransactions.filter(t => {
            const txDate = new Date(t.date);
            return (
              txDate.getMonth() === currentMonth &&
              txDate.getFullYear() === currentYear
            );
          });
          break;

        case 'yearly':
          relevantTransactions = relevantTransactions.filter(t => {
            const txDate = new Date(t.date);
            return txDate.getFullYear() === currentYear;
          });
          break;
      }

      const spent = relevantTransactions.reduce((sum, t) => sum + t.amount, 0);

      if (spent !== budget.spent) {
        updateBudget(budget.id, { ...budget, spent });
      }
    });
  }, [budgets, transactions, updateBudget]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getProgressInfo = (spent, amount) => {
    const percentage = amount > 0 ? Math.min((spent / amount) * 100, 100) : 0;

    let colorClass = 'bg-green-500';
    if (percentage >= 90) colorClass = 'bg-red-500';
    else if (percentage >= 75) colorClass = 'bg-yellow-500';
    else if (percentage >= 50) colorClass = 'bg-blue-500';

    return { percentage, colorClass };
  };

  const formatPeriod = (period) => {
    const periods = {
      weekly: 'Weekly',
      monthly: 'Monthly',
      yearly: 'Yearly'
    };
    return periods[period] || period;
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Budget Progress</h2>

      {budgets.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No budgets created yet.</p>
      ) : (
        <div className="space-y-6">
          {budgets.map((budget) => {
            const { percentage, colorClass } = getProgressInfo(budget.spent, budget.amount);
            const budgetExceeded = percentage >= 100;
            const nearLimit = percentage >= 90 && percentage < 100;
            const underBudget = percentage < 50;

            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium capitalize text-gray-800">
                    {budget.category}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatPeriod(budget.period)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                  </span>
                  <span className={budgetExceeded ? 'text-red-600 font-medium' : ''}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percentage}
                    className={`${colorClass} h-2.5 transition-all duration-700 ease-in-out`}
                    style={{ width: mounted ? `${percentage}%` : '0%' }}
                  ></div>
                </div>

                {budgetExceeded && (
                  <p className="text-sm text-red-600">Budget exceeded!</p>
                )}
                {nearLimit && (
                  <p className="text-sm text-yellow-600">Almost at budget limit!</p>
                )}
                {underBudget && (
                  <p className="text-sm text-green-600">You're well within budget.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default BudgetProgress;
