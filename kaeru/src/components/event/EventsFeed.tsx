"use client";
import { useSearchParams, useRouter } from "next/navigation";
// import EventCard from "./EventCard"; // Розкоментуй, коли матимеш картки

export default function EventsFeed() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subsParam = searchParams.get("subs");
  const selectedSubs = subsParam ? subsParam.split(",") : [];

  // ТЕСТОВІ ДАНІ: Щоб перевірити порожній стан, заміни events на []
  const events = []; // наприклад: const events = [{ id: 1, title: "Test" }];

  const getFilterLabel = () => {
    if (selectedSubs.length === 0) return null;
    if (selectedSubs.length <= 2) return selectedSubs.join(", ");
    return `Обрано: ${selectedSubs.length}`;
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subs");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const label = getFilterLabel();

  return (
    <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8">
      
      {/* Плашка фільтру */}
      {label && (
        <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4">
          <button 
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange text-orange rounded-full text-sm font-bold hover:bg-orange hover:text-white transition-all group"
          >
            {label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {/* Якщо є івенти - показуємо сітку */}
      {events.length > 0 ? (
        <div key={subsParam} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-500">
           {/* {events.map((event) => <EventCard key={event.id} {...event} />)} */}
        </div>
      ) : (
        /* Блок "Порожньо" з кнопкою повернення */
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">
            🐸
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-m-t mb-3 uppercase tracking-wide">
            Тут поки порожньо
          </h3>
          <p className="text-gray-d text-lg max-w-md mb-8">
            На жаль, за цими фільтрами не знайдено жодної події. Спробуйте змінити критерії пошуку.
          </p>
          <button 
            onClick={() => router.push("/events")} // Скидає все і повертає на головну
            className="px-8 py-3.5 bg-orange text-white font-bold rounded-full hover:bg-orange/90 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            Всі категорії подій
          </button>
        </div>
      )}
    </div>
  );
}