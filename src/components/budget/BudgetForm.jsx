import React, { useState, useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const BudgetForm = () => {
  const { budgets, addBudget, updateBudget } = useContext(FinanceContext);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    customCategory: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const expenseCategories = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'housing', label: 'Housing' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'personal', label: 'Personal' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
    { value: 'custom', label: 'Custom Category' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetData = {
      amount: parseFloat(formData.amount),
      period: formData.period,
      category:
        formData.category === 'custom' ? formData.customCategory : formData.category
    };

    if (editMode && editId) {
      updateBudget(editId, budgetData);
      setEditMode(false);
      setEditId(null);
    } else {
      addBudget({
        ...budgetData,
        id: Date.now().toString(),
        spent: 0
      });
    }

    setFormData({
      category: '',
      amount: '',
      period: 'monthly',
      customCategory: ''
    });
  };

  const startEdit = (budget) => {
    setFormData({
      category: expenseCategories.some(cat => cat.value === budget.category)
        ? budget.category
        : 'custom',
      amount: budget.amount.toString(),
      period: budget.period,
      customCategory: !expenseCategories.some(cat => cat.value === budget.category)
        ? budget.category
        : ''
    });
    setEditMode(true);
    setEditId(budget.id);
  };

  const cancelEdit = () => {
    setFormData({
      category: '',
      amount: '',
      period: 'monthly',
      customCategory: ''
    });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit' : 'Create'} Budget</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {expenseCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {formData.category === 'custom' && (
          <Input
            label="Custom Category"
            type="text"
            name="customCategory"
            value={formData.customCategory}
            onChange={handleChange}
            required
          />
        )}

        <Input
          label="Budget Amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="1"
          step="0.01"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget Period</label>
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {editMode && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
          <Button type="submit">{editMode ? 'Update' : 'Create'} Budget</Button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3">Current Budgets</h3>
        {budgets.length === 0 ? (
          <p className="text-gray-500 text-sm">No budgets created yet.</p>
        ) : (
          <div className="space-y-3">
            {budgets.map(budget => (
              <div
                key={budget.id}
                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium capitalize">{budget.category}</p>
                  <p className="text-sm text-gray-600">
                    ${budget.amount.toFixed(2)} ({budget.period})
                  </p>
                </div>
                <button
                  onClick={() => startEdit(budget)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default BudgetForm;
