import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Layout } from "@/components/layout/Layout";
import { PageTransition, FadeIn } from "@/components/animations/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Code,
  MessageCircle,
} from "lucide-react";
import SoftwareChatBot from "@/components/software/SoftwareChatBot";

const API_BASE = import.meta.env.VITE_API_BASE_URL;


/* ===================== TYPES ===================== */

interface Hint {
  message: string;
  severity: "high" | "medium" | "low";
  line?: number;
}

/* ===================== COMPONENT ===================== */

const SoftwareLabs = () => {
  const [code, setCode] = useState<string>(`// Write your C code here
#include <stdio.h>

int main() {
    int arr[5] = {1,2,3,4,5};
    int sum;

    for(int i=0;i<=5;i++){
        sum += arr[i];
    }

    printf("%d", sum);
    return 0;
}`);

  const [hints, setHints] = useState<Hint[]>([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [correctedCode, setCorrectedCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCorrectedCode, setShowCorrectedCode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const language = "c"; // 🔒 fixed as per requirement

  /* ===================== ANALYZE ===================== */

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setHints([]);
    setCurrentHintIndex(0);
    setShowCorrectedCode(false);

    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setHints(data.errors || []);
      setCorrectedCode(data.corrected_code || "");
    } catch (err) {
      alert("Analysis failed. Check backend or API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* ===================== LOGIC ===================== */

  const hintsViewed = currentHintIndex + 1;
  const requiredHints = Math.min(3, hints.length);
  const canShowCorrectedCode =
    hints.length > 0 && hintsViewed >= requiredHints;

  const severityIcon = (s: string) =>
    s === "high" ? (
      <AlertCircle className="w-4 h-4" />
    ) : s === "medium" ? (
      <AlertTriangle className="w-4 h-4" />
    ) : (
      <Lightbulb className="w-4 h-4" />
    );

  /* ===================== UI ===================== */

  return (
    <Layout>
      <PageTransition>
        <div className="container mx-auto px-4 py-8">
          <FadeIn>
            <h1 className="font-serif text-4xl font-bold mb-2">
              Software Labs
            </h1>
            <p className="text-muted-foreground">
              Guided C code debugging with AI-powered hints
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            {/* ================= EDITOR ================= */}
            <div className="lg:col-span-2">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="mb-3 gap-2"
              >
                <Code className="w-4 h-4" />
                {isAnalyzing ? "Analyzing..." : "Analyze Code"}
              </Button>

              <Editor
                height="420px"
                language="c"
                value={showCorrectedCode ? correctedCode : code}
                onChange={(v) =>
                  !showCorrectedCode && setCode(v || "")
                }
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  readOnly: showCorrectedCode,
                }}
              />
            </div>

            {/* ================= HINTS ================= */}
            <div className="surface-card p-5 space-y-4">
              <h2 className="font-semibold flex gap-2">
                <Lightbulb className="w-5 h-5 text-primary" /> Hints
              </h2>

              {hints.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Analyze code to get hints
                </p>
              )}

              {hints.length > 0 && (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHintIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border rounded-lg p-3"
                    >
                      <div className="flex gap-2">
                        {severityIcon(
                          hints[currentHintIndex].severity
                        )}
                        <div>
                          <p className="text-sm">
                            {hints[currentHintIndex].message}
                          </p>
                          {hints[currentHintIndex].line && (
                            <p className="text-xs opacity-60">
                              Line {hints[currentHintIndex].line}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {currentHintIndex < hints.length - 1 && (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentHintIndex((i) => i + 1)
                      }
                    >
                      Next Hint <ChevronRight />
                    </Button>
                  )}

                  <Button
                    disabled={!canShowCorrectedCode}
                    onClick={() =>
                      setShowCorrectedCode(!showCorrectedCode)
                    }
                    className="w-full gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {showCorrectedCode
                      ? "Show Original Code"
                      : "Show Corrected Code"}
                  </Button>

                  {!canShowCorrectedCode && (
                    <p className="text-xs text-muted-foreground text-center">
                      View at least {requiredHints} hints to unlock
                      corrected code
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ================= CHATBOT ================= */}
          <motion.button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center"
          >
            <MessageCircle />
          </motion.button>

          <SoftwareChatBot
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
            codeContext={code}
            language={language}
          />
        </div>
      </PageTransition>
    </Layout>
  );
};

export default SoftwareLabs;
