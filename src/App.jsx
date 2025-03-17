const { useState, useEffect } = React;

const mockTransactions = [
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

function formatAmount(amount) {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formattedAmount = absAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${isNegative ? '-' : '+'}$${formattedAmount}`;
}

function App() {
  const [balance, setBalance] = useState(142.95);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [showChat, setShowChat] = useState(true);
  const [balanceKey, setBalanceKey] = useState(0);

  const handleSavingsTransfer = (amount) => {
    setBalance(prev => prev + amount);
    setBalanceKey(prev => prev + 1);
    setTransactions(prev => [{
      id: String(prev.length + 1),
      amount: amount,
      description: 'Transfer from Savings',
      category: 'Transfer',
      date: new Date().toISOString().split('T')[0],
    }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">🪄 Money Magic 🪄</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-600">Available Balance</h2>
          <p key={balanceKey} className="text-4xl font-bold text-gray-900 mt-2 animate-sparkle">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="mt-4 flex space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
              Send
            </button>
            <button className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white">
              Request
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b">
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatAmount(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
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
            <button className="flex flex-col items-center text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-xs mt-1">Cards</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-xs mt-1">Activity</span>
            </button>
            <button className="flex flex-col items-center text-gray-500 hover:text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs mt-1">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Chat Component */}
      {showChat && <Chat onSavingsTransfer={handleSavingsTransfer} />}
    </div>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 