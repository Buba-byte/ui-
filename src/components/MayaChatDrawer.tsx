import React, { useState } from 'react';
import { CoverageState, MayaChatMessage } from '../types';
import { Sparkles, X, Send, Bot, User, HelpCircle } from 'lucide-react';

interface MayaChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  coverageState: CoverageState;
}

export const MayaChatDrawer: React.FC<MayaChatDrawerProps> = ({
  isOpen,
  onClose,
  coverageState
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MayaChatMessage[]>([
    {
      id: 'm1',
      sender: 'maya',
      text: `Hi ${coverageState.firstName}! I'm Maya, your AI insurance guide at Lemonade. Do you have any questions about coverage limits, deductibles, or how our instant claims work?`,
      timestamp: 'Just now',
      quickReplies: [
        'What does Personal Liability cover?',
        'How does the Deductible work?',
        'What is Lemonade Giveback?'
      ]
    }
  ]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: MayaChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/maya-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          currentContext: {
            name: `${coverageState.firstName} ${coverageState.lastName}`,
            product: coverageState.productType,
            address: coverageState.address,
            personalPropertyLimit: coverageState.personalPropertyLimit,
            deductible: coverageState.deductible,
            monthlyPrice: coverageState.monthlyPrice
          }
        })
      });

      const data = await res.json();
      const mayaReply: MayaChatMessage = {
        id: `maya-${Date.now()}`,
        sender: 'maya',
        text: data.text || "I'm here to help you get the exact right coverage without confusing paperwork!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, mayaReply]);
    } catch (err) {
      const mayaReply: MayaChatMessage = {
        id: `maya-${Date.now()}`,
        sender: 'maya',
        text: "Lemonade policies cover fire, theft, water damage, and personal liability anywhere in the world! Let me know if you want to tweak limits or deductibles.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, mayaReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-[#FF0083] to-pink-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-white text-[#FF0083] flex items-center justify-center font-serif font-bold text-lg shadow-inner">
              M
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center space-x-1.5">
                <span>AI Maya Assistant</span>
                <Sparkles className="w-4 h-4 text-pink-200 fill-pink-200" />
              </h3>
              <p className="text-xs text-pink-100">Lemonade Instant AI Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#FF0083] text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] mt-1 block ${
                    msg.sender === 'user' ? 'text-pink-200 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {/* Quick reply chips if available */}
              {msg.quickReplies && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                  {msg.quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(reply)}
                      className="bg-white hover:bg-pink-50 text-[#FF0083] border border-pink-200 text-xs font-medium px-3 py-1.5 rounded-full shadow-xs transition-all hover:scale-102 text-left"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs italic bg-white p-3 rounded-2xl border border-slate-200 max-w-[70%]">
              <div className="w-2 h-2 rounded-full bg-[#FF0083] animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-[#FF0083] animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-[#FF0083] animate-bounce delay-200"></div>
              <span>Maya is thinking...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Maya anything about your insurance..."
              className="flex-1 bg-slate-100 text-slate-800 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF0083]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-full bg-[#FF0083] hover:bg-pink-600 disabled:opacity-50 text-white flex items-center justify-center transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
