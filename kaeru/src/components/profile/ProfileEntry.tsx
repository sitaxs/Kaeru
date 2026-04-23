"use client";
import { useState } from "react";

interface ProfileEntryProps {
  onSelect: (space: "viewer" | "organizer", remember: boolean) => void;
}

export default function ProfileEntry({ onSelect }: ProfileEntryProps) {
  const [tempRole, setTempRole] = useState<"viewer" | "organizer" | null>(null);
  const [remember, setRemember] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white px-4 z-[40]">
      <h2 className="text-2xl md:text-3xl font-black text-m-t mb-10 text-center uppercase tracking-tight">Куди рушаємо далі?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
        {/* Картка Глядача */}
        <button 
          onClick={() => setTempRole("viewer")}
          className={`p-8 rounded-[32px] border-2 transition-all duration-300 text-left flex flex-col items-start ${
            tempRole === "viewer" ? "border-orange bg-orange/5 shadow-md" : "border-gray-100 bg-white"
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tempRole === "viewer" ? "bg-orange text-white" : "bg-orange-50 text-orange"}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-m-t mb-2">Мої квитки</h3>
          <p className="text-sm text-gray-500">Переглядайте івенти, на які ви зареєстровані.</p>
        </button>

        {/* Картка Організатора */}
        <button 
          onClick={() => setTempRole("organizer")}
          className={`p-8 rounded-[32px] border-2 transition-all duration-300 text-left flex flex-col items-start ${
            tempRole === "organizer" ? "border-grean-l bg-green-50/50 shadow-md" : "border-gray-100 bg-white"
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tempRole === "organizer" ? "bg-grean-l text-white" : "bg-green-50 text-grean-l"}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>
          </div>
          <h3 className="text-xl font-bold text-m-t mb-2">Студія організатора</h3>
          <p className="text-sm text-gray-500">Створюйте події та відстежуйте аналітику.</p>
        </button>
      </div>

      {/* Блок збереження (Точка 1, 8) */}
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-5 h-5 accent-orange" />
          <span className="text-gray-d font-bold text-sm uppercase tracking-wider">Запам'ятати вибір</span>
        </label>
        
        <button 
          disabled={!tempRole}
          onClick={() => tempRole && onSelect(tempRole, remember)}
          className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all ${
            tempRole ? "bg-m-t shadow-lg hover:scale-[1.02] active:scale-95" : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          Продовжити
        </button>
      </div>
    </div>
  );
}