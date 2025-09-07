"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [theme, setTheme] = useState<string>("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.classList.toggle("dark", stored === "dark");
    setIsMounted(true);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-white/50 dark:bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          prefetch
          className="font-semibold tracking-tight hover:opacity-90 [font-family:var(--font-playfair),serif] text-neutral-900 dark:text-neutral-100"
        >
          Art Explorer
        </Link>
        <div className="flex items-center gap-3">
          <nav aria-label="Primary" className="text-sm text-neutral-700 dark:text-neutral-200">
            <Link
              href="/"
              prefetch
              className="hover:text-[var(--primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)] rounded"
            >
              Home
            </Link>
          </nav>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md border text-neutral-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)] dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            {isMounted && theme === "dark" ? (
              // Sun icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                <path d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm0 16.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75ZM4.72 4.72a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06L4.72 5.78a.75.75 0 0 1 0-1.06Zm12.38 12.38a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM2.25 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm16.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM4.72 19.28a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0Zm12.38-12.38a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0Z" />
              </svg>
            ) : (
              // Moon icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
