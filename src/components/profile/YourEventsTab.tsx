"use client";
import { useState, useEffect } from "react";
import ProfileEventCard from "./ProfileEventCard";

export default function YourEventsTab() {
  const [subTab, setSubTab] = useState<"active" | "inactive">("active");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/profileEvents")
      .then((res) => res.json())
      .then((data) => {
        const attendedEvents = data.filter((e: any) => e.relation === "attended");
        setEvents(attendedEvents);
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter(e => e.status === subTab);

  return (
    <div className="animate-in fade-in duration-300 w-full">
      <div className="flex gap-2 md:gap-4 mb-6 overflow-x-auto hide-scrollbar pb-2">
        <button onClick={() => setSubTab("active")} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${subTab === "active" ? "bg-orange-100 text-orange" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>Активні</button>
        <button onClick={() => setSubTab("inactive")} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${subTab === "inactive" ? "bg-orange-100 text-orange" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>Неактивні</button>
      </div>

      {loading ? (
        <div className="text-gray-400 py-10">Завантаження...</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-gray-500 py-10 text-center">Немає подій</div>
      ) : (
        // auto-rows-fr змушує всі рядки сітки бути однакової висоти (по найвищій картці)
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
          {filteredEvents.map((event) => (
            <ProfileEventCard 
              key={event.id}
              {...event}
              isActive={event.status === "active"}
              href={`/events/${event.id}`}
              
              // Логіка для активних
              showTicketButton={event.status === "active"}
              showWalletButton={event.status === "active"}
              
              // Логіка для неактивних (З бази даних)
              showReviewButton={event.status === "inactive" && !event.hasReviewLeft}
              showNotifyButton={event.status === "inactive" && event.isRecurring}
              
              onReviewClick={() => alert("Відкрити модалку відгуку")}
              onNotifyClick={() => alert("Ми надішлемо вам лист, коли івент повториться!")}
            />
          ))}
        </div>
      )}
    </div>
  );
}