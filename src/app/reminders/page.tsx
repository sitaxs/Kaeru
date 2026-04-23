"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReminderIconsForCarts, {ReminderType} from "@/components/Icon/ReminderIconsForCarts";

interface Reminder {
  id: string;
  type: ReminderType;
  role: "user" | "organizer";
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  eventId?: string;
  userId?: string;
}

export default function RemindersPage() {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [activeTab, setActiveTab] = useState<"user" | "organizer">("user");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/reminders')
      .then(res => res.json())
      .then(data => {
        setReminders(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleReminderClick = (reminder: Reminder) => {
    switch (reminder.type) {
      case "new_event":
        if (reminder.userId) router.push(`/profile/${reminder.userId}`);
        break;
      case "leave_review":
        if (reminder.eventId) router.push(`/events/${reminder.eventId}#reviews`);
        break;
      case "upcoming_event":
        if (reminder.eventId) router.push(`/events/${reminder.eventId}`);
        break;
      case "system_feature":
        router.push(`/features/latest`);
        break;
      case "organizer_new_review":
      case "organizer_new_application":
        if (reminder.eventId) router.push(`/dashboard/events/${reminder.eventId}`);
        break;
    }
  };

  const filteredReminders = reminders.filter(r => r.role === activeTab);
  const hasUnread = filteredReminders.some(r => !r.isRead);
  
  const isBtnActive = hasUnread && filteredReminders.length > 0;

  return (
    <div className="min-h-[100dvh] bg-white pb-32 pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        {/* Шапка з лінією знизу */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 mt-2 md:mt-4 border-b border-gray-l pb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-m-t rounded-full transition-colors shrink-0 border-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </Link>
            <h1 className="text-2xl md:text-3xl font-black text-m-t">Сповіщення</h1>
          </div>
        
          <button 
            disabled={!isBtnActive}
            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-colors shrink-0 ${
              isBtnActive 
                ? "bg-orange-100 text-orange  hover:bg-orange-200 cursor-pointer" 
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
            }`}
          >
            Прочитати всі
          </button>
        </div>

        {/* Вкладки на всю ширину */}
        <div className="flex gap-6 mb-8 border-b border-gray-l">
          <button 
            onClick={() => setActiveTab("user")}
            className={`pb-3 text-sm md:text-base font-bold transition-all relative outline-none border-none ${
              activeTab === "user" ? "text-m-t" : "text-gray-d hover:text-m-t"
            }`}
          >
            Мої сповіщення
            {activeTab === "user" && <div className="absolute bottom-0 left-0 w-full h-1 bg-grean-l rounded-t-lg"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab("organizer")}
            className={`pb-3 text-sm md:text-base font-bold transition-all relative outline-none border-none ${
              activeTab === "organizer" ? "text-m-t" : "text-gray-d hover:text-m-t"
            }`}
          >
            Для організатора
            {activeTab === "organizer" && <div className="absolute bottom-0 left-0 w-full h-1 bg-grean-l rounded-t-lg"></div>}
          </button>
        </div>

        {/* Список сповіщень на всю ширину */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center py-20 text-gray-d animate-pulse">Завантаження...</div>
          ) : filteredReminders.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-l rounded-[32px]">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-d font-medium text-lg">Тут поки що порожньо</p>
            </div>
          ) : (
            filteredReminders.map((reminder) => (
              <div 
                key={reminder.id} 
                onClick={() => handleReminderClick(reminder)}
                className={`relative p-5 md:p-6 lg:p-7 rounded-[24px] border transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1 w-full ${
                  !reminder.isRead 
                    ? "bg-grean-l/10 border-grean-l/30" 
                    : "bg-white border-gray-l hover:border-gray-300"
                }`}
              >
                {!reminder.isRead && (
                  <div className="absolute top-6 right-6 w-3 h-3 bg-grean-l rounded-full shadow-sm animate-pulse"></div>
                )}

                <div className="flex gap-4 md:gap-6 items-start">
                  <ReminderIconsForCarts type={reminder.type} />
                  
                  <div className="flex-1 pr-4 md:pr-8">
                    <h3 className="font-bold text-m-t text-lg md:text-xl mb-1.5 leading-tight">
                      {reminder.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-d mb-4 leading-relaxed max-w-full">
                      {reminder.message}
                    </p>
                    
                    <span className="text-sm md:text-base font-medium text-gray-400 block mt-2">
                      {new Date(reminder.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center self-center text-gray-l">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}