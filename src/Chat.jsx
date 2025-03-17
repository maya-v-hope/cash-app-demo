const { useState, useEffect, useRef } = React;

const initialMessages = [
  {
    id: 1,
    type: 'system',
    content: "Hey! I'm your financial assistant. I'll help you make smarter decisions about your money.",
    timestamp: '2024-03-17T10:00:00'
  }
];

const Chat = function() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start the sequence after the initial message
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 2,
        type: 'system',
        content: "I noticed your water bill is due tomorrow, but you're a bit low on cash. Want me to move some money from savings to cover it?",
        timestamp: new Date().toISOString()
      }]);
      setShowInput(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setShowInput(false);

    // Handle user responses based on current step
    if (currentStep === 0) {
      // After water bill response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          type: 'system',
          content: "Great! I've moved $50 from your savings to cover the water bill. You're all set for tomorrow.",
          timestamp: new Date().toISOString()
        }]);
        
        // Wait 5 seconds then show grocery alert
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: messages.length + 3,
            type: 'system',
            content: "Your grocery spending is up 20% this month. Want to see where the extra money is going?",
            timestamp: new Date().toISOString()
          }]);
          setShowInput(true);
          setCurrentStep(1);
        }, 5000);
      }, 1000);
    } else if (currentStep === 1) {
      // After grocery response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: messages.length + 2,
          type: 'system',
          content: "I found the increase! You had one unusually large purchase at Berkeley Bowl last week for $120. This is about 40% higher than your typical grocery runs.",
          timestamp: new Date().toISOString()
        }]);
        
        // Wait 3 seconds then show coffee shop message
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: messages.length + 3,
            type: 'system',
            content: "That coffee shop purchase would put you $40 over your daily budget. Your paycheck hits on Friday—want to proceed anyway?",
            timestamp: new Date().toISOString()
          }]);
          setShowInput(true);
          setCurrentStep(2);
        }, 3000);
      }, 1000);
    }
  };

  return (
    <div className={`fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ${isMinimized ? 'h-12 overflow-hidden' : ''}`}>
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Financial Assistant</h3>
          <p className="text-sm text-gray-500">Here to help with your money decisions</p>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
        >
          {isMinimized ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat Messages */}
      <div className={`h-96 overflow-y-auto p-4 space-y-4 ${isMinimized ? 'hidden' : ''}`}>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className={`p-4 border-t border-gray-200 ${isMinimized ? 'hidden' : ''}`}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type here"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={!showInput}
          />
          <button
            onClick={handleSend}
            disabled={!showInput}
            className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              showInput 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}; 