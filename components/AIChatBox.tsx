import { useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
export type Message = { role: "system" | "user" | "assistant"; content: string };
export function AIChatBox({ messages, onSendMessage, isLoading = false, suggestedPrompts = [], placeholder = "اكتب سؤالك هنا...", className = "" }: { messages: Message[]; onSendMessage: (content: string) => void; isLoading?: boolean; suggestedPrompts?: string[]; placeholder?: string; className?: string }) {
  const [value, setValue] = useState("");
  const send = () => { const text = value.trim(); if (!text || isLoading) return; onSendMessage(text); setValue(""); };
  return <div className={`flex min-h-[420px] flex-col rounded-xl border border-slate-200 bg-white ${className}`}>
    <div className="flex-1 space-y-3 overflow-auto p-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}><span className="mt-1 rounded-full bg-slate-100 p-2">{message.role === "user" ? <User className="h-4 w-4"/> : <Sparkles className="h-4 w-4"/>}</span><div className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${message.role === "user" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}`}>{message.content}</div></div>)}</div>
    {messages.length <= 1 && <div className="flex flex-wrap gap-2 px-4 pb-3">{suggestedPrompts.map(prompt => <button key={prompt} className="rounded-full border border-slate-200 px-3 py-1 text-xs" onClick={() => onSendMessage(prompt)}>{prompt}</button>)}</div>}
    <div className="flex items-end gap-2 border-t border-slate-100 p-3"><Textarea value={value} onChange={event => setValue(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } }} placeholder={placeholder} rows={2}/><Button type="button" onClick={send} disabled={!value.trim() || isLoading}><Send className="h-4 w-4"/></Button></div>
  </div>;
}
