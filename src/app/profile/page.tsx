"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/types";

// Імпортуємо компоненти
import ProfileHeader from "@/components/profile/ProfileHeader";
import YourEventsTab from "@/components/profile/YourEventsTab";
import CreatedEventsTab from "@/components/profile/CreatedEventsTab";
import SettingsTab from "@/components/profile/SettingsTab";

type TabType = "your_events" | "created_events" | "analytics" | "settings";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("your_events");

  useEffect(() => {
    const storedUser = localStorage.getItem("kaeru_user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("kaeru_user");
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-gray-d font-bold animate-pulse text-lg">Завантаження...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 pt-6 pb-32">
      
      {/* ВИКЛИК ШАПКИ ПРОФІЛЮ */}
      <ProfileHeader user={user} />

      {/* НАВІГАЦІЯ */}
      <div className="relative mb-8 mt-4">
        <div className="flex gap-6 md:gap-10 overflow-x-auto hide-scrollbar border-b border-gray-200 pb-1 pr-8">
          <button 
            onClick={() => setActiveTab("your_events")}
            className={`pb-3 whitespace-nowrap text-sm md:text-base font-bold transition-all uppercase tracking-wide ${activeTab === "your_events" ? "text-orange border-b-2 border-orange" : "text-gray-400 hover:text-gray-700"}`}
          >
            Ваші івенти
          </button>
          <button 
            onClick={() => setActiveTab("created_events")}
            className={`pb-3 whitespace-nowrap text-sm md:text-base font-bold transition-all uppercase tracking-wide ${activeTab === "created_events" ? "text-orange border-b-2 border-orange" : "text-gray-400 hover:text-gray-700"}`}
          >
            Створені івенти
          </button>
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`pb-3 whitespace-nowrap text-sm md:text-base font-bold transition-all uppercase tracking-wide ${activeTab === "analytics" ? "text-orange border-b-2 border-orange" : "text-gray-400 hover:text-gray-700"}`}
          >
            Аналітика
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`pb-3 whitespace-nowrap text-sm md:text-base font-bold transition-all uppercase tracking-wide ${activeTab === "settings" ? "text-orange border-b-2 border-orange" : "text-gray-400 hover:text-gray-700"}`}
          >
            Налаштування
          </button>
        </div>
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
      </div>

      {/* КОНТЕНТ ВКЛАДОК */}
      <div className="min-h-[400px] w-full">
        {activeTab === "your_events" && <YourEventsTab />}
        {activeTab === "created_events" && <CreatedEventsTab />}
        {activeTab === "analytics" && (
          <div className="animate-in fade-in duration-300 w-full max-w-6xl mx-auto">
             <h2 className="text-xl md:text-2xl font-bold text-m-t mb-6">Загальна аналітика ваших подій</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] text-center flex flex-col justify-center">
                  <p className="text-gray-500 text-sm mb-1 font-medium">Перегляди сторінок</p>
                  <p className="text-3xl font-black text-orange">1,204</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] text-center flex flex-col justify-center">
                  <p className="text-gray-500 text-sm mb-1 font-medium">Продані квитки</p>
                  <p className="text-3xl font-black text-m-t">86</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] text-center flex flex-col justify-center">
                  <p className="text-gray-500 text-sm mb-1 font-medium">Підписники</p>
                  <p className="text-3xl font-black text-m-t">150</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] text-center flex flex-col justify-center">
                  <p className="text-gray-500 text-sm mb-1 font-medium">Загальний дохід</p>
                  <p className="text-3xl font-black text-green-600">43 000 ₴</p>
                </div>
             </div>
          </div>
        )}
        {activeTab === "settings" && <SettingsTab user={user} onLogout={handleLogout} />}
      </div>
    </div>
  );
}