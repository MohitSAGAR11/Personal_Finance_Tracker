# 📊 Personal Finance Tracker

A comprehensive web application to track your personal finances, manage budgets, and gain insights into your spending habits.

## ✨ Features

- 💰 **Track Transactions**: Log your income and expenses with customizable categories
- 📈 **Budget Management**: Set and monitor budgets with visual progress indicators 
- 📊 **Financial Insights**: View spending patterns and financial trends
- 💸 **Multi-currency Support**: Track finances in your preferred currency
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- 🔒 **Data Privacy**: All data is stored locally in your browser

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **LocalStorage API**: For data persistence
- **Vite**: Next generation frontend tooling

## 📱 Usage

### Adding Transactions
Navigate to the Transactions page and click "Add Transaction" to record a new income or expense.

### Creating Budgets
Go to the Budgets page and set up weekly, monthly, or yearly budgets for different spending categories.

### Viewing Reports
Visit the Dashboard to see visual representations of your financial data, including income vs. expenses and category-based spending.

## 🔄 Data Structure

### Transaction Object
```javascript
{
  id: string,
  amount: number,
  date: string,
  category: string,
  description: string,
  type: 'income' | 'expense'
}
```

### Budget Object
```javascript
{
  id: string,
  category: string,
  amount: number,
  period: 'weekly' | 'monthly' | 'yearly',
  spent: number
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📞 Contact

Your Name - Mohit Sagar - 24bcs10622 - MohitSAGAR11
Project Link: https://github.com/MohitSAGAR11/Personal_Finance_Tracker
