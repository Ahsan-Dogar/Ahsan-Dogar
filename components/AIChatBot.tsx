
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Greetings. I am Ahsan's digital proxy. How may I assist your inquiry into the architecture of tomorrow?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: `You are the Digital Avatar of Ahsan Dogar. 
          IDENTITY: Ahsan is a visionary Senior Front-End Architect specializing in luxury digital experiences (Three.js, GSAP, React).
          TONE: Professional, mysterious, high-end, confident, and sophisticated. Use words like "architect," "manifest," "experience," "precision," and "legacy."
          GOAL: Assist users in learning about Ahsan's skills, booking consultations, or exploring his portfolio. 
          Keep responses concise (under 3 sentences) but punchy and cinematic.`
        }
      });

      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I've encountered a momentary divergence in the data stream. Please rephrase." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: "The network link to the mainframe is currently unstable. Please reach out via traditional channels." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {/* FAB */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 glass rounded-full flex items-center justify-center border border-white/20 shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
          {isOpen ? (
            <span className="text-2xl font-light">&times;</span>
          ) : (
            <div className="flex items-center justify-center">
              <span className="text-2xl">✧</span>
              <div className="absolute inset-0 bg-white/20 blur-lg scale-150 animate-pulse" />
            </div>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[360px] md:w-[420px] h-[550px] glass rounded-[2rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-slide-up backdrop-blur-3xl">
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center luxury-font font-bold italic text-sm">AD</div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold">Proxy-A.D.</h4>
                <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mt-0.5">Neural Link Established</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-[1.5rem] text-[11px] leading-relaxed tracking-wide ${
                  msg.role === 'user' 
                  ? 'bg-white text-black rounded-tr-none font-medium' 
                  : 'glass border-white/10 rounded-tl-none italic text-white/70 font-light'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass px-6 py-4 rounded-[1.5rem] rounded-tl-none border border-white/10 flex space-x-1.5">
                  <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-1 h-1 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-black/40 border-t border-white/5">
            <div className="relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query digital consciousness..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-[11px] outline-none focus:border-white/30 transition-all pr-14 font-light tracking-wide placeholder:text-white/20"
              />
              <button 
                onClick={handleSend}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all"
              >
                <span className="text-lg leading-none">➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; filter: blur(10px); }
          to { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AIChatBot;
