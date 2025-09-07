import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-neutral-600 mb-6">The page you are looking for doesn’t exist.</p>
      <Link
        href="/"
        className="inline-block px-4 py-2 rounded border bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)]"
      >
        Go back home
      </Link>
    </main>
  );
}


