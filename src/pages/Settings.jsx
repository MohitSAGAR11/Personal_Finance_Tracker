import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Settings = () => {
  const { categories, addCategory, currency, setCurrency, clearAllData } = useFinance();
  const [newCategory, setNewCategory] = useState('');
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' },
    { value: 'INR', label: 'INR (₹)' },
  ];

  const handleClearData = () => {
    clearAllData();
    setShowClearDataConfirm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Currency Settings</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {currencyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Category Management</h2>
          <form onSubmit={handleAddCategory} className="mb-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">Add</Button>
            </div>
          </form>
          
          <div>
            <h3 className="text-md font-medium mb-2">Existing Categories:</h3>
            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <span 
                    key={category} 
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No custom categories added.</p>
            )}
          </div>
        </Card>
        
        <Card className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          
          {!showClearDataConfirm ? (
            <Button 
              variant="danger"
              onClick={() => setShowClearDataConfirm(true)}
            >
              Clear All Data
            </Button>
          ) : (
            <div>
              <p className="text-red-600 mb-4">
                Are you sure you want to clear all your financial data? This action cannot be undone.
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant="danger"
                  onClick={handleClearData}
                >
                  Yes, Clear All Data
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setShowClearDataConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Settings;