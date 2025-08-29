"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Send } from "lucide-react";

interface Message { id: string; from: "me"|"them"; text: string; time: string }

const conversations = [
  { id: "c1", name: "Sarah Mwanza", preview: "Is the medium size available?", unread: 2 },
  { id: "c2", name: "Tech Solutions", preview: "We can deliver tomorrow.", unread: 0 },
  { id: "c3", name: "Fresh Produce", preview: "Invoice attached.", unread: 1 },
];

const initialMessages: Record<string, Message[]> = {
  c1: [
    { id: "m1", from: "them", text: "Hello! 👋", time: "09:10" },
    { id: "m2", from: "them", text: "Is the medium size available?", time: "09:11" },
  ],
  c2: [{ id: "m1", from: "them", text: "We can deliver tomorrow.", time: "08:05" }],
  c3: [{ id: "m1", from: "them", text: "Invoice attached.", time: "07:32" }],
};

export function MessagesPanel() {
  const [active, setActive] = useState("c1");
  const [msgs, setMsgs] = useState<Record<string, Message[]>>(initialMessages);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active, msgs]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs(s => ({ ...s, [active]: [...(s[active]||[]), { id: String(Date.now()), from: "me", text, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }] }));
    setText("");
    setTyping(true);
    setTimeout(() => {
      setMsgs(s => ({ ...s, [active]: [...(s[active]||[]), { id: String(Date.now()+1), from: "them", text: "Got it! Thanks.", time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }] }));
      setTyping(false);
    }, 900);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-xl border bg-white shadow-sm lg:col-span-1">
        <div className="border-b p-3 text-sm font-semibold">Conversations</div>
        <div className="max-h-[520px] overflow-y-auto">
          {conversations.map(c => (
            <button key={c.id} onClick={()=>setActive(c.id)} className={`flex w-full items-start gap-3 px-4 py-3 border-b text-left hover:bg-slate-50 ${active===c.id? 'bg-slate-50' : ''}`}>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#0099cc] to-[#ff6600] text-white font-bold">{c.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                  {c.unread>0 && <span className="rounded-full bg-[#ff6600] px-2 py-0.5 text-[10px] font-bold text-white">{c.unread}</span>}
                </div>
                <div className="text-xs text-slate-600 line-clamp-1">{c.preview}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm lg:col-span-2 flex flex-col">
        <div className="border-b p-3 text-sm font-semibold">Chat</div>
        <div className="flex-1 space-y-3 p-4 overflow-y-auto">
          {(msgs[active]||[]).map(m => (
            <div key={m.id} className={`flex ${m.from==='me'? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[72%] rounded-2xl px-3 py-2 text-sm shadow ${m.from==='me'? 'bg-[#0099cc] text-white rounded-br-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'}`}>
                <div>{m.text}</div>
                <div className={`mt-1 text-[10px] ${m.from==='me'? 'text-white/80' : 'text-slate-500'}`}>{m.time}</div>
              </div>
            </div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                </span>
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>
        <div className="border-t p-3">
          <div className="flex items-center gap-2">
            <label className="grid h-9 w-9 place-items-center rounded-lg border hover:bg-slate-50 cursor-pointer">
              <Paperclip className="h-4 w-4 text-slate-600" />
              <input type="file" className="hidden" onChange={(e)=>{ if(e.target.files?.[0]) alert(`Attached: ${e.target.files[0].name}`); }} />
            </label>
            <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder="Type a message" className="flex-1 rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0099cc]" />
            <button onClick={send} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm bg-[#0099cc] text-white hover:brightness-105"><Send className="h-4 w-4"/> Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
