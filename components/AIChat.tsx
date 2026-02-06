import React, { useState, useRef, useEffect } from 'react';
import { chatWithPortfolioAgent } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "SYSTEM_ONLINE: I am the SHOAIB.DEV interface. Inquiries regarding MERN, Django, or architecture?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithPortfolioAgent(userMsg, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "ERROR_FAULT: Connection failed. Please check your signal." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen && (
        <div 
          className="mb-6 w-80 md:w-[450px] bg-obsidian border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden reveal pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/5 p-5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-accent animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Core_AI Interface</span>
            </div>
            <button onClick={toggleChat} className="text-white/40 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] font-mono text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'text-accent border-r-2 border-accent pr-4 py-1 text-right' 
                    : 'text-white/80 border-l-2 border-white/10 pl-4 py-1'
                }`}>
                   <span className="text-[9px] block mb-1 opacity-30 tracking-widest">{m.role === 'user' ? '> USER_INPUT' : '> SYSTEM_RESP'}</span>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="pl-4 border-l-2 border-white/10 text-white/20 font-mono text-xs animate-pulse">
                  COMPUTING_RESPONSE...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10">
            <form onSubmit={handleSend} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="EXECUTE INQUIRY..."
                className="flex-1 bg-transparent border-b border-white/20 py-2 text-xs font-mono uppercase tracking-widest focus:outline-none focus:border-accent transition-colors text-white"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="text-accent disabled:text-white/10 hover:scale-110 transition-transform"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="w-16 h-16 bg-obsidian border border-white/10 hover:border-accent flex items-center justify-center text-white text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 group pointer-events-auto"
      >
        <div className="relative">
          <i className="fa-solid fa-terminal"></i>
          {!isOpen && <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>}
        </div>
      </button>
    </div>
  );
};

export default AIChat;