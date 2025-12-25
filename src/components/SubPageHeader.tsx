'use client'

"use client";

import React, { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "DP-SCCMとは" },
  { href: "/#compare", label: "特徴" },
  { href: "/#effect", label: "効果" },
  { href: "/#flow", label: "施術の流れ" },
  { href: "/#pricing", label: "料金" },
  { href: "/#faq", label: "よくある質問" },
];

export default function SubPageHeader() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "px-3 py-2 text-sm font-medium transition-colors duration-150 rounded-md";
  const desktopLinkClass = `${linkBase} text-slate-700 hover:text-slate-900`;
  const mobileLinkClass = `${linkBase} block text-slate-700 hover:bg-slate-100`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f2ff] text-[#0ea5e9] font-semibold">
            NA
          </div>
          <div className="leading-tight">
            <Link href="/" className="text-base font-semibold text-slate-900">
              NEW AGE CLINIC
            </Link>
            <p className="text-[11px] text-slate-500">Exosome & DP-SCCM</p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={desktopLinkClass}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 pl-3">
            <a
              href="https://line.me/R/ti/p/@example"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#0ea5e9] px-4 py-2 text-sm font-semibold text-[#0ea5e9] transition hover:bg-[#e0f4ff]"
            >
              LINE予約
            </a>
            <Link
              href="/#pricing"
              className="rounded-full bg-[#0ea5e9] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#0ea5e9]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              WEB予約
            </Link>
            <a
              href="tel:0362819733"
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              03-6281-9733
            </a>
          </div>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            aria-expanded={open}
          >
            <span className="sr-only">メニューを開く</span>
            {!open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-lg">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://line.me/R/ti/p/@example"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`${mobileLinkClass} flex items-center gap-2 text-[#0ea5e9]`}
            >
              LINE予約
            </a>
            <Link
              href="/#pricing"
              onClick={() => setOpen(false)}
              className={`${mobileLinkClass} bg-[#0ea5e9] text-white`}
            >
              WEB予約
            </Link>
            <a
              href="tel:0362819733"
              onClick={() => setOpen(false)}
              className={`${mobileLinkClass} text-slate-800`}
            >
              03-6281-9733
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}













