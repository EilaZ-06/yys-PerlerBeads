"use client";

import { useMemo, useState } from "react";
import patterns from "../../data/treasurePatterns.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function GalleryPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof patterns)[number] | null>(null);

  const results = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    if (!keyword) return patterns;
    return patterns.filter((pattern) =>
      `${pattern.id} ${pattern.title} ${pattern.category}`.toLocaleLowerCase("zh-CN").includes(keyword),
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7e6_0%,#fffdf8_45%,#f5ead7_100%)] px-4 py-10 text-stone-900 dark:bg-[radial-gradient(circle_at_top,#33251d_0%,#171312_55%,#0f0d0c_100%)] dark:text-stone-100 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold tracking-[0.3em] text-amber-700 dark:text-amber-400">YYS PERLER LIBRARY</p>
          <h1 className="text-3xl font-black text-red-800 dark:text-amber-300 sm:text-5xl">典藏拼豆图纸库</h1>
          <p className="mt-3 text-stone-600 dark:text-stone-300">74 款 · 87×87 · 每款 9 块 29×29 标准底板</p>
        </header>

        <section className="sticky top-[61px] z-40 mb-8 rounded-2xl border border-red-900/10 bg-white/90 p-3 shadow-lg backdrop-blur dark:border-amber-100/10 dark:bg-stone-900/90">
          <label className="flex items-center gap-3 rounded-xl bg-stone-100 px-4 py-3 dark:bg-stone-800">
            <span aria-hidden="true">🔎</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索式神、皮肤名称或编号……"
              className="w-full bg-transparent text-base outline-none placeholder:text-stone-400"
              aria-label="搜索典藏图纸"
            />
            <span className="shrink-0 text-sm text-stone-500">{results.length} / 74</span>
          </label>
        </section>

        {results.length ? (
          <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {results.map((pattern) => {
              const imageUrl = `${basePath}${pattern.src}`;
              return (
                <article key={pattern.id} className="group overflow-hidden rounded-2xl border border-red-900/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-amber-100/10 dark:bg-stone-900">
                  <button type="button" onClick={() => setSelected(pattern)} className="block aspect-square w-full overflow-hidden bg-white" aria-label={`预览 ${pattern.title}`}>
                    <img src={imageUrl} alt={pattern.title} loading="lazy" className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]" />
                  </button>
                  <div className="p-3">
                    <p className="mb-1 text-xs font-bold text-amber-700 dark:text-amber-400">#{pattern.id} · {pattern.size}</p>
                    <h2 className="line-clamp-2 min-h-10 text-sm font-bold leading-5" title={pattern.title}>{pattern.title}</h2>
                    <a href={imageUrl} download={`${pattern.id}_${pattern.title}_87x87.png`} className="mt-3 block rounded-lg bg-red-800 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-red-700">
                      下载图纸
                    </a>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/60 py-20 text-center text-stone-500 dark:border-stone-700 dark:bg-stone-900/60">没有找到匹配的图纸</div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="max-h-[95vh] max-w-5xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-amber-700">#{selected.id} · {selected.size}</p>
                <h2 className="font-black text-stone-900">{selected.title}</h2>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="rounded-full bg-stone-100 px-3 py-1 text-stone-700 hover:bg-stone-200" aria-label="关闭预览">✕</button>
            </div>
            <img src={`${basePath}${selected.src}`} alt={selected.title} className="max-h-[75vh] w-full object-contain" />
            <a href={`${basePath}${selected.src}`} download={`${selected.id}_${selected.title}_87x87.png`} className="mt-4 block rounded-xl bg-red-800 px-4 py-3 text-center font-bold text-white hover:bg-red-700">下载原图</a>
          </div>
        </div>
      )}
    </main>
  );
}
