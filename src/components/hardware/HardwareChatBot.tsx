import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";

interface HardwareChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  experimentContext: any;
}

/* ✅ SINGLE SOURCE OF TRUTH */
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const renderFormattedText = (text: string) => {
  return text.split("\n").map((line, i) => {
    // Bold (**text**)
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={i} className="mb-2 leading-relaxed">
        {parts.map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={idx} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    );
  });
};


const HardwareChatBot = ({
  isOpen,
  onClose,
  experimentContext,
}: HardwareChatBotProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input,
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/hardware-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiment: experimentContext,
          question: input,
        }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((m) => [...m, botMsg]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        className="w-full sm:w-[380px] bg-card h-full shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Hardware Lab Assistant</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
  {messages.length === 0 && !loading && (
    <p className="text-muted-foreground">
      Ask about ICs, truth table, working, or connections.
    </p>
  )}

  {messages.map((m, i) => (
    <div
      key={i}
      className={`p-2 rounded-lg max-w-[85%] ${
        m.role === "user"
          ? "bg-primary text-white ml-auto"
          : "bg-muted"
      }`}
    >
      {m.content}
    </div>
  ))}

  {/* 🔥 THINKING INDICATOR */}
  {loading && (
    <div className="text-xs text-muted-foreground italic">
      Thinking...
    </div>
  )}
</div>


        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Ask a question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HardwareChatBot;
