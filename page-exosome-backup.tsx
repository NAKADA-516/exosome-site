"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Leaf,
  ChevronDown,
  Clock,
  CheckCircle2,
  HeartPulse,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
    question: "ダウンタイムはどのくらいですか？",
    answer:
      "赤みや軽いほてりが当日〜翌日まで続く場合がありますが、多くは数日以内に落ち着きます。激しい運動・飲酒は当日控えてください。",
  },
  {
    question: "何回くらい受けると実感できますか？",
    answer:
      "個人差がありますが、まずは2〜4週間おきに3回程度を推奨しています。その後は状態に合わせてメンテナンスを提案します。",
  },
  {
    question: "併用できない施術はありますか？",
    answer:
      "強い炎症を伴う施術直後の併用はお避けください。ピーリングやレーザーなどは医師とスケジュールを調整します。",
  },
  {
    question: "ホームケアは必要ですか？",
    answer:
      "効果を高めるために保湿とUVケアを徹底してください。頭皮の場合は過度な摩擦や高温のドライヤーを避けると安定します。",
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
      <p className="text-sm tracking-[0.3em] text-[#B89446]">EXOSOME CARE</p>
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
    <div className="bg-[#f9f7f2] text-slate-900">
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,148,70,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(184,148,70,0.12),transparent_30%)]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16 pt-20 md:flex-row md:items-center md:pt-24">
          <motion.div
            className="flex-1 space-y-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <p className="inline-flex items-center rounded-full bg-[#f1e7d7] px-3 py-1 text-xs font-semibold text-[#8b6a26]">
              高純度エクソソーム × 美髪・美肌ケア
            </p>
            <h1 className="font-serif text-3xl leading-tight md:text-4xl">
              DP-SCCMで、
              <br />
              細胞レベルのハリと艶を。
            </h1>
            <p className="max-w-2xl text-lg text-slate-700">
              歯髄由来の高品質な培養上清を厳選し、頭皮・お顔それぞれの状態に合わせて丁寧に導入。
              余分な添加物を抑え、クリニック品質の濃度を保ったまま、健やかな巡りと弾力を引き出します。
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-full bg-[#B89446] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#b89446]/30 transition hover:-translate-y-0.5 hover:shadow-xl">
                施術の特徴を見る
              </button>
              <button className="rounded-full border border-[#B89446] px-5 py-3 text-sm font-semibold text-[#B89446] transition hover:bg-[#f7f0e1]">
                料金とコース
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#f4efe6] p-6 shadow-xl">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#b89446]/10 blur-3xl" />
              <div className="absolute -bottom-10 -right-6 h-28 w-28 rounded-full bg-[#b89446]/10 blur-3xl" />
              <div className="relative">
                <Image
                  src="/images/exosome/hero.jpg"
                  alt="DP-SCCM施術のイメージ写真"
                  width={640}
                  height={640}
                  className="h-auto w-full rounded-2xl object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle2 className="h-5 w-5 text-[#B89446]" />
                医療品質のロット管理 / ラボ検証済み
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Section
        id="about"
        title="DP-SCCMとは"
        subtitle="歯髄幹細胞由来の培養上清を用いた、クリニック品質のエクソソームケア"
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <p className="text-slate-700 leading-relaxed">
              DP-SCCMは、歯髄幹細胞から得られる上清液をクリーンな環境で精製し、成長因子とエクソソームを高濃度で含有したプレミアム美容ソリューションです。
              無血清培養を採用することで不要な成分を抑え、肌・頭皮双方の繊細なエリアにも配慮した設計になっています。
            </p>
            <p className="text-slate-700 leading-relaxed">
              再生医療由来の成分をクリニック仕様で届けることで、潤い・弾力・ハリの底上げを目指し、健やかなバリア機能をサポートします。
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {growthFactors.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                >
                  <Leaf className="h-4 w-4 text-[#B89446]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[#f3e9d8] to-transparent blur-lg" />
            <div className="relative overflow-hidden rounded-[28px] bg-white p-1 shadow-xl">
              <Image
                src="/images/exosome/about.jpg"
                alt="ラボで管理されたDP-SCCMのイメージ"
                width={720}
                height={720}
                className="h-full w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="compare"
        title="他の幹細胞培養上清液との違い"
        subtitle="濃度・安全性・目的適合性で選ばれる理由"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-[#f7f0e1]">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                    項目
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                    DP-SCCM
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                    一般的な上清
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                    特徴
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="bg-white">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{row.label}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{row.dp}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{row.other}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{row.differ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-slate-100 bg-[#fcf8f1] px-6 py-4 text-sm text-slate-700">
            ※ 施術は医療機関の判断のもと、お肌・頭皮状態に合わせてご案内します。
          </div>
        </div>
      </Section>

      <Section
        id="effect"
        title="期待できる効果"
        subtitle="健やかな巡りを整え、内側から満ちるハリと艶を目指します"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((item) => (
            <motion.div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f7f0e1] via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <item.icon className="mb-4 h-10 w-10 text-[#B89446]" />
              <h3 className="mb-2 font-semibold text-lg text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="flow"
        title="施術の流れ"
        subtitle="初めての方も安心いただけるよう、丁寧にご案内します"
      >
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              className="relative rounded-2xl bg-white p-5 text-sm text-slate-700 shadow-md"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#B89446] text-white">
                {idx + 1}
              </div>
              <h4 className="mb-2 font-semibold text-slate-900">{step.title}</h4>
              <p className="leading-relaxed">{step.description}</p>
              {idx < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[#B89446]/50 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="pricing"
        title="料金表"
        subtitle="カウンセリングでお悩みを伺い、最適なコースをご提案します"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{plan.name}</h3>
                <Clock className="h-5 w-5 text-[#B89446]" />
              </div>
              <p className="mt-2 text-2xl font-serif text-slate-900">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-600">{plan.note}</p>
              <button className="mt-4 w-full rounded-full bg-[#B89446] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#b89446]/30 transition hover:-translate-y-0.5 hover:shadow-xl">
                このプランで相談する
              </button>
            </div>
          ))}
        </div>
      </Section>

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

