import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { api } from "../lib/api";
import MessageContent from "../components/chat/MessageContent";

type Message = { role: "user" | "model"; text: string };
type SpeechResult = { transcript: string };
type SpeechEvent = { results: ArrayLike<ArrayLike<SpeechResult>> };
type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I’m your AarogyaCare Health Guide. Ask me about general health, wellness, nutrition, or how to prepare for a conversation with your clinician.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");
  const recognition = useRef<SpeechRecognitionLike | null>(null);
  const send = async (event?: FormEvent) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setError("");
    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setBusy(true);
    try {
      const result = await api("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text, history: messages.slice(-12) }),
      });
      setMessages([
        ...next,
        {
          role: "model",
          text: result.reply || "I could not generate a response.",
        },
      ]);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to reach the health assistant",
      );
    } finally {
      setBusy(false);
    }
  };
  const toggleMic = () => {
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const SpeechRecognition =
      (window as SpeechWindow).SpeechRecognition ||
      (window as SpeechWindow).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError(
        "Voice input is not supported in this browser. Try Chrome or Edge.",
      );
      return;
    }
    const instance = new SpeechRecognition();
    instance.lang = "en-IN";
    instance.continuous = false;
    instance.interimResults = false;
    instance.onresult = (event) =>
      setInput(
        Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(" "),
      );
    instance.onend = () => setListening(false);
    instance.onerror = () => {
      setListening(false);
      setError("Microphone access was not available.");
    };
    recognition.current = instance;
    setError("");
    setListening(true);
    instance.start();
  };
  useEffect(() => () => recognition.current?.stop(), []);
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b bg-white px-5 py-4">
        <Link to="/dashboard" className="font-bold text-teal-700">
          ← AarogyaCare
        </Link>
        <span className="text-sm font-semibold text-slate-600">
          Health Guide
        </span>
      </header>
      <section className="mx-auto flex h-[calc(100vh-73px)] max-w-3xl flex-col px-4 py-5">
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
          For education only—not a diagnosis or emergency service. If you have
          severe or life-threatening symptoms, contact local emergency services
          immediately.
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl bg-white p-4 shadow-sm">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-800"}`}
              >
                {message.role === "model" ? (
                  <MessageContent content={message.text} />
                ) : (
                  <span className="whitespace-pre-wrap">{message.text}</span>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div className="text-sm text-slate-500">
              Health Guide is thinking…
            </div>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <form
          onSubmit={send}
          className="mt-4 flex gap-2 rounded-2xl bg-white p-2 shadow-sm"
        >
          <button
            type="button"
            onClick={toggleMic}
            aria-label={listening ? "Stop recording" : "Use microphone"}
            className={`rounded-xl px-4 py-2 text-xl ${listening ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`}
          >
            {listening ? "■" : "🎙️"}
          </button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={listening ? "Listening…" : "Ask a health question…"}
            className="min-w-0 flex-1 px-2 outline-none"
            maxLength={4000}
          />
          <button
            disabled={busy || !input.trim()}
            className="rounded-xl bg-teal-700 px-5 py-2 font-semibold text-white disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
