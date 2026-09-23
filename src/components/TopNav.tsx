import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const LINKS = [
  { to: "/wonderland", label: "Wonderland" },
  { to: "/album/home-for-christmas", label: "Album One" },
  { to: "/album/wonderland", label: "Album Two" },
  { to: "/journey", label: "Our Christmas" },
  { to: "/memory-tree", label: "Memory Tree" },
  { to: "/notes", label: "Christmas Notes" },
  { to: "/about", label: "About" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="flicker">
            <path d="M13 2 L17 10 L13 8 L9 10 Z" fill="#d69900" />
            <path d="M13 7 L20 18 L13 15.5 L6 18 Z" fill="#d69900" opacity="0.85" />
            <path d="M13 13 L22 24 L13 21 L4 24 Z" fill="#d69900" opacity="0.7" />
          </svg>
          <span className="font-display text-lg tracking-wide text-cream transition-colors group-hover:text-gold">
            Christmas Wonderland
          </span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-gold-dim bg-black/30 backdrop-blur-sm transition-colors hover:border-gold"
        >
          <span className="h-px w-5 bg-cream" />
          <span className="h-px w-5 bg-cream" />
          <span className="h-px w-3.5 self-center bg-gold" />
        </button>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setOpen(false)} />
        <nav
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col justify-center gap-1 border-l border-gold-dim bg-[#151515] px-10 transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold-dim text-cream hover:border-gold"
          >
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.4" /></svg>
          </button>
          {LINKS.map((l, i) => (
            <button
              key={l.to}
              onClick={() => {
                setOpen(false);
                navigate(l.to);
              }}
              className={`fade-up border-b border-white/5 py-3.5 text-left font-display text-2xl transition-colors hover:text-gold ${
                location.pathname === l.to ? "text-gold" : "text-cream"
              }`}
              style={{ animationDelay: `${0.05 * i + 0.1}s` }}
            >
              {l.label}
            </button>
          ))}
          <p className="mt-8 text-xs tracking-[0.2em] text-taupe uppercase">
            Two albums · One family · Ten worlds
          </p>
        </nav>
      </div>
    </>
  );
}
