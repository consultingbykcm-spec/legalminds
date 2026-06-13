"use client";
import { useRouter } from "next/navigation";

const subjects = [
  {
    label: "Constitutional Law",
    color: "#D4AF37",
    games: [
      { title: "Name That Rule", sub: "40 questions · Con Law I & II", href: "/solo/name-that-rule", internal: true },
    ],
  },
  {
    label: "Wills & Trusts",
    color: "#fff",
    games: [
      { title: "Flashcard Drill", sub: "Wills rules & elements", href: "/games/wills_flashcards.html" },
      { title: "Checklist Game", sub: "Full analysis checklist", href: "/games/wills_checklist.html" },
      { title: "No Fact Left Behind — Q1", sub: "Tess's Estate · Issue spotting", href: "/games/nflb_wills_q1.html" },
      { title: "No Fact Left Behind — Q2", sub: "Issue spotting · Level 2", href: "/games/nflb_wills_q2.html" },
      { title: "No Fact Left Behind — Q3", sub: "Issue spotting · Level 2", href: "/games/nflb_wills_q3.html" },
      { title: "No Fact Left Behind — Wills", sub: "Full issue spotting drill", href: "/games/nflb_wills.html" },
      { title: "Trusts Checklist", sub: "Trusts analysis checklist", href: "/games/trusts_checklist.html" },
      { title: "Trusts Buzzword Drill", sub: "Buzzword reveal by element", href: "/games/trusts_buzzword.html" },
      { title: "Trusts Flashcards", sub: "Trusts rules & concepts", href: "/games/trusts_flashcards.html" },
    ],
  },
  {
    label: "Community Property",
    color: "#fff",
    games: [
      { title: "Checklist Drill", sub: "Full CP analysis checklist", href: "/games/cp_checklist.html" },
      { title: "CP Drill", sub: "Elements & buzzwords", href: "/games/cp_drill.html" },
      { title: "No Fact Left Behind — CP1", sub: "Issue spotting", href: "/games/nflb_cp1.html" },
      { title: "No Fact Left Behind — CP2", sub: "Issue spotting", href: "/games/nflb_cp2.html" },
      { title: "No Fact Left Behind — CP3", sub: "Issue spotting", href: "/games/nflb_cp3.html" },
      { title: "No Fact Left Behind — CP4", sub: "Issue spotting", href: "/games/nflb_cp4.html" },
    ],
  },
  {
    label: "Evidence",
    color: "#fff",
    games: [
      { title: "Elements Drill", sub: "FRE rules by element · tap to reveal", href: "/games/evidence_elements.html" },
      { title: "MBE Practice", sub: "Multiple choice questions", href: "/games/mbe_practice.html" },
    ],
  },
  {
    label: "Business Associations",
    color: "#fff",
    games: [
      { title: "BA Checklist", sub: "Full analysis checklist", href: "/games/ba_checklist.html" },
      { title: "No Fact Left Behind — Agency", sub: "Bell, Tome, Lamp fact pattern", href: "/games/nflb_ba.html" },
    ],
  },
  {
    label: "Professional Responsibility",
    color: "#fff",
    games: [
      { title: "PR Checklist", sub: "Full PR analysis checklist", href: "/games/pr_checklist.html" },
      { title: "Elements Drill", sub: "PR rules by element", href: "/games/pr_elements.html" },
      { title: "MBE Practice", sub: "PR multiple choice", href: "/games/pr_mbe.html" },
    ],
  },
];

export default function SoloChoice() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black px-6 py-10">
      <div className="max-w-lg mx-auto">
        <button onClick={() => router.push("/play")} className="text-gray-700 text-xs tracking-widest uppercase hover:text-white mb-8 block">
          ← Back
        </button>

        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-2">Solo</p>
        <h1 className="font-display text-5xl text-white leading-tight mb-10">GAME<br />LIBRARY.</h1>

        <div className="flex flex-col gap-10">
          {subjects.map((subject) => (
            <div key={subject.label}>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: subject.color === "#fff" ? "#6b7280" : subject.color }}>
                {subject.label}
              </div>
              <div className="flex flex-col gap-2">
                {subject.games.map((game) => (
                  <a
                    key={game.title}
                    href={game.href}
                    className="block w-full py-4 px-5 border border-gray-800 text-white hover:border-white hover:bg-white hover:text-black transition-all duration-100 group"
                  >
                    <div className="text-sm font-bold tracking-wide">{game.title}</div>
                    <div className="text-xs text-gray-600 group-hover:text-gray-400 mt-0.5">{game.sub}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
