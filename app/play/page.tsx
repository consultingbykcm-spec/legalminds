"use client";
import { useRouter } from "next/navigation";

export default function PlayChoice() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black flex flex-col justify-between px-6 py-10">
      <button onClick={() => router.push("/")} className="text-gray-700 text-xs tracking-widest uppercase hover:text-white">
        ← Back
      </button>

      <div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-600 mb-3">
          How do you want to play?
        </p>
        <h1 className="font-display text-5xl text-white leading-tight mb-12">
          CHOOSE<br />YOUR<br />MODE.
        </h1>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/solo")}
            className="w-full py-7 bg-white text-black font-display text-2xl tracking-widest text-left px-6 hover:bg-[#D4AF37] transition-colors duration-150"
          >
            PLAY SOLO
          </button>

          <button
            disabled
            className="w-full py-7 border border-gray-900 text-gray-700 font-display text-2xl tracking-widest text-left px-6 cursor-not-allowed"
          >
            PLAY OTHERS
            <span className="block text-xs font-sans font-normal tracking-widest text-gray-700 mt-1">
              Coming soon
            </span>
          </button>
        </div>
      </div>

      <div className="text-gray-700 text-xs tracking-widest uppercase">LegalMinds</div>
    </main>
  );
}
