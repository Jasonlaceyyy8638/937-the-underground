import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

export default function LegalDocumentLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-6 backdrop-blur-xl safe-x sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-sm font-black uppercase tracking-[0.18em] text-fuchsia-300 transition-colors hover:text-fuchsia-200"
          >
            ← 937 The Underground
          </Link>
          <p className="font-sans text-xs text-zinc-500">
            Last Updated: {LEGAL_LAST_UPDATED}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 safe-x sm:px-8 sm:py-14">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase tracking-[0.04em] text-white sm:text-4xl">
          {title}
        </h1>
        <article className="legal-prose mt-8 space-y-8">{children}</article>
      </main>

      <footer className="border-t border-zinc-800/80 px-4 py-8 text-center safe-bottom safe-x">
        <nav className="mb-4 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-widest text-zinc-500">
          <Link href="/terms" className="transition-colors hover:text-fuchsia-300">
            Terms of Service
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/privacy" className="transition-colors hover:text-fuchsia-300">
            Privacy Policy
          </Link>
        </nav>
        <p className="text-[10px] tracking-wide text-zinc-600">
          © 2026 937 The Underground — Dayton, Ohio
        </p>
      </footer>
    </div>
  );
}
