"use client";
import { useRouter } from "next/navigation";

export default function Entry() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex flex-col justify-between px-6 py-10">
      {/* Top label */}
      <div>
        <span className="text-[10px] tracking-[0.4em] uppercase text-gray-600">
          Street Game for Hustlers
        </span>
      </div>

      {/* Wordmark */}
      <div className="-ml-1">
        <div className="font-display text-[18vw] leading-[0.85] text-white">
          LEGAL
        </div>
        <div className="font-display text-[18vw] leading-[0.85]" style={{ color: "#D4AF37" }}>
          MINDS
        </div>
        <div className="mt-6">
          <span className="text-sm text-gray-500 tracking-wide">
            Play the law at its own game.
          </span>
        </div>
      </div>

      {/* CTA */}
      <div>
        <button
          onClick={() => router.push("/play")}
          className="w-full py-6 bg-white text-black font-display text-2xl tracking-widest hover:bg-[#D4AF37] transition-colors duration-150"
        >
          PLAY
        </button>
        <div className="flex justify-end mt-3">
          <span className="text-gray-700 text-xs">★</span>
        </div>
      </div>
    </main>
  );
}
