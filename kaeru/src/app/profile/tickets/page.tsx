"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import YourEventsTab from "@/components/profile/YourEventsTab";
import SubscriptionsTab from "@/components/profile/SubscriptionsTab";
import SettingsTab from "@/components/profile/SettingsTab";
import PhotoProfile from "@/components/profile/head/PhotoProfile";

export default function ViewerProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    const storedUser = localStorage.getItem("kaeru_user");
    if (!storedUser) { router.push("/login"); return; }
    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) return null;

  return (
    <div className="bg-white min-h-screen pt-10">
      <div className="container mx-auto px-4 md:px-8 pb-12">
        <div className="flex flex-col md:flex-row lg:gap-12">
          <div className="w-full md:w-[200px] shrink-0">
            <PhotoProfile 
              user={user} 
              role="viewer" 
              isViewer={true}
              onSwitch={() => {
                localStorage.setItem("preferred_role", "organizer");
                router.push("/profile/studio");
              }} 
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex gap-8 border-b border-gray-100 mb-8 overflow-x-auto hide-scrollbar">
              <TabBtn id="events" label="Квитки" active={activeTab} set={setActiveTab} color="orange" />
              <TabBtn id="subs" label="Підписки" active={activeTab} set={setActiveTab} color="orange" />
              <TabBtn id="settings" label="Налаштування" active={activeTab} set={setActiveTab} color="orange" />
            </div>

            <div className="flex flex-col gap-4"> 
               {activeTab === "events" && <YourEventsTab />}
               {activeTab === "subs" && <SubscriptionsTab />}
               {activeTab === "settings" && <SettingsTab user={user} onLogout={() => { localStorage.clear(); router.push("/"); }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ id, label, active, set, color }: any) {
  const isActive = active === id;
  const colorClass = color === "orange" ? "text-orange border-orange" : "text-grean-l border-grean-l";
  return (
    <button onClick={() => set(id)} className={`pb-4 whitespace-nowrap text-sm md:text-base font-black uppercase tracking-widest transition-all ${isActive ? `${colorClass} border-b-2` : "text-gray-300 hover:text-m-t"}`}>
      {label}
    </button>
  );
}