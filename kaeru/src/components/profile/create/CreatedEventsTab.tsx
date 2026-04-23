"use client";
import { useState, useEffect } from "react";
import ProfileEventCard from "../ProfileEventCard";
import { eventApi } from "@/lib/api";

export default function CreatedEventsTab() {
  const [subTab, setSubTab] = useState<"active" | "review" | "inactive" | "rejected" | "draft">("active");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        const data = await eventApi.getAll(); 
        const createdEvents = data.filter((e: any) => e.relation === "created");
        setEvents(createdEvents);
      } catch (err) {
        console.error("Помилка завантаження твоїх подій:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const filteredEvents = events.filter(e => e.status === subTab);

  const tabs = [
    { id: "active", label: "Активні" },
    { id: "review", label: "Перевірка" },
    { id: "inactive", label: "Неактивні" },
    { id: "rejected", label: "Відхилені" },
    { id: "draft", label: "Чернетки" },
  ] as const;

  return (
    <div className="animate-in fade-in duration-300 w-full">
      
      <div className="flex gap-2 md:gap-3 mb-8 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1">
        {tabs.map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-green-100 text-grean-l" // Світло-зелений фон та зелений текст для активної кнопки
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200" // Сірий фон та сірий текст для неактивної
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* КОНТЕНТ */}
      {loading ? (
        <div className="text-gray-400 py-10 text-center animate-pulse">Завантаження студії...</div>
      ) : filteredEvents.length === 0 ? (
        /* НОВИЙ ВИГЛЯД ПОРОЖНЬОГО СТАНУ */
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-100 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <h3 className="text-lg font-bold text-m-t mb-1">Тут поки що порожньо</h3>
          <p className="text-sm text-gray-400 max-w-[240px]">
            Ваші події у статусі «{tabs.find(t => t.id === subTab)?.label}» з'являться тут, щойно ви їх створите.
          </p>
          <button className="mt-6 px-6 py-2.5 bg-grean-l text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Створити подію
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
          {filteredEvents.map((event) => (
            <ProfileEventCard 
              key={event.id}
              event={event}
              mode="organizer"
            />
          ))}
        </div>
      )}
    </div>
  );
}