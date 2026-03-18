import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useBuild } from '../hooks/BuildContext';
import { getRecommendations, getUpgradeRoadmap, getChatResponse } from '../utils/engine';
import { getAllComponents } from '../utils/db';

const QUICK_ACTIONS = [
  { q: "قيّم تجميعتي", icon: "📊" },
  { q: "وش أرقّي أول", icon: "🔧" },
  { q: "عنق الزجاجة", icon: "🔍" },
  { q: "وين أشتري؟", icon: "🛒" },
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "أهلاً! 🎮 أنا مساعدك الذكي — اسألني عن تجميعتك!" }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const { components, selectedCount } = useBuild();
  const location = useLocation();
  const builderStickyVisible = location.pathname === '/builder' && selectedCount >= 1;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const recs = getRecommendations(components);
  const roadmap = getUpgradeRoadmap(components, getAllComponents());

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      const response = getChatResponse(userMsg, components, recs, roadmap);
      setMessages(prev => [...prev, { role: "ai", text: response }]);
    }, 300);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed left-4 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gb-primary to-gb-secondary flex items-center justify-center shadow-lg shadow-gb-primary/25 hover:scale-105 active:scale-95 transition-all duration-300 ${
            builderStickyVisible ? 'bottom-36 md:bottom-6' : 'bottom-20 md:bottom-6'
          }`}
        >
          <MessageCircle size={22} className="text-gb-bg" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className={`fixed left-4 right-4 sm:left-4 sm:right-auto sm:w-[360px] z-40 bg-gb-card border border-gb-border rounded-2xl shadow-2xl shadow-black/40 flex flex-col max-h-[70vh] sm:max-h-[500px] animate-slide-up ${
          builderStickyVisible ? 'bottom-36 md:bottom-6' : 'bottom-20 md:bottom-6'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gb-border shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gb-primary to-gb-secondary flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gb-text">المساعد الذكي</p>
                <p className="text-[10px] text-gb-muted">أونلاين</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-2 text-gb-muted hover:text-gb-accent transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-1.5 p-3 overflow-x-auto scrollbar-hide shrink-0">
            {QUICK_ACTIONS.map(({ q, icon }) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gb-surface border border-gb-border text-[11px] text-gb-muted hover:text-gb-primary hover:border-gb-primary/20 transition-all whitespace-nowrap shrink-0"
              >
                <span>{icon}</span> {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.role === "ai"
                    ? "self-start bg-gb-surface border border-gb-border rounded-2xl rounded-tr-sm mr-auto"
                    : "self-end bg-gb-primary/10 border border-gb-primary/20 rounded-2xl rounded-tl-sm ml-auto"
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-gb-border shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="اسأل عن تجميعتك..."
              className="flex-1 px-3 py-2.5 bg-gb-surface border border-gb-border rounded-xl text-sm text-gb-text placeholder-gb-muted focus:outline-none focus:border-gb-primary/40"
            />
            <button
              onClick={() => send(input)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-gb-primary to-gb-secondary flex items-center justify-center text-gb-bg hover:opacity-90 transition-opacity shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
