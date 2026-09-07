const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categories = [
  { label: "典藏", detail: "74 张", href: `${basePath}/gallery/` },
  { label: "御魂", detail: "计划中" },
  { label: "UI", detail: "计划中" },
  { label: "同人", detail: "计划中" },
];

export default function SiteNav() {
  return (
    <nav className="sticky top-0 z-[100] border-b border-red-900/10 bg-[#fffaf0]/95 shadow-sm backdrop-blur dark:border-amber-100/10 dark:bg-[#171312]/95">
      <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-x-auto px-4 py-3 sm:px-6">
        <a href={`${basePath}/`} className="mr-2 shrink-0 font-black tracking-wide text-red-800 dark:text-amber-300">
          阴阳师拼豆
        </a>
        <a href={`${basePath}/`} className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-red-50 hover:text-red-800 dark:text-stone-300 dark:hover:bg-red-950/40">
          图纸生成器
        </a>
        {categories.map((item) => item.href ? (
          <a key={item.label} href={item.href} className="shrink-0 rounded-full bg-red-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700">
            {item.label} <span className="ml-1 text-xs text-amber-200">{item.detail}</span>
          </a>
        ) : (
          <span key={item.label} title="正在筹备" className="shrink-0 cursor-default rounded-full border border-stone-200 px-3 py-1.5 text-sm text-stone-400 dark:border-stone-700 dark:text-stone-500">
            {item.label} <span className="ml-1 text-xs">{item.detail}</span>
          </span>
        ))}
      </div>
    </nav>
  );
}
