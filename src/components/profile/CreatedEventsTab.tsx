"use client";
import { useState, useEffect } from "react";
import ProfileEventCard from "./ProfileEventCard";

export default function CreatedEventsTab() {
  const [subTab, setSubTab] = useState<"active" | "review" | "inactive" | "rejected" | "draft">("active");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/profileEvents")
      .then((res) => res.json())
      .then((data) => {
        const createdEvents = data.filter((e: any) => e.relation === "created");
        setEvents(createdEvents);
        setLoading(false);
      });
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
      
      {/* КНОПКИ З ЕФЕКТОМ ЗБІЛЬШЕННЯ (БЕЗ ЗМІНИ ОБВОДКИ) */}
      <div className="flex gap-2 md:gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap ${
              subTab === tab.id
                ? "bg-orange text-white border-orange shadow-sm"
                : "bg-white text-m-t border-gray-l"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-400 py-10">Завантаження...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-gray-500 py-10 text-center">Немає подій у цій категорії</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="flex flex-col">
              {event.status === "rejected" && (
                <p className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${subTab === "active" ? "bg-orange-100 text-orange" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
    {event.rejectReason}
  </p>
              )}
              <ProfileEventCard 
                {...event}
                isActive={event.status === "active" || event.status === "review"}
                href={`/profile/manage/${event.id}`}
                showEditButton={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}