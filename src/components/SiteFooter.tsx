"use client";

import Link from "next/link";
import { Phone, Send, Sparkles, HeartPulse, ShieldCheck } from "lucide-react";

const accessList = [
  "日比谷線 東銀座駅3番出口から徒歩3分",
  "銀座線 銀座駅A8出口から徒歩7分",
  "各路線 東銀座駅より徒歩4分",
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#f3ede9] text-slate-800">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-12" id="contact">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold text-[#7b5a50]">肌は、再生できる時代へ。</h3>
          <p className="text-sm text-slate-700">
            幹細胞の力で、本来の美しさを目覚めさせましょう。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr,1.2fr] md:items-start">
          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-100">
            <div className="flex items-center gap-2 font-serif text-lg font-semibold">
              <span>NEWAGE CLINIC</span>
            </div>
            <div className="space-y-2 text-sm leading-6 text-slate-700">
              <p>東京都中央区銀座3-11-16 VORT銀座イースト10F</p>
              <p>診療時間：10:00〜19:00　休診日：月曜日・水曜日</p>
            </div>
            <a
              href="tel:0362819733"
              className="inline-flex items-center gap-2 text-lg font-semibold text-[#7b5a50]"
            >
              <Phone className="h-5 w-5" />
              03-6281-9733
            </a>
            <Link
              href="/#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7b5a50] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6c4f47]"
            >
              <Send className="h-4 w-4" />
              ご予約はこちら
            </Link>
            <div className="space-y-2 text-xs text-slate-600">
              {accessList.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1 w-1 rounded-full bg-[#7b5a50]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-100">
            <iframe
              title="NEW AGE CLINIC Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.1600429531207!2d139.76999317559235!3d35.67107177258867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbcb36efd8d%3A0xbf2b9bdf6c39d1c1!2sVORT%20Ginza%20East!5e0!3m2!1sen!2sjp!4v1719999999999!5m2!1sen!2sjp"
              width="100%"
              height="360"
              className="h-[300px] w-full md:h-[380px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* 下部バーを非表示（要素なし） */}
    </footer>
  );
}

