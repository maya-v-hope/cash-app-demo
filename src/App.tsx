import React from 'react';
import { FiHome, FiCreditCard, FiBell, FiSettings } from 'react-icons/fi';

interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: -25.50,
    description: 'Coffee Shop',
    category: 'Food & Drink',
    date: '2024-03-17',
  },
  {
    id: '2',
    amount: 1500.00,
    description: 'Salary',
    category: 'Income',
    date: '2024-03-15',
  },
  {
    id: '3',
    amount: -45.00,
    description: 'Grocery Store',
    category: 'Shopping',
    date: '2024-03-14',
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-secondary">Cash App Demo</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-600">Available Balance</h2>
          <p className="text-4xl font-bold text-secondary mt-2">$1,429.50</p>
          <div className="mt-4 flex space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Send
            </button>
            <button className="bg-white border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white">
              Request
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-secondary">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around py-3">
            <button className="flex flex-col items-center text-primary">
              <FiHome className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-primary">
              <FiCreditCard className="w-6 h-6" />
              <span className="text-xs mt-1">Cards</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-primary">
              <FiBell className="w-6 h-6" />
              <span className="text-xs mt-1">Activity</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-primary">
              <FiSettings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App; 