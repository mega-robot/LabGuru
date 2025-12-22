import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE_URL;


interface SoftwareChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  codeContext: string;
  language: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ---------- TEXT FORMATTER (BOLD + NEWLINES) ---------- */
const renderFormattedText = (text: string) => {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <p key={i} className="mb-2 leading-relaxed">
        {parts.map((part, idx) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={idx} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </p>
    );
  });
};

const SoftwareChatBot = ({
  isOpen,
  onClose,
  codeContext,
}: SoftwareChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg: Message = { role: "user", content: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: codeContext,
        question: input,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply || "No response received.",
      },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Something went wrong. Please try again.",
      },
    ]);
  }

  setLoading(false);
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <AnimatePresence>
        <motion.div
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="w-full sm:w-[380px] bg-card h-full shadow-xl flex flex-col"
        >
          {/* HEADER */}
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">Software Lab Assistant</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X />
            </Button>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
            {messages.length === 0 && (
              <p className="text-muted-foreground">
                Ask anything about your C code 👇
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[85%] ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted"
                }`}
              >
                {m.role === "assistant"
                  ? renderFormattedText(m.content)
                  : m.content}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-muted-foreground">
                Thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-3 py-2 text-sm"
              placeholder="Ask about your code..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={loading}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SoftwareChatBot;
