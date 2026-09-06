import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

const ACCESS_CODE = "sep7th0907";
const STORAGE_KEY = "sep7th-unlocked";

export function PasscodeGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(STORAGE_KEY) === "true");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const unlock = () => {
    if (passcode.trim().toLowerCase() === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
      setError(false);
      return;
    }

    setError(true);
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#FBF8F3] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 35%, rgba(244,184,193,0.18) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 w-full max-w-md rounded-[2rem] border border-rule/70 bg-white/70 backdrop-blur-md shadow-[0_20px_80px_rgba(28,25,23,0.12)] p-8 text-center"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-[#c26b7a] mb-3">private link</p>
        <h1 className="font-display text-4xl text-ink text-balance leading-tight mb-3">Enter the passcode</h1>
        <p className="font-body text-sm text-ink-3 mb-8">This story opens only for the right person.</p>

        <label className="sr-only" htmlFor="passcode">Passcode</label>
        <input
          id="passcode"
          type="password"
          autoComplete="off"
          value={passcode}
          onChange={(event) => {
            setPasscode(event.target.value);
            setError(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              unlock();
            }
          }}
          placeholder="Passcode"
          className="w-full rounded-2xl border border-rule bg-white px-4 py-3 font-body text-sm text-ink placeholder:text-ink-3/60 focus:outline-none focus:ring-2 focus:ring-[#F4B8C1]"
        />

        {error && <p className="mt-3 text-sm text-[#b04a5b] font-body">Wrong passcode. Try again.</p>}

        <button
          type="button"
          onClick={unlock}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 font-body text-sm text-paper transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Unlock
        </button>

        <p className="mt-6 text-xs text-ink-3 font-body">Hint: this site is for one person only.</p>
      </motion.div>
    </div>
  );
}