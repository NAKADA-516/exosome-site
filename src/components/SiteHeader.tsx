"use client";

import Link from "next/link";
import { Phone, Send } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "診療案内" },
  { href: "/#clinic", label: "クリニック紹介" },
  { href: "/#news", label: "お知らせ" },
];

export default function SiteHeader() {
  return (
    <header className="bg-[#f7eae5] text-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm md:text-base">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg md:text-xl">
          <span className="font-semibold">NEWAGE CLINIC</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#7b5a50]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#7b5a50] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#6c4f47] md:text-sm"
          >
            <Send className="h-4 w-4" />
            ご予約はこちら
          </Link>
          <a
            href="tel:0362819733"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7b5a50] md:text-base"
          >
            <Phone className="h-4 w-4" />
            03-6281-9733
          </a>
        </div>
      </div>
    </header>
  );
}

