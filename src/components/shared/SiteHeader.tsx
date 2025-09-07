import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight hover:opacity-90 [font-family:var(--font-playfair),serif]"
        >
          Art Explorer
        </Link>
        <nav aria-label="Primary" className="text-sm text-neutral-700">
          <Link
            href="/"
            className="hover:text-[var(--primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)] rounded"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
