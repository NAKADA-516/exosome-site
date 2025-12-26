"use client";

import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";

export default function MobileBottomCta() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] md:hidden">
      <div className="rounded-full bg-white/95 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur">
        <div className="grid grid-cols-3 gap-2 text-sm font-semibold">
          <Link
            href="/#pricing"
            className="flex items-center justify-center gap-1 rounded-full border border-[#0ea5e9] bg-[#e5f6ff] px-3 py-2 text-[#0b7db4] shadow-sm transition active:translate-y-[1px]"
          >
            <Send className="h-4 w-4" />
            <span className="whitespace-nowrap">WEB予約</span>
          </Link>
          <a
            href="https://line.me/R/ti/p/@example"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-full bg-[#06c755] px-3 py-2 text-white shadow-sm transition active:translate-y-[1px]"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="whitespace-nowrap">LINE追加</span>
          </a>
          <a
            href="tel:0362819733"
            className="flex items-center justify-center gap-1 rounded-full border border-[#0ea5e9] px-3 py-2 text-[#0b7db4] shadow-sm transition active:translate-y-[1px]"
          >
            <Phone className="h-4 w-4" />
            <span className="whitespace-nowrap">電話</span>
          </a>
        </div>
      </div>
    </div>
  );
}

