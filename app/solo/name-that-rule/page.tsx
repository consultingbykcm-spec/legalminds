"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRandomQuestions, shuffleAnswers, type Question } from "@/app/data/questions";

type Phase = "prompt" | "reveal" | "results";

export default function NameThatRule() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [choices, setChoices] = useState<string[][]>([]);
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<Phase>("prompt");
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    const qs = getRandomQuestions(10);
    setQuestions(qs);
    setChoices(qs.map(shuffleAnswers));
  }, []);

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const isCorrect = selected === q?.answer;

  function handleSelect(choice: string) {
    if (phase === "reveal") return;
    setSelected(choice);
    setPhase("reveal");
    const correct_ = choice === q.answer;
    if (correct_) {
      setCorrect((c) => c + 1);
      const ns = streak + 1;
      setStreak(ns);
      if (ns > bestStreak) setBestStreak(ns);
    } else {
      setStreak(0);
    }
  }

  function handleNext() {
    if (isLast) {
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
      setPhase("prompt");
      setSelected(null);
    }
  }

  function restart() {
    const qs = getRandomQuestions(10);
    setQuestions(qs);
    setChoices(qs.map(shuffleAnswers));
    setCurrent(0);
    setPhase("prompt");
    setSelected(null);
    setCorrect(0);
    setStreak(0);
    setBestStreak(0);
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-700 text-xs tracking-widest uppercase animate-pulse">Loading</div>
      </main>
    );
  }

  if (phase === "results") {
    const pct = Math.round((correct / questions.length) * 100);
    const grade = pct === 100 ? "Flawless." : pct >= 80 ? "Sharp." : pct >= 60 ? "Getting there." : "Study up.";
    return (
      <main className="min-h-screen bg-black flex flex-col justify-between px-6 py-10">
        <div />
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-4">Round Over</p>
          <div className="font-display text-[20vw] leading-none text-white">{pct}%</div>
          <div className="font-display text-3xl mt-2" style={{ color: "#D4AF37" }}>{grade}</div>
          <p className="text-gray-500 text-sm mt-3">{correct} of {questions.length} · Best streak: {bestStreak}</p>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={restart} className="w-full py-6 bg-white text-black font-display text-2xl tracking-widest hover:bg-[#D4AF37] transition-colors">
            GO AGAIN
          </button>
          <button onClick={() => router.push("/play")} className="w-full py-4 border border-gray-800 text-gray-500 font-display tracking-widest hover:border-white hover:text-white transition-colors">
            HOME
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex flex-col px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push("/play")} className="text-gray-700 text-xs tracking-widest uppercase hover:text-white">
          ✕
        </button>
        <div className="flex items-center gap-4">
          {streak > 1 && (
            <span className="text-xs tracking-widest font-bold" style={{ color: "#D4AF37" }}>
              {streak}✦
            </span>
          )}
          <span className="text-gray-600 text-xs tabular-nums">
            {current + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-px bg-gray-900 mb-8">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${(current / questions.length) * 100}%`,
            backgroundColor: "#D4AF37",
          }}
        />
      </div>

      {/* Prompt */}
      <div className="flex-1 flex flex-col">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-5">Name That Rule</p>
        <p className="text-xl text-white leading-relaxed font-medium mb-8">
          {q.prompt}
        </p>

        {/* Choices */}
        <div className="flex flex-col gap-3 mt-auto">
          {choices[current]?.map((choice) => {
            let style = "border border-gray-800 text-white hover:border-white";
            if (phase === "reveal") {
              if (choice === q.answer) {
                style = "border-2 text-black font-bold";
                // gold bg for correct
              } else if (choice === selected) {
                style = "border-2 border-[#FF4C6E] text-[#FF4C6E]";
              } else {
                style = "border border-gray-900 text-gray-700";
              }
            }

            const isAnswer = phase === "reveal" && choice === q.answer;

            return (
              <button
                key={choice}
                onClick={() => handleSelect(choice)}
                disabled={phase === "reveal"}
                className={`w-full py-4 px-5 text-left text-sm tracking-wide transition-all duration-100 ${style}`}
                style={isAnswer ? { backgroundColor: "#D4AF37", borderColor: "#D4AF37" } : {}}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {/* Post-reveal fact + next */}
        {phase === "reveal" && (
          <div className="mt-6">
            <p className="text-gray-500 text-xs leading-relaxed mb-5 border-l-2 border-gray-800 pl-3">
              {q.fact}
            </p>
            <button
              onClick={handleNext}
              className="w-full py-5 bg-white text-black font-display text-xl tracking-widest hover:bg-[#D4AF37] transition-colors"
            >
              {isLast ? "SEE RESULTS" : "NEXT →"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
