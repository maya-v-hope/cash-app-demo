const { useState } = React;

const mockMessages = [
  {
    id: 1,
    type: 'system',
    content: "Hey! I'm your financial assistant. I'll help you make smarter decisions about your money.",
    timestamp: '2024-03-17T10:00:00'
  },
  {
    id: 2,
    type: 'system',
    content: "I noticed your water bill is due tomorrow, but you're a bit low on cash. Want me to move some money from savings to cover it?",
    timestamp: '2024-03-17T10:01:00'
  },
  {
    id: 3,
    type: 'system',
    content: "Your grocery spending is up 20% this month. Want to see where the extra money is going?",
    timestamp: '2024-03-17T10:02:00'
  },
  {
    id: 4,
    type: 'system',
    content: "That coffee shop purchase would put you $40 over your daily budget. Your paycheck hits tomorrow—want to proceed anyway?",
    timestamp: '2024-03-17T10:03:00'
  },
  {
    id: 5,
    type: 'system',
    content: "You're doing great with your savings goal! You've saved $500 more than last month. Keep it up!",
    timestamp: '2024-03-17T10:04:00'
  }
];

function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate system response
    setTimeout(() => {
      const systemResponse = {
        id: messages.length + 2,
        type: 'system',
        content: "I understand your concern. Let me help you find a solution that works best for your financial goals.",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, systemResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Financial Assistant</h3>
        <p className="text-sm text-gray-500">Here to help with your money decisions</p>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your finances..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat; 