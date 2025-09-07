"use client";

import { useEffect } from "react";

const REPORT_PATH =
  "file:///C:/Users/leulg/OneDrive/Desktop/study%20material%20and%20projects/test/art-explorer-dwc6.vercel.app_2025-09-07_11-48-16.report.html";

export default function PerformanceRedirect() {
  useEffect(() => {
    try {
      window.location.assign(REPORT_PATH);
    } catch {
      // no-op
    }
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Opening Performance Report…</h1>
      <p className="text-neutral-700">
        If you are not redirected automatically, open it manually:{" "}
        <a href={REPORT_PATH} className="text-[var(--primary)] underline">
          View Lighthouse report
        </a>
      </p>
    </main>
  );
}
