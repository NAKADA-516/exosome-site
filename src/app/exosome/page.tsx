"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Leaf,
  ChevronDown,
  Clock,
  CheckCircle2,
  HeartPulse,
  Send,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

type FaqItem = {
  question: string;
  answer: string;
};

const benefits = [
  {
    title: "毛髪・頭皮環境のリセット",
    description:
      "頭皮の炎症バランスを整え、ハリとコシを与えて髪の土台を健やかに保ちます。",
    icon: ShieldCheck,
  },
  {
    title: "エイジングサインのケア",
    description:
      "うるおいと弾力を補い、キメを整えることで、なめらかな質感と透明感を後押しします。",
    icon: Sparkles,
  },
  {
    title: "健やかな回復力",
    description:
      "高濃度のサイトカインや成長因子が肌・頭皮の自己回復をサポートし、ゆらぎにくい状態へ。",
    icon: HeartPulse,
  },
];

const growthFactors = [
  "EGF（上皮成長因子）",
  "FGF（線維芽細胞成長因子）",
  "VEGF（血管内皮成長因子）",
  "HGF（肝細胞増殖因子）",
  "IGF-1（インスリン様成長因子）",
  "TGF-β（トランスフォーミング増殖因子）",
  "PDGF（血小板由来成長因子）",
  "各種サイトカイン・エクソソーム",
];

const comparisonRows = [
  {
    label: "抽出由来",
    dp: "歯髄幹細胞（医療グレード）",
    other: "臍帯・脂肪など汎用ソース",
    differ: "医療機関管理下の限定ロットで一貫性を担保",
  },
  {
    label: "有効成分濃度",
    dp: "成長因子・サイトカインを高密度保持",
    other: "ロット差が大きく濃度ばらつき",
    differ: "濃度と純度をラボでロット毎に検証",
  },
  {
    label: "安全性",
    dp: "無血清培養・無抗生物質で製造",
    other: "血清培養・抗生物質併用例あり",
    differ: "不要成分を極力排除し反応リスクを低減",
  },
  {
    label: "目的適合性",
    dp: "美容・毛髪双方を想定した配合",
    other: "用途特化で汎用性が限定的",
    differ: "複合的な悩みにワンストップで対応",
  },
  {
    label: "テクスチャ",
    dp: "軽やかで浸透性を意識した処方",
    other: "ベタつきや刺激感が残る例も",
    differ: "施術後の快適さに配慮した滑らか設計",
  },
];

const steps = [
  {
    title: "カウンセリング",
    description: "お悩み・生活習慣をお伺いし、適切なプランを提案します。",
  },
  {
    title: "クレンジング・準備",
    description: "皮脂や汚れをオフし、成分が届きやすい状態に整えます。",
  },
  {
    title: "DP-SCCM導入",
    description: "頭皮・お顔へまんべんなく導入し、浸透を促します。",
  },
  {
    title: "鎮静・保湿ケア",
    description: "鎮静パックや保湿でコンディションを落ち着かせます。",
  },
  {
    title: "ホームケア案内",
    description: "効果を高めるアフターケアと次回来院の目安を共有します。",
  },
];

const pricing = [
  { name: "単回（頭皮または顔）", price: "¥66,000", note: "初回カウンセリング込み" },
  { name: "3回コース", price: "¥180,000", note: "1回あたり ¥60,000 / 有効期限6ヶ月" },
  { name: "6回コース", price: "¥330,000", note: "1回あたり ¥55,000 / 有効期限12ヶ月" },
  { name: "頭皮＋顔セット", price: "¥98,000", note: "同日施術の特別セット" },
];

const faqs: FaqItem[] = [
  {
    question: "幹細胞上清液とは幹細胞そのものですか？",
    answer:
      "いいえ、幹細胞そのものではありません。幹細胞培養上清液とは、幹細胞を培養する際に分泌される「成長因子」「サイトカイン」「エクソソーム」などの有用成分を含む、上澄み液のことです。幹細胞は含まれていないため、より安全に使用できます。",
  },
  {
    question: "痛みはありますか？",
    answer:
      "点滴は通常の静脈注射程度。MPガン施術は麻酔クリームを併用しますので痛みは最小限です。痛みの感じ方には、事前にしっかりと麻酔対応いたしますのでご安心ください。エアダーマジェットは痛みの少ないエアジェット施術です。",
  },
  {
    question: "ダウンタイムはありますか？",
    answer:
      "点滴にはダウンタイムはほとんどありません。MPガンは一時的な赤みや腫れが出ることがありますが、通常数時間〜1日以内に落ち着きます。過度な刺激の場合には1日から2週間以内に落ち着きます。エアダーマジェットはダウンタイムの少ないエアジェット施術になります。施術当日から洗顔、お化粧ができます。",
  },
  {
    question: "どのくらいの頻度で施術を受けるのが効果的ですか？",
    answer:
      "2〜4週間に1回のペースで、継続的に受けていただくとより効果が高まります。初回から実感を得られる方もいらっしゃいますが、肌質改善には継続が大切です。",
  },
  {
    question: "副作用や安全性が心配です。",
    answer:
      "使用する上清液は、国内の厳格な品質管理のもとで製造された医療用グレードの製品です。無菌製造・ウイルス検査・無血清培地などを徹底しており、安全性には十分に配慮されています。安全性は高いと考えられています。",
  },
  {
    question: "パウダールームはありますか？",
    answer:
      "当院にはパウダールームがないため、お化粧をせずにお越しください。",
  },
];

const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => (
  <motion.section
    id={id}
    className="mx-auto max-w-6xl px-6 py-16 md:py-20"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="mb-10 space-y-3 text-center">
      <p className="text-sm tracking-[0.3em] text-[#0ea5e9]">EXOSOME CARE</p>
      <h2 className="font-serif text-3xl md:text-4xl text-slate-900">{title}</h2>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
    {children}
  </motion.section>
);

const AccordionItem = ({ item }: { item: FaqItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
      <button
        className="flex w-full items-center justify-between px-4 py-4 text-left md:px-6"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <div className="mr-4">
          <p className="font-semibold text-slate-900">{item.question}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-[#B89446] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.25 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="px-4 pb-4 text-slate-600 md:px-6">{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ExosomePage() {
  return (
    <div className="bg-[#f4f8ff] text-slate-900">
      {/* 右側フローティングCTA（PC表示） */}
      <div className="fixed right-3 top-1/3 z-50 hidden md:flex flex-col gap-3">
        <a
          href="#contact"
          className="flex h-52 w-16 flex-col items-center justify-center gap-3 rounded-full bg-white text-[#7b5a50] shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-2xl"
          aria-label="カウンセリング予約"
        >
          <Send className="h-6 w-6" />
          <span
            className="text-sm font-medium tracking-[0.2em] leading-6"
            style={{ writingMode: "vertical-rl", wordBreak: "keep-all" }}
          >
            カウンセリング予約
          </span>
        </a>
        <a
          href="https://line.me/R/ti/p/@example"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-52 w-16 flex-col items-center justify-center gap-3 rounded-full bg-[#00b900] text-white shadow-lg ring-1 ring-[#00a200] transition hover:-translate-y-0.5 hover:shadow-2xl"
          aria-label="LINE追加"
        >
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          <div className="flex flex-col items-center justify-center text-sm font-medium leading-5">
            {["L", "I", "N", "E", "追", "加"].map((char) => (
              <span key={char}>{char}</span>
            ))}
          </div>
        </a>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#eaf5ff] to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.1),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.2),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10">
          <div className="overflow-hidden rounded-[28px] shadow-xl ring-1 ring-slate-200">
            <Image
              src="/publicimagesexosomehero.png"
              alt="施術イメージ"
              width={1280}
              height={720}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* カウンセリングCTA */}
      <div className="px-6">
        <div className="mx-auto mt-6 max-w-4xl">
          <div className="rounded-3xl bg-white/95 px-6 py-6 shadow-xl ring-1 ring-slate-100 md:px-10 md:py-8">
            <p className="text-center text-sm font-semibold text-slate-700">
              まずはお気軽に無料カウンセリングをご利用ください！
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <a
                href="https://line.me/R/ti/p/@example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#06c755] px-5 py-3 text-sm font-medium text-white shadow-md shadow-[#06c755]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE予約
              </a>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-[#0e5ba5] px-5 py-3 text-sm font-medium text-white shadow-md shadow-[#0e5ba5]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.5l-10 5-10-5V4zm0 4.236l9.447 4.724a1 1 0 00.894 0L22 8.236V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.236z" />
                </svg>
                WEB予約
              </Link>
            </div>
            <div className="mt-3 flex justify-center text-lg font-semibold text-[#0e5ba5]">
              <a href="tel:0362819733" className="inline-flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5a2 2 0 012-2h2a1 1 0 011 .78l1 5a1 1 0 01-.54 1.08l-1.7.85a11.04 11.04 0 006.1 6.1l.86-1.71A1 1 0 0116.22 15l5 1a1 1 0 01.78 1v2a2 2 0 01-2 2h-1C10.82 21 3 13.18 3 4V5z" />
                </svg>
                03-6281-9733
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 説明セクション（CTA直下） */}
      <div className="mt-12 px-6 py-12 bg-soft-gradient bg-dots">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start">
          <div className="flex-1">
            <div className="overflow-hidden rounded-2xl bg-[#eaf3ff] shadow-none ring-0">
              <Image
                src="/tooth.png"
                alt="歯髄由来幹細胞のイメージ"
                width={720}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-4 text-slate-800">
            <h2 className="text-3xl font-bold text-slate-900">歯髄由来幹細胞培養上清液とは</h2>
            <p>
              歯髄由来幹細胞培養上清液は、乳歯や親知らずなどから採取された歯髄幹細胞を培養する過程で得られる上澄み液です。この液体には、幹細胞が分泌する「成長因子」「サイトカイン」「エクソソーム」などの有効成分が豊富に含まれており、肌や体の再生・修復を内外からサポートします。
            </p>
            <p>
              歯髄（しずい）とは、歯の中心部にある柔らかい組織のことで、いわゆる「歯の神経」として知られています。この部分には血管や神経に加え、非常に再生能力の高い「間葉系幹細胞（MSC）」が多く存在しています。特に若年者の歯髄から得られる幹細胞は、その活性の高さから美容医療分野で注目を集めています。
            </p>
            <p>
              当クリニックでは、高品質な歯髄由来幹細胞培養上清液を使用し、お肌の若返りや全身の健康促進を目指す最先端の治療を提供しています。10ccあたり198,000円というアクセスしやすい価格設定で、最新の再生医療の恩恵を体験いただけます。
            </p>
          </div>
        </div>
      </div>

      {/* 施術メニュー セクション */}
      <div className="px-6 py-14 bg-soft-gradient bg-dots">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-[#0e5ba5] tracking-[0.2em]">施術メニュー</p>
            <h2 className="text-3xl font-bold text-slate-900">幹細胞上清液点滴</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[#0e5ba5]">
              <span className="rounded-full bg-[#e5f1ff] px-3 py-1 text-sm font-semibold">施術メニュー①</span>
              <span className="text-sm font-semibold text-[#0e5ba5]">
                先着50名!! <span className="text-xl text-[#d9480f] font-extrabold">10cc 198,000円 (税込)</span> 定価の60%OFF
          </span>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-[1.2fr,1fr] md:items-center">
            <div className="space-y-4 text-slate-800">
              <p>
                幹細胞上清液点滴は、歯髄由来幹細胞培養上清液を静脈内に直接投与する施術です。血流を通じて全身の細胞に有効成分を届け、体内から美と健康をサポートします。
                体内の細胞が活性化されることで、肌の若返りだけでなく、疲労回復や免疫力向上など、全身的な効果が期待できます。
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>全身の細胞活性化による若返り効果</li>
                <li>疲労回復・エネルギー増加</li>
                <li>自然治癒力の強化</li>
                <li>肌のハリ・ツヤの向上</li>
                <li>免疫機能の向上</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
              <Image
                src="/publicimagesexosomemenu-drip.png"
                alt="幹細胞上清液点滴のイメージ"
                width={720}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-slate-100 md:divide-y-0 md:divide-x">
              <div className="p-4 md:p-6">
                <p className="text-sm font-semibold text-[#0e5ba5]">期待できる効果</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-800">
                  <li>全身の細胞活性化による若返り効果</li>
                  <li>疲労回復・エネルギー増加</li>
                  <li>自然治癒力の強化</li>
                </ul>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-sm font-semibold text-[#0e5ba5]">期待できる効果</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-800">
                  <li>肌のハリ・ツヤの向上</li>
                  <li>免疫機能の向上</li>
          </ul>
        </div>
      </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#eaf3ff] px-4 py-3 text-sm font-semibold text-slate-800 md:px-6">
              施術詳細
            </div>
            <div className="px-0 md:px-0">
              <table className="w-full text-sm text-slate-800">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      所要時間
                    </th>
                    <td className="px-4 py-3">約30分</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      価格
                    </th>
                    <td className="px-4 py-3">10cc 198,000円</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      効果持続期間
                    </th>
                    <td className="px-4 py-3">個人差がありますが、通常2〜4週間程度</td>
                  </tr>
                  <tr>
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      施術間隔
                    </th>
                    <td className="px-4 py-3">月1〜2回の定期的な施術がおすすめ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 施術メニュー セクション② */}
      <div className="px-6 py-14 bg-soft-gradient bg-dots">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-[#0e5ba5] tracking-[0.2em]">施術メニュー②</p>
            <h2 className="text-3xl font-bold text-slate-900">幹細胞上清液×MPガンフェイシャル</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[#0e5ba5]">
              <span className="text-sm font-semibold text-[#0e5ba5]">
                先着50名!! <span className="text-xl text-[#d9480f] font-extrabold">1cc 25,000円 (税込)</span> 定価の60%OFF
              </span>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[0.9fr,1.1fr] md:items-start">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200">
              <Image
                src="/mpgun-facial.webp"
                alt="MPガンフェイシャルのイメージ"
                width={720}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4 text-slate-800">
              <h3 className="text-xl font-semibold text-[#0e5ba5]">“再生因子”を肌の深層へ。</h3>
              <p>
                内側から目覚めるハリと輝き。幹細胞培養上清液に含まれる「成長因子」や「エクソソーム」などの再生成分を、高精度マイクロニードル技術（MPガン）で、肌の真皮層までダイレクトに届ける最先端フェイシャル治療です。
                極細の針で肌に微細な穴を開けながら、有効成分を正確に注入していく医療機器。肌に傷をつけずに均一かつ深部への浸透が可能で、従来の導入方法よりも高い効果が期待できます。
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#eaf3ff] px-4 py-3 text-sm font-semibold text-slate-800 md:px-6">
              施術詳細
            </div>
            <div className="px-0">
              <table className="w-full text-sm text-slate-800">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      所要時間
                    </th>
                    <td className="px-4 py-3">約60分</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      価格
                    </th>
                    <td className="px-4 py-3">1cc 25,000円 (税込)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      効果持続期間
                    </th>
                    <td className="px-4 py-3">2〜3週間程度</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      施術間隔
                    </th>
                    <td className="px-4 py-3">2週間〜1ヶ月に1回のペースがおすすめ</td>
                  </tr>
                  <tr>
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      ダウンタイム
                    </th>
                    <td className="px-4 py-3">1日〜1週間程度</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 divide-y divide-slate-100 text-sm text-slate-800">
              <div className="grid grid-cols-3 items-center gap-3 px-4 py-3 md:px-6">
                <span className="font-semibold text-slate-700">肌のハリ・ツヤ向上を実感</span>
                <span className="col-span-2 text-slate-700">施術後1ヶ月以内に多くの方が実感</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-3 px-4 py-3 md:px-6">
                <span className="font-semibold text-slate-700">毛穴の引き締め効果</span>
                <span className="col-span-2 text-slate-700">特に頬や鼻周りの開き毛穴に効果的</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-3 px-4 py-3 md:px-6">
                <span className="font-semibold text-slate-700">小じわ・たるみの改善</span>
                <span className="col-span-2 text-slate-700">肌の弾力を高め、小じわや軽いたるみの緩和に寄与</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MPガン 解説セクション */}
      <div className="px-6 pb-14">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#d6e4f5] bg-white shadow-sm">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-8">
            <div className="flex-1 space-y-3 text-slate-800">
              <h3 className="text-2xl font-bold text-[#0e5ba5]">MPガン</h3>
              <p>
                MPガンとは、スピーディかつ均一に薬液を皮下に細かく注入できる機器です。痛みや出血、ダウンタイム、肌ダメージが少なく、薬剤を均一に注入することができます。薬剤の効果に加え、針の刺激により自然治癒力（創傷治癒力）が活性化され、コラーゲンやエラスチンの生成が促進されることで、肌のキメを整え、毛穴の引き締めや肌質改善の効果も期待できます。
              </p>
              <p>
                水光注射とは異なり、目の下や目じりの小じわや小鼻など細かな部位にも注入可能です。
              </p>
            </div>
            <div className="flex-1">
              <div className="overflow-hidden rounded-xl border border-[#d6e4f5] bg-[#f7fbff] p-3">
                <Image
                  src="/mpgun-device.png"
                  alt="MPガンの機器イメージ"
                  width={520}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 施術メニュー セクション③ エアダーマジェット */}
      <div className="px-6 py-14 bg-soft-gradient bg-dots">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-[#0e5ba5] tracking-[0.2em]">施術メニュー③</p>
            <h2 className="text-3xl font-bold text-slate-900">幹細胞上清液×エアダーマジェット</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[#0e5ba5]">
              <span className="text-sm font-semibold text-[#0e5ba5]">
                先着50名!! <span className="text-xl text-[#d9480f] font-extrabold">10cc 198,000円 (税込)</span> 定価の60%OFF
              </span>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[0.7fr,1.3fr] md:items-start">
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-[#f4f8ff] p-4 shadow-none ring-0">
              <Image
                src="/airjet1.jpeg"
                alt="エアダーマジェットのイメージ"
                width={260}
                height={260}
                className="h-auto w-full max-w-[260px] max-h-[240px] object-contain"
              />
            </div>
            <div className="space-y-4 text-slate-800">
              <h3 className="text-xl font-semibold text-[#0e5ba5]">
                高圧エアジェットの力で針を使用せずに肌の奥深くへ
              </h3>
              <p>
                エアダーマジェットとは、針を使用せずに薬剤を角層の奥深くまで送り込む美容施術です。高速度ジェットと特殊なハンドピースの力により、薬剤をミスト状にし、角層の奥深くまで針を使わずに導入していきます。
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#eaf3ff] px-4 py-3 text-sm font-semibold text-slate-800 md:px-6">
              施術詳細
            </div>
            <div className="px-0">
              <table className="w-full text-sm text-slate-800">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      所要時間
                    </th>
                    <td className="px-4 py-3">約60分</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      価格
                    </th>
                    <td className="px-4 py-3">10cc 198,000円 (税込)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      効果持続期間
                    </th>
                    <td className="px-4 py-3">2〜3週間程度</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      施術間隔
                    </th>
                    <td className="px-4 py-3">2週間〜1ヶ月に1回のペースがおすすめ</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      痛み
                    </th>
                    <td className="px-4 py-3">なし</td>
                  </tr>
                  <tr>
                    <th className="w-32 bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">
                      ダウンタイム
                    </th>
                    <td className="px-4 py-3">なし</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>



      {/* カウンセリングCTA（再掲） */}
      <div className="px-6 pb-14">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white/95 px-6 py-6 shadow-xl ring-1 ring-slate-100 md:px-10 md:py-8">
            <p className="text-center text-sm font-semibold text-slate-700">
              まずはお気軽に無料カウンセリングをご利用ください！
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <a
                href="https://line.me/R/ti/p/@example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#06c755] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#06c755]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE予約
              </a>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-[#0e5ba5] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#0e5ba5]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.5l-10 5-10-5V4zm0 4.236l9.447 4.724a1 1 0 00.894 0L22 8.236V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.236z" />
                </svg>
                WEB予約
              </Link>
            </div>
            <div className="mt-3 flex justify-center text-lg font-semibold text-[#0e5ba5]">
              <a href="tel:0362819733" className="inline-flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5a2 2 0 012-2h2a1 1 0 011 .78l1 5a1 1 0 01-.54 1.08l-1.7.85a11.04 11.04 0 006.1 6.1l.86-1.71A1 1 0 0116.22 15l5 1a1 1 0 01.78 1v2a2 2 0 01-2 2h-1C10.82 21 3 13.18 3 4V5z" />
                </svg>
                03-6281-9733
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* なぜ歯髄由来の幹細胞なのか */}
      <div className="px-6 pb-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">なぜ歯髄由来の幹細胞なのか</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100">
              <h4 className="text-lg font-bold text-[#0e5ba5]">卓越した再生能力</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                歯髄由来の幹細胞は他の組織由来の幹細胞と比較して、非常に高い再生能力を持っています。歯は生涯にわたって修復と再生を繰り返す組織であり、その中心にある歯髄幹細胞はこの再生プロセスの要となっています。この優れた再生能力が、肌の若返りや組織修復に効果的に働きかけます。
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100">
              <h4 className="text-lg font-bold text-[#0e5ba5]">強力な抗炎症作用</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                歯髄幹細胞は強い抗炎症効果を持ち、様々な炎症性疾患や肌トラブルの改善に役立ちます。炎症は老化の主要な原因の一つとされており、この抗炎症作用によって肌の老化防止や炎症予防にも貢献します。実際に、臨床研究では炎症性皮膚疾患への効果も報告されています。
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100">
              <h4 className="text-lg font-bold text-[#0e5ba5]">豊富な成長因子の分泌</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                歯髄幹細胞は、FGF（線維芽細胞成長因子）、TGF-β（形質転換成長因子ベータ）、VEGF（血管内皮成長因子）など、多様な成長因子を大量に分泌します。これらの成長因子は、コラーゲン生成促進、肌のハリや弾力向上、血流改善など美容効果に直結する作用を持っています。
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100">
              <h4 className="text-lg font-bold text-[#0e5ba5]">高い安全性</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                歯髄幹細胞は若い組織由来であり、ウイルス感染リスクが低いことが特徴です。また、放置された歯髄を活用するため、採取時の身体的負担もほとんどありません。厳格な品質管理のもと無菌環境で製造された医療グレードの安全性の高いものを使用しています。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 主な有効成分 */}
      <div className="px-6 pb-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">歯髄由来幹細胞培養上清液の</h3>
            <p className="text-xl font-bold text-slate-900">主な有効成分</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f1ff] text-[#0e5ba5]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#0e5ba5]">成長因子</h4>
                <p className="text-sm leading-6 text-slate-800">
                  FGF、TGF-β、EGF、VEGFなどの成長因子は、肌細胞の増殖と分化を促進します。特にコラーゲンやエラスチンの生成をサポートし、肌のハリや弾力性を向上させる効果があります。また、表皮層の細胞活性化により、若々しい肌の維持に貢献します。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f1ff] text-[#0e5ba5]">
                <HeartPulse className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#0e5ba5]">サイトカイン</h4>
                <p className="text-sm leading-6 text-slate-800">
                  炎症を抑制し、免疫を調整する役割を持つサイトカインは、肌トラブルの改善や予防に効果的です。過剰な炎症反応を抑え、肌の健康状態を整えることで、敏感肌やトラブル肌の方にも優しく作用します。また、表皮の修復プロセスを促進し、ダメージからの回復を早めます。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f1ff] text-[#0e5ba5]">
                <Leaf className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#0e5ba5]">ペプチド類</h4>
                <p className="text-sm leading-6 text-slate-800">
                  様々な生理活性ペプチドは、肌の代謝を活性化し、細胞の機能を向上させます。特に、コラーゲンペプチドやエラスチンペプチドは、肌の構造タンパク質の合成を促進し、ハリのある若々しい肌づくりをサポートします。また、メラニン生成を抑制するペプチドもあり、美白効果も期待できます。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#e5f1ff] text-[#0e5ba5]">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#0e5ba5]">エクソソーム</h4>
                <p className="text-sm leading-6 text-slate-800">
                  細胞間コミュニケーションを担うエクソソームは、再生情報を伝達する「メッセンジャー」として機能します。これにより、肌細胞に活性化や修復の指令を伝え、細胞レベルでの肌再生を促進します。エクソソームは非常に小さいため、肌の奥深くまで浸透し効果的に作用します。
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-700">
            これらの有効成分が複合的に作用することで、単一成分の化粧品では得られない総合的な美容効果を実現します。歯髄由来幹細胞培養上清液は、これら全ての成分をバランスよく含んだ「究極の美容液」と言えるでしょう。
          </p>
        </div>
      </div>

      {/* カウンセリングCTA（再掲2） */}
      <div className="px-6 pb-14">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white/95 px-6 py-6 shadow-xl ring-1 ring-slate-100 md:px-10 md:py-8">
            <p className="text-center text-sm font-semibold text-slate-700">
              まずはお気軽に無料カウンセリングをご利用ください！
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <a
                href="https://line.me/R/ti/p/@example"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#06c755] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#06c755]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINE予約
              </a>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-[#0e5ba5] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#0e5ba5]/30 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v1.5l-10 5-10-5V4zm0 4.236l9.447 4.724a1 1 0 00.894 0L22 8.236V20a2 2 0 01-2 2H4a2 2 0 01-2-2V8.236z" />
                </svg>
                WEB予約
              </Link>
            </div>
            <div className="mt-3 flex justify-center text-lg font-semibold text-[#0e5ba5]">
              <a href="tel:0362819733" className="inline-flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5a2 2 0 012-2h2a1 1 0 011 .78l1 5a1 1 0 01-.54 1.08l-1.7.85a11.04 11.04 0 006.1 6.1l.86-1.71A1 1 0 0116.22 15l5 1a1 1 0 01.78 1v2a2 2 0 01-2 2h-1C10.82 21 3 13.18 3 4V5z" />
                </svg>
                03-6281-9733
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 安全性と品質 */}
      <div className="px-6 pb-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">歯髄由来幹細胞培養上清液の</h3>
            <p className="text-xl font-bold text-slate-900">安全性と品質</p>
            <p className="text-sm leading-6 text-slate-700">
              当クリニックで使用する歯髄由来幹細胞培養上清液は、厳格な品質管理と安全性テストを経て製造された国内製造の医療グレード製品です。
              お客様に安心して施術を受けていただくために、品質と安全性に妥協はありません。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100">
              <h4 className="text-lg font-bold text-[#0e5ba5]">厳格な製造環境</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                国内のGMP（医薬品等製造品質管理基準）準拠の施設で、クラス100（ISO5相当）の無菌環境下で製造されています。
                製造工程は完全にトレーサブルで、製品の一貫性が保証されています。
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100">
              <h4 className="text-lg font-bold text-[#0e5ba5]">徹底した品質検査</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                全ロットに対して、ウイルス・マイコプラズマ検査を実施。さらに、エンドトキシン検査、無菌試験なども行い、製品の純度と安全性を確認しています。
                また、成長因子の含有量分析により、効果の安定性も保証しています。
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 p-6 shadow-md ring-1 ring-slate-100 md:col-span-2">
              <h4 className="text-lg font-bold text-[#0e5ba5]">高品質原料使用</h4>
              <p className="mt-3 text-sm leading-6 text-slate-800">
                無血清培地を使用し、動物由来成分を一切含まないため、アレルギーリスクを最小化。さらに、放射能・重金属検査も実施し、あらゆる観点から安全性を担保しています。
                原料となる歯髄細胞も厳選されたドナーから採取されています。
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#7aa7d9] bg-[#f3f8ff] p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0e5ba5] ring-1 ring-[#7aa7d9]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-bold text-slate-900">幹細胞培養上清液と幹細胞の違い</p>
                <p className="text-sm leading-6 text-slate-800">
                  当クリニックで使用しているのは「幹細胞培養上清液」であり、幹細胞そのものを注入するわけではありません。上清液には幹細胞由来の有効成分のみが含まれており、細胞そのものは含まれていないため、より安全性が高く、法的にも美容医療で使用可能な製品です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section id="faq" title="よくある質問" subtitle="不安な点はカウンセリングでお気軽にご相談ください">
        <div className="space-y-4">
          {faqs.map((item) => (
            <AccordionItem key={item.question} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
}

