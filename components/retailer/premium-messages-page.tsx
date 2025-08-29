"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Send, Paperclip, Phone, Video, MoreHorizontal, Check, Circle, Dot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Msg { id: string; from: "me" | "customer"; text: string; time: string; attachments?: { name: string }[] }
interface Conv { id: string; name: string; email: string; avatar?: string; online: boolean; unread: number; last: string; messages: Msg[] }

const seed: Conv[] = [
  { id: "C-001", name: "Grace P.", email: "grace@example.com", online: true, unread: 2, last: "Is this available for pickup?", messages: [
    { id: "m1", from: "customer", text: "Hi! Is the MacBook still in stock?", time: "09:15" },
    { id: "m2", from: "me", text: "Yes, we have 8 units left.", time: "09:16" },
    { id: "m3", from: "customer", text: "Great! Is this available for pickup?", time: "09:17" },
  ] },
  { id: "C-002", name: "John S.", email: "john@example.com", online: false, unread: 0, last: "Thanks!", messages: [
    { id: "m1", from: "customer", text: "Can I get express delivery?", time: "08:40" },
    { id: "m2", from: "me", text: "Yes, available at checkout.", time: "08:41" },
    { id: "m3", from: "customer", text: "Thanks!", time: "08:42" },
  ] },
  { id: "C-003", name: "Sofia R.", email: "sofia@example.com", online: true, unread: 1, last: "Can I get a refund?", messages: [
    { id: "m1", from: "customer", text: "Can I get a refund for the damaged item?", time: "14:45" },
  ] },
];

export default function PremiumMessagesPage() {
  const [convs, setConvs] = useState<Conv[]>(seed);
  const [activeId, setActiveId] = useState(convs[0]?.id);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const active = useMemo(() => convs.find(c => c.id === activeId), [convs, activeId]);
  const filtered = useMemo(() => convs.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase())), [convs, q]);

  useEffect(() => {
    const id = setInterval(() => {
      setConvs(prev => prev.map(c => {
        if (c.id !== activeId && Math.random() < 0.2) return { ...c, unread: c.unread + 1, last: "New message" };
        return c;
      }));
      if (Math.random() < 0.25 && active) {
        setTyping(true);
        setTimeout(() => {
          const m: Msg = { id: "m" + Date.now(), from: "customer", text: "Thanks!", time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
          setConvs(prev => prev.map(c => c.id === active.id ? { ...c, messages: [...c.messages, m], last: m.text } : c));
          setTyping(false);
          scrollToBottom();
        }, 1500);
      }
    }, 8000);
    return () => clearInterval(id);
  }, [activeId, active]);

  const send = () => {
    if (!active || !text.trim()) return;
    const m: Msg = { id: "m" + Date.now(), from: "me", text: text.trim(), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setConvs(prev => prev.map(c => c.id === active.id ? { ...c, messages: [...c.messages, m], last: m.text, unread: 0 } : c));
    setText("");
    scrollToBottom();
  };

  const attach = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !active) return;
    const m: Msg = { id: "m" + Date.now(), from: "me", text: `Attached: ${file.name}` , time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), attachments: [{ name: file.name }] };
    setConvs(prev => prev.map(c => c.id === active.id ? { ...c, messages: [...c.messages, m], last: m.text } : c));
    e.target.value = "";
    scrollToBottom();
  };

  const quicks = ["Thanks for reaching out!", "We are checking this for you.", "Your order is on the way.", "Please share your order ID."];

  const openConv = (id: string) => {
    setActiveId(id);
    setConvs(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    setTimeout(scrollToBottom, 50);
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = scroller.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Messages & Chat</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search name or email" value={q} onChange={e => setQ(e.target.value)} />
            </div>
            <ScrollArea className="h-[520px] pr-3">
              <div className="space-y-2">
                {filtered.map(c => (
                  <button key={c.id} onClick={() => openConv(c.id)} className={`w-full text-left p-3 rounded-xl border transition hover:bg-orange-50/50 ${c.id === activeId ? 'bg-blue-50 border-blue-200' : 'bg-white/70'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8"><AvatarFallback>{c.name.slice(0,2).toUpperCase()}</AvatarFallback></Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {c.name}
                            {c.online ? <span className="inline-flex items-center text-emerald-600 text-xs"><span className="h-2 w-2 rounded-full bg-emerald-500 mr-1"/>Online</span> : <span className="text-xs text-muted-foreground">Offline</span>}
                          </div>
                          <div className="text-xs text-muted-foreground truncate max-w-[220px]">{c.last}</div>
                        </div>
                      </div>
                      {c.unread > 0 && <Badge className="bg-orange-500">{c.unread}</Badge>}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{active?.name || 'Select a conversation'}</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Phone className="h-4 w-4 mr-1"/> Call</Button>
              <Button variant="outline" size="sm"><Video className="h-4 w-4 mr-1"/> Video</Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5"/></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[420px] overflow-auto pr-2" ref={scroller}>
              <div className="space-y-3">
                {active?.messages.map(m => (
                  <div key={m.id} className={`max-w-[75%] p-3 rounded-2xl ${m.from === 'me' ? 'ml-auto bg-blue-600 text-white' : 'bg-slate-100'}`}>
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="mt-2 text-xs opacity-80">Attachments: {m.attachments.map(a => a.name).join(', ')}</div>
                    )}
                    <div className="text-[10px] opacity-70 mt-1 text-right">{m.time}</div>
                  </div>
                ))}
                {typing && (
                  <div className="max-w-[75%] p-3 rounded-2xl bg-slate-100">
                    <div className="flex items-center gap-2 text-sm"><Loader2 className="h-4 w-4 animate-spin"/> typing…</div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                {quicks.map((q, i) => (
                  <Button key={i} size="sm" variant="secondary" onClick={() => setText(q)}>{q}</Button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input placeholder="Type a message" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(); }} />
                <input ref={fileRef} type="file" className="hidden" onChange={attach} />
                <Button variant="outline" onClick={() => fileRef.current?.click()}><Paperclip className="h-4 w-4"/></Button>
                <Button className="bg-gradient-to-r from-orange-500 to-teal-600 text-white" onClick={send}><Send className="h-4 w-4 mr-1"/> Send</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
