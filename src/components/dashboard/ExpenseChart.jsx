import React, { useMemo } from "react";
import Card from "../common/Card";
import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../utils/formatters";

const ExpenseChart = () => {
  const { transactions, currency } = useFinance();

  const expensesByCategory = useMemo(() => {
    const expenses = {};

    transactions.forEach(({ type, category, amount }) => {
      if (type === "expense") {
        expenses[category] = (expenses[category] || 0) + parseFloat(amount);
      }
    });

    return Object.entries(expenses)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const totalExpenses = useMemo(
    () => expensesByCategory.reduce((sum, { amount }) => sum + amount, 0),
    [expensesByCategory]
  );

  const colors = ["#EF4444", "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899"];

  if (expensesByCategory.length === 0) {
    return (
      <Card className="rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
        <div className="flex items-center justify-center h-40 text-gray-500">
          No expense data available
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Expense Breakdown</h2>

      <div className="space-y-5">
        {expensesByCategory.map((item, index) => {
          const percent = (item.amount / totalExpenses) * 100;

          return (
            <div key={item.category}>
              <div className="flex justify-between text-sm font-medium text-gray-800 mb-1">
                <span>{item.category}</span>
                <span>
                  {formatCurrency(item.amount, currency)} ({percent.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: colors[index % colors.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4 mt-6 text-sm font-semibold text-gray-700">
        Total Expenses: {formatCurrency(totalExpenses, currency)}
      </div>
    </Card>
  );
};

export default ExpenseChart;
