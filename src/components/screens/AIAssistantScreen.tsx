import React, { useState, useRef, useEffect } from 'react';
import { BusinessProfile, ObligationItem, AIChatMessage } from '../../types';
import { Bot, Send, Sparkles, User, Lightbulb, Loader2, ShieldCheck } from 'lucide-react';

interface AIAssistantScreenProps {
  profile: BusinessProfile;
  obligations: ObligationItem[];
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({
  profile,
  obligations,
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello ${profile.ownerName.split(' ')[0]} 👋 I'm ComplyAI, your Kenyan business compliance advisor for ${profile.name} (${profile.industry}). How can I assist you today?`,
      timestamp: 'Just now',
      suggestions: [
        'What taxes apply to my business?',
        'When is my next deadline?',
        'How can I legally reduce my tax burden?',
        'Explain VAT and SHA rules.',
        'Why did my compliance score change?'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const promptText = textToSend || inputPrompt;
    if (!promptText.trim() || isTyping) return;

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsTyping(true);

    fetch('/api/compliance-ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText,
        businessProfile: profile,
        obligations,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const aiMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: data.suggestions,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      })
      .catch((err) => {
        console.error('Error contacting AI:', err);
        const fallbackMsg: AIChatMessage = {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: `For ${profile.name} (${profile.industry}), your main compliance obligations include KRA Monthly VAT (16%), Employee SHA (2.75%), NSSF statutorys, and your ${profile.county} Single Business Permit. You can process all payments directly in ComplyKE.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ['When is my next deadline?', 'How to claim input VAT?'],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
        setIsTyping(false);
      });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 pb-2 overflow-hidden">
      {/* Top Header */}
      <div className="bg-slate-900 text-white p-3.5 px-4 shadow-sm flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm leading-tight text-white flex items-center gap-1.5">
              <span>ComplyAI Assistant</span>
              <span className="text-[10px] bg-emerald-900 text-emerald-300 font-bold px-1.5 py-0.2 rounded-md">
                Gemini 3.6
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
              Trained on Kenya Law & KRA / SHA Regulations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified</span>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-2xs space-y-2 ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                {/* Suggestions Pills attached to AI message */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Suggested Questions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 transition text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] text-right ${
                    isUser ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-xs bg-white p-3 rounded-2xl border border-slate-200 max-w-xs animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Analyzing Kenya Tax Code & Regulations...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={`Ask about taxes, SHA, or permits for ${profile.name}...`}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2.5 rounded-2xl font-bold shadow-2xs transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
