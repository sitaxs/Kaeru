"use client";
import { useState, useEffect } from "react";
import { organizerApi } from "@/lib/api"; // Імпортуємо наш API

export default function SubscriptionsTab() {
  const [recoms, setRecoms] = useState<any[]>([]);

  useEffect(() => {
    // Викликаємо функцію через наш API
    const fetchRecoms = async () => {
      try {
        const data = await organizerApi.getRecommended();
        setRecoms(data);
      } catch (err) {
        console.error("Помилка завантаження рекомендацій:", err);
      }
    };

    fetchRecoms();
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-gray-50 rounded-[32px] p-10 text-center mb-10 border border-gray-100">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M19 8v6"></path><path d="M16 11h6"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-m-t mb-2">У вас ще немає підписок</h3>
        <p className="text-gray-400 text-sm">Підписуйтесь на організаторів, щоб не пропустити їхні нові івенти.</p>
      </div>

      <h4 className="text-lg font-black text-m-t uppercase mb-6 tracking-wide">Рекомендовані для вас</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recoms.map(org => (
          <div key={org.id} className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between group transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer">
            
            {/* Сховав коментар всередину елемента, щоб не було помилок JSX */}
            {/* ЗМІНЕНО ЕФЕКТ HOVER: тепер картка збільшується замість появи обводки */}
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-xl font-black text-gray-400 uppercase border border-gray-100">
                  {org.name[0]}
                </div>
                {/* ЗЕЛЕНА КРАПОЧКА НОВИНОК */}
                {org.hasNewEvent && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-grean-l border-2 border-white rounded-full animate-pulse shadow-sm"></span>
                )}
              </div>
              <div>
                <p className="font-bold text-m-t leading-tight">{org.name}</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-wider">{org.category} • {org.followers} підписників</p>
              </div>
            </div>
            {/* Кнопка "Стежити" */}
            <button className="bg-orange/10 text-orange px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange hover:text-white transition-all">Стежити</button>
          </div>
        ))}
      </div>
    </div>
  );
}