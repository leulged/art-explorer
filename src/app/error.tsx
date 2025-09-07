"use client";

import ErrorBanner from "@/components/shared/ErrorBanner";

export default function Error() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Art Explorer – Error</h1>
      <ErrorBanner />
    </main>
  );
}
