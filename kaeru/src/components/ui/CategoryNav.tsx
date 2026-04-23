"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const categories = [
  { id: "entertainment", label: "Розваги", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg> },
  { id: "education", label: "Освіта", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/></svg> },
  { id: "family", label: "Сім'я та Діти", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg> },
  { id: "arts", label: "Мистецтво", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> },
  { id: "tech", label: "IT & Tech", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M2 20h20"/></svg> },
  { id: "sports", label: "Спорт", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> },
  { id: "business", label: "Бізнес", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { id: "food", label: "Їжа & Напої", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> }
];

// НОВА АКУРАТНА ЛІНІЯ:
// 1. h-[2px] - ще тонша
// 2. border-l-[40px] border-r-[40px] border-transparent - робимо лінію коротшою за екран (відступи по 40px з боків)
// 3. background-clip: padding-box - щоб прозорі боки не замальовувалися кольором
const subtleScrollbar = `
  [&::-webkit-scrollbar]:h-[2px] 
  [&::-webkit-scrollbar-track]:bg-transparent 
  [&::-webkit-scrollbar-thumb]:bg-gray-200 
  [&::-webkit-scrollbar-thumb]:rounded-full 
  [&::-webkit-scrollbar-thumb]:border-l-[60px] 
  [&::-webkit-scrollbar-thumb]:border-r-[60px] 
  [&::-webkit-scrollbar-thumb]:border-transparent 
  [&::-webkit-scrollbar-thumb]:bg-clip-padding
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-300
`;

export default function CategoryNav() {
  const searchParams = useSearchParams();
  const pathname = usePathname(); 
  const isHome = pathname === "/";
  const currentCategory = searchParams.get("category");
  const hasSubs = searchParams.get("subs");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => setLoadingId(null), [currentCategory, searchParams]);

  const layoutClasses = isHome
    ? `max-[380px]:flex max-[380px]:flex-nowrap max-[380px]:overflow-x-auto grid grid-cols-4 md:flex md:flex-nowrap md:overflow-x-auto xl:justify-center gap-y-8 gap-x-4 md:gap-12 lg:gap-16 pt-4 pb-6 px-4 sm:px-8 md:px-12 ${subtleScrollbar}`
    : `flex flex-nowrap overflow-x-auto gap-10 sm:gap-12 md:gap-14 pt-4 pb-6 px-4 sm:px-8 md:px-12 xl:justify-center ${subtleScrollbar}`; 

  return (
    <div className="w-full max-w-[90rem] mx-auto overflow-hidden ">
      <div className={layoutClasses}>
        {categories.map((cat) => {
          const isActive = !isHome && currentCategory === cat.id;
          const isLoading = loadingId === cat.id;
          const showDot = isActive && hasSubs;

          return (
            <Link
              key={cat.id}
              href={`/events?category=${cat.id}`}
              onClick={() => { if (currentCategory !== cat.id) setLoadingId(cat.id); }}
              className="group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95 outline-none shrink-0"
            >
              <div className="relative">
                <div className={`w-[4.5rem] h-[4.5rem] md:w-[5.5rem] md:h-[5.5rem] rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isActive ? "border-orange bg-orange/10 text-orange shadow-sm" : isLoading ? "border-gray-200 bg-gray-100 animate-pulse text-gray-400" : "border-gray-200 bg-white text-gray-600 group-hover:shadow-sm"
                }`}>
                  {cat.icon}
                </div>
                {showDot && <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full border-2 border-white animate-bounce shadow-sm" />}
              </div>
              <span className={`text-[10px] md:text-xs font-medium text-center truncate w-[5rem] md:w-[6.5rem] ${isActive ? "text-orange font-bold" : "text-gray-d group-hover:text-m-t"}`}>
                {cat.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}