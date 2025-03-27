import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaTimes, FaExclamationTriangle, FaRegSmile, FaUserShield } from 'react-icons/fa';
import Button from '../Components/Ui/Button';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';

// Commonly used phrases for the chatbot
const suggestedPhrases = [
  "Saya ingin melaporkan kekerasan terhadap anak",
  "Bagaimana cara mendapatkan bantuan hukum?",
  "Saya sedang menghadapi kekerasan dalam rumah tangga",
  "Apa yang harus dilakukan jika anak saya mengalami kekerasan di sekolah?",
  "Saya membutuhkan konsultasi psikologi untuk anak"
];

// Simple profanity filter word list (would be more comprehensive in production)
const profanityList = ["anjing", "babi", "bangsat", "bajingan", "keparat", "tolol", "bodoh", "goblok"];

const PelayananPage: React.FC = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot', timestamp: Date}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isProfanityDetected, setIsProfanityDetected] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true); // New state to control auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  // Modified scroll behavior - only scroll if autoScroll is enabled
  // Update the scroll detection logic
useEffect(() => {
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const distanceFromBottom = 
        container.scrollHeight - container.clientHeight - container.scrollTop;
      
      // Only set autoScroll to true if very close to bottom (within 20px)
      setAutoScroll(distanceFromBottom < 20);
    }
  };

  const container = chatContainerRef.current;
  if (container) {
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }
}, []);

  // Start the chat with initial message
  const startChat = () => {
    setChatStarted(true);
    setMessages([{
      text: "Selamat datang di Layanan Bantuan SIPA. Kami siap membantu Anda dengan masalah kekerasan terhadap ibu dan anak. Semua percakapan bersifat rahasia dan aman. Bagaimana kami dapat membantu Anda hari ini?",
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  // Check for profanity in message
  const containsProfanity = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return profanityList.some(word => lowerText.includes(word));
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Check for profanity
    if (containsProfanity(newMessage)) {
      setIsProfanityDetected(true);
      setTimeout(() => setIsProfanityDetected(false), 3000);
      return;
    }
    
    // Start chat if not started
    if (!chatStarted) {
      startChat();
    }
    
    // Add user message
    const userMessage = {
      text: newMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = "";
      
      // Simple response logic
      if (newMessage.toLowerCase().includes('kekerasan') && newMessage.toLowerCase().includes('anak')) {
        botResponse = "Kami turut prihatin atas situasi yang Anda hadapi. Kekerasan terhadap anak adalah masalah serius yang perlu penanganan segera. Tim konselor kami siap membantu Anda. Mohon beri tahu kami detail lebih lanjut agar kami dapat memberikan bantuan yang tepat.";
      } else if (newMessage.toLowerCase().includes('bantuan hukum')) {
        botResponse = "Untuk bantuan hukum, SIPA menyediakan konsultasi gratis dengan pengacara spesialis kasus kekerasan terhadap perempuan dan anak. Kami dapat membantu dalam proses pelaporan, pendampingan, hingga persidangan jika diperlukan.";
      } else if (newMessage.toLowerCase().includes('rumah tangga')) {
        botResponse = "Kekerasan dalam rumah tangga adalah tindakan yang tidak dapat dibenarkan. Anda berhak mendapatkan perlindungan. Kami dapat membantu dengan penyediaan tempat perlindungan sementara, konseling, dan bantuan hukum. Keselamatan Anda adalah prioritas kami.";
      } else {
        botResponse = "Terima kasih telah menghubungi kami. Tim konselor kami akan segera mengevaluasi kasus Anda. Apakah ada informasi lain yang ingin Anda sampaikan untuk membantu kami memahami situasi Anda lebih baik?";
      }
      
      const botMessageObj = {
        text: botResponse,
        sender: 'bot' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessageObj]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle suggested phrase click
  const handleSuggestedPhraseClick = (phrase: string) => {
    setNewMessage(phrase);
    // Auto-focus the text area when selecting a phrase
    const textArea = document.querySelector('textarea');
    if (textArea) textArea.focus();
  };

  // Handle pressing Enter key to send message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Manual scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setAutoScroll(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100">
              {/* Header */}
              <div className="bg-purple-400 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <FaUserShield className="text-2xl mr-3" />
                  <div>
                    <h1 className="font-bold text-lg">Layanan Bantuan SIPA</h1>
                    <p className="text-xs text-purple-100">Konselor tersedia 24/7 • Percakapan bersifat rahasia</p>
                  </div>
                </div>
                {chatStarted && (
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => setShowEndDialog(true)}
                    className="bg-red-400 hover:bg-red-500 transition-colors duration-200"
                  >
                    Akhiri Percakapan
                  </Button>
                )}
              </div>
              
              {/* Welcome Screen with Suggested Phrases (shown before chat starts) */}
              {!chatStarted ? (
                <div className="p-8 text-center">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <img 
                      src="/assets/bot-avatar.png" 
                      alt="SIPA Bot" 
                      className="w-16 h-16 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/200x200/8B5CF6/FFFFFF?text=SIPA";
                      }}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-purple-600 mb-3">Selamat Datang di Layanan Bantuan SIPA</h2>
                  <p className="text-gray-600 mb-6">
                    Konselor kami siap membantu menangani kasus kekerasan terhadap ibu dan anak. 
                    Semua percakapan bersifat rahasia dan dilindungi.
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="font-medium text-purple-600 mb-3">Pilih topik atau ketik pesan Anda sendiri:</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {suggestedPhrases.map((phrase, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestedPhraseClick(phrase)}
                          className="text-sm bg-white px-4 py-2 rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm transform hover:scale-105"
                        >
                          {phrase}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary"
                    className="bg-purple-400 hover:bg-purple-500 transition-colors duration-200 transform hover:scale-105"
                    onClick={startChat}
                  >
                    Mulai Percakapan
                  </Button>
                </div>
              ) : (
                <>
                  {/* Chat Messages Section (shown after chat starts) */}
                  <div 
                    className="h-96 overflow-y-auto p-4 bg-gray-50 relative" 
                    ref={chatContainerRef}
                  >
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-10 h-10 rounded-full mr-2 overflow-hidden flex-shrink-0">
                            <img 
                              src="/assets/bot-avatar.png" 
                              alt="Bot" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://placehold.co/200x200/8B5CF6/FFFFFF?text=SIPA";
                              }}
                            />
                          </div>
                        )}
                        <div className={`max-w-[75%]`}>
                          <div className={`rounded-lg p-3 ${
                            message.sender === 'user' 
                              ? 'bg-purple-400 text-white rounded-tr-none' 
                              : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-none'
                          }`}>
                            <p>{message.text}</p>
                          </div>
                          <div className={`text-xs mt-1 text-gray-500 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                        {message.sender === 'user' && (
                          <div className="w-10 h-10 rounded-full ml-2 overflow-hidden flex-shrink-0">
                            <img 
                              src="/assets/user-avatar.png" 
                              alt="User" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://placehold.co/200x200/6366F1/FFFFFF?text=User";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-start mb-4 animate-fadeIn">
                        <div className="w-10 h-10 rounded-full mr-2 overflow-hidden flex-shrink-0">
                          <img 
                            src="/assets/bot-avatar.png" 
                            alt="Bot" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://placehold.co/200x200/8B5CF6/FFFFFF?text=SIPA";
                            }}
                          />
                        </div>
                        <div className="max-w-[75%]">
                          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm rounded-tl-none">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{animationDelay: '0ms'}}></div>
                              <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{animationDelay: '150ms'}}></div>
                              <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{animationDelay: '300ms'}}></div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">Konselor sedang mengetik...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                    
                    {/* Scroll to bottom button - shows when not at bottom */}
                    {!autoScroll && messages.length > 3 && (
  <button 
    onClick={scrollToBottom}
    className="absolute bottom-4 right-4 bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-purple-600 transition-colors duration-200 animate-pulse z-10"
    title="Scroll ke bawah"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </button>
)}
                  </div>
                </>
              )}
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 relative">
                {isProfanityDetected && (
                  <div className="absolute bottom-full left-0 right-0 bg-red-100 text-red-800 p-2 text-sm flex items-center animate-fadeIn">
                    <FaExclamationTriangle className="mr-2" />
                    Mohon gunakan bahasa yang sopan dan tidak mengandung kata-kata kasar
                  </div>
                )}
                <div className="flex gap-2"> {/* Added gap-2 here for spacing */}
  <div className="flex-1 relative">
    <textarea
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyPress={handleKeyPress}
      placeholder="Tulis pesan Anda di sini..."
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
      rows={1}
    />
    <button 
      className="absolute right-2 top-3 text-gray-400 hover:text-purple-400 transition-colors"
      onClick={() => setNewMessage('')}
      title="Hapus pesan"
    >
      {newMessage && <FaTimes />}
    </button>
  </div>
  <button
    onClick={handleSendMessage}
    disabled={!newMessage.trim()}
    className={`
      bg-purple-500 text-white 
      w-12 h-12 rounded-full
      flex items-center justify-center
      transition-all duration-200
      ${!newMessage.trim() 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:bg-purple-600 shadow-md'
      }
    `}
  >
    <FaPaperPlane className="text-lg" />
  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  <FaRegSmile className="inline mr-1" /> 
                  Tim kami hadir untuk membantu Anda. Percakapan ini aman dan terlindungi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* End Chat Confirmation Dialog */}
     {/* End Chat Confirmation Dialog */}
{showEndDialog && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-zoomIn">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Akhiri Percakapan?</h3>
        <p className="text-gray-600 mt-2">
          Jika Anda mengakhiri percakapan ini, riwayat chat akan dihapus. Apakah Anda yakin ingin mengakhiri?
        </p>
      </div>
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
        <Button 
          variant="outline" 
          className="flex-1 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setShowEndDialog(false)}
        >
          Kembali ke Chat
        </Button>
        <Button 
          variant="danger" 
          className="flex-1 bg-red-500 hover:bg-red-600 transition-colors duration-200 shadow-sm font-medium"
          onClick={() => {
            setShowEndDialog(false);
            setMessages([]);
            setChatStarted(false);
            setShowThankYouMessage(true);
            setTimeout(() => setShowThankYouMessage(false), 5000);
          }}
        >
          Akhiri Percakapan
        </Button>
      </div>
    </div>
  </div>
)}

{/* Thank You Message */}
{/* Thank You Message */}
{showThankYouMessage && (
  <div className="fixed inset-0 bg-purple-500 bg-opacity-95 flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 text-center animate-zoomIn">
      <div className="w-20 h-20 mx-auto mb-6 relative">
        <div className="absolute inset-0 bg-purple-100 rounded-full animate-ping opacity-75"></div>
        <div className="relative w-full h-full bg-purple-200 rounded-full flex items-center justify-center">
          <FaUserShield className="text-purple-600 text-4xl" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Terima Kasih!</h2>
      <p className="text-gray-700 mb-6">
        Terima kasih telah menggunakan Layanan Bantuan SIPA. Kami harap kami dapat membantu Anda. 
        Jika Anda membutuhkan bantuan lagi, jangan ragu untuk menghubungi kami kembali.
      </p>
      <div className="flex justify-center">
        <a href="/">
          <Button 
            variant="primary" 
            className="bg-purple-500 hover:bg-purple-600 transition-colors duration-200 px-6 py-3"
          >
            Kembali ke Beranda
          </Button>
        </a>
      </div>
    </div>
  </div>
)}
      
      <Footer />
    </>
  );
};

export default PelayananPage;