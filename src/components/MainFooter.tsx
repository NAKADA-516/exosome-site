'use client'

"use client";

import React from "react";
import Link from "next/link";

const footerLinksLeft = [
  { href: "/#about", label: "DP-SCCMとは" },
  { href: "/#compare", label: "特徴" },
  { href: "/#effect", label: "効果" },
  { href: "/#flow", label: "施術の流れ" },
];

const footerLinksRight = [
  { href: "/#pricing", label: "料金" },
  { href: "/#faq", label: "よくある質問" },
];

export default function MainFooter() {
  return (
    <footer className="relative bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.16),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f2ff] text-[#0ea5e9] font-semibold">
                NA
              </div>
              <div>
                <p className="text-lg font-semibold">NEW AGE CLINIC</p>
                <p className="text-xs text-slate-300">Exosome & DP-SCCM</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              歯髄由来幹細胞培養上清液を用いた再生美容。肌・体の内外から美しさと健やかさを引き出します。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-[#cdefff]">メニュー</h4>
              <ul className="space-y-2 text-slate-300">
                {footerLinksLeft.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-[#cdefff]">ご案内</h4>
              <ul className="space-y-2 text-slate-300">
                {footerLinksRight.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a href="tel:0362819733" className="hover:text-white transition-colors">
                    03-6281-9733
                  </a>
                </li>
                <li>
                  <a
                    href="https://line.me/R/ti/p/@example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LINE予約
                  </a>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-white transition-colors">
                    WEB予約
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <h4 className="text-sm font-semibold text-[#f3e6c9]">クリニック情報</h4>
            <p>東京都中央区銀座3-11-16 VORT銀座イースト10F</p>
            <p>
              診療時間：10:00〜19:00 <span className="text-slate-400">（休診日：月曜・水曜）</span>
            </p>
            <p>日比谷線「東銀座駅」3番出口 徒歩3分 / 都営浅草線 A7・A8出口 徒歩1分</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          <p>© 2025 NEW AGE CLINIC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}













