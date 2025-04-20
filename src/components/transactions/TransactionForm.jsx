import React, { useState, useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const TransactionForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().substr(0, 10)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTransaction = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      timestamp: new Date().toISOString()
    };
    
    addTransaction(newTransaction);
    
    // Reset form
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().substr(0, 10)
    });
  };

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Income</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Expense</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {formData.type === 'income' ? (
                <>
                  <option value="salary">Salary</option>
                  <option value="investment">Investment</option>
                  <option value="side-hustle">Side Hustle</option>
                  <option value="gifts">Gifts</option>
                  <option value="other">Other</option>
                </>
              ) : (
                <>
                  <option value="food">Food & Dining</option>
                  <option value="transportation">Transportation</option>
                  <option value="housing">Housing</option>
                  <option value="utilities">Utilities</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="shopping">Shopping</option>
                  <option value="personal">Personal</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </>
              )}
            </select>
          </div>
          
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          
          <div className="mt-2">
            <Button type="submit">Add Transaction</Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default TransactionForm;