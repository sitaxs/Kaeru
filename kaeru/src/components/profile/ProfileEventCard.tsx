"use client";
import Image from "next/image";

interface ProfileEventCardProps {
  event: any;
  mode: "viewer" | "organizer";
}

export default function ProfileEventCard({ event, mode }: ProfileEventCardProps) {
  const isViewer = mode === "viewer";
  const isActive = event.status === "active";

  return (
    /* Збільшили ширину: тепер вона може займати до 32rem (512px) на великих екранах */
    /* Додали фіксовану висоту h-[220px] або h-[240px], щоб картка виглядала масивніше */
    <div className={`group flex flex-row bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-lg w-full md:max-w-[28rem] lg:max-w-[32rem] h-[220px] md:h-[240px] ${!isActive && isViewer ? 'opacity-80' : ''}`}>
      
      {/* ЛІВА ЧАСТИНА (Зображення - 40%) */}
      <div className="relative w-[42%] h-full shrink-0 bg-gray-50 overflow-hidden">
        <Image src={event.imageUrl} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {!isViewer && (
           <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-m-t shadow-sm">
             {event.status === 'active' ? '● Активний' : '◌ Чернетка'}
           </div>
        )}
      </div>

      {/* ПРАВА ЧАСТИНА (Контент - 58%) */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Збільшили шрифт заголовка */}
          <h3 className="text-base md:text-lg lg:text-xl font-black text-m-t leading-tight mb-2 line-clamp-2 uppercase tracking-tight">
            {event.title}
          </h3>
          <div className="space-y-1.5 text-xs md:text-sm text-gray-400 font-bold">
            <p className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {event.date}
            </p>
            <p className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
              {event.location}
            </p>
          </div>
        </div>

        {/* КНОПКИ */}
        <div className="flex flex-col gap-2.5">
          {isViewer ? (
            isActive ? (
              <div className="flex gap-2">
                <button className="flex-1 bg-orange text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider active:scale-95 transition-transform shadow-sm shadow-orange/20">
                  Показати квиток
                </button>
                <button className="px-4 py-3 rounded-2xl border border-gray-100 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <button className="bg-white border-2 border-orange text-orange py-2.5 rounded-2xl text-[11px] font-black hover:bg-orange hover:text-white transition-all uppercase tracking-tight">Відгук</button>
                <button className="bg-gray-100 text-gray-400 py-2.5 rounded-2xl text-[11px] font-black hover:bg-gray-200 transition-all uppercase tracking-tight">Повтор</button>
              </div>
            )
          ) : (
            <div className="flex gap-2.5">
               <button className="flex-1 bg-grean-l text-white py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-sm shadow-grean-l/20">
                 Редагувати
               </button>
               <button className="px-4 py-3 rounded-2xl border border-grean-l/10 text-grean-l hover:bg-green-50 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 17l-5-5-3 3-4-4"></path></svg>
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}