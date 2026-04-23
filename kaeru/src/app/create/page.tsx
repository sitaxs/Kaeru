"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { eventApi } from "@/lib/api"; // Переконайся, що api.ts лежить у src/lib/
import { Event, PaymentType, EventCategory } from "@/types/types";

export default function CreateEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Стан для всієї логіки івенту
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endsAt: "",
    location: "",
    locationDetail: "",
    paymentType: "free" as PaymentType,
    price: 0,
    category: "Other" as EventCategory,
    imageUrl: "",
    bannerUrl: "",
    tags: "",
    speakerName: "",
    speakerRole: "",
    speakerAbout: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ПІДГОТОВКА ДАНИХ ДЛЯ БАЗИ (Логіка запису)
      const newEvent: Omit<Event, "id"> = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        startsAt: formData.date,
        endsAt: formData.endsAt || formData.date, // Якщо не вказано кінець, ставимо дату початку
        location: formData.location,
        locationDetail: formData.locationDetail,
        paymentType: formData.paymentType,
        price: formData.paymentType === "paid" ? Number(formData.price) : null,
        category: formData.category,
        imageUrl: formData.imageUrl || "/images/default-event.jpg",
        bannerUrl: formData.bannerUrl || "/images/default-banner.jpg",
        tags: formData.tags.split(",").map((t) => t.trim()), // Перетворюємо рядок у масив
        status: "pending",
        // Логіка для спікера: створюємо об'єкт лише якщо вказано ім'я
        speaker: formData.speakerName ? {
          name: formData.speakerName,
          role: formData.speakerRole,
          avatarUrl: "/images/default-avatar.jpg",
          about: formData.speakerAbout,
        } : undefined,
        // Автоматичне SEO на основі назви
        // seo: {
        //   title: `${formData.title} | Kaeru Events`,
        //   description: formData.description.substring(0, 160),
        //   keywords: formData.tags
        // }
      };

      await eventApi.create(newEvent as any);
      router.push("/"); // Повертаємось на головну
      alert("Подія надіслана на модерацію! 🐸");
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося зберегти дані.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-m-t">Нова подія 🐸</h1>
        <p className="text-gray-d mt-2">Заповніть всі деталі, щоб залучити більше гостей</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* СЕКЦІЯ 1: ВІЗУАЛ (Банер та обкладинка) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-l">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-d ml-2">URL Обкладинки (квадратна)</label>
            <input 
              placeholder="https://..." 
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-l outline-none focus:border-orange transition-all"
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-d ml-2">URL Банера (широкий)</label>
            <input 
              placeholder="https://..." 
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-l outline-none focus:border-orange transition-all"
              onChange={(e) => setFormData({...formData, bannerUrl: e.target.value})}
            />
          </div>
        </div>

        {/* СЕКЦІЯ 2: ОСНОВНЕ */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-l space-y-6">
          <input 
            required 
            placeholder="Назва вашої крутої події" 
            className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-l outline-none focus:border-orange text-xl font-bold"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select 
              className="p-4 bg-gray-50 rounded-2xl border border-gray-l outline-none font-medium"
              onChange={(e) => setFormData({...formData, category: e.target.value as EventCategory})}
            >
              {["IT & Tech", "Design", "Education", "Business", "Sport", "Music", "Art", "Charity", "Other"].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input 
              placeholder="Теги через кому (напр: дизайн, київ)" 
              className="p-4 bg-gray-50 rounded-2xl border border-gray-l outline-none"
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          <textarea 
            required
            rows={4}
            placeholder="Детальний опис події..." 
            className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-l outline-none resize-none"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* СЕКЦІЯ 3: ЧАС ТА МІСЦЕ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-l space-y-4">
            <h3 className="font-bold text-m-t uppercase text-xs tracking-widest">Коли?</h3>
            <div className="space-y-3">
               <input type="datetime-local" required className="w-full p-3 bg-gray-50 rounded-xl border border-gray-l outline-none" 
                      onChange={(e) => setFormData({...formData, date: e.target.value})} />
               <p className="text-[10px] text-gray-d px-2">Дата та час завершення:</p>
               <input type="datetime-local" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-l outline-none" 
                      onChange={(e) => setFormData({...formData, endsAt: e.target.value})} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-l space-y-4">
            <h3 className="font-bold text-m-t uppercase text-xs tracking-widest">Де?</h3>
            <input required placeholder="Місто, вулиця" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-l outline-none" 
                   onChange={(e) => setFormData({...formData, location: e.target.value})} />
            <input placeholder="Додаткові деталі (кабінет, поверх)" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-l outline-none" 
                   onChange={(e) => setFormData({...formData, locationDetail: e.target.value})} />
          </div>
        </div>

        {/* СЕКЦІЯ 4: СПІКЕР */}
        <div className="bg-grean-d text-white p-8 rounded-[2.5rem] space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-sm">🎤</div>
            <h3 className="font-bold uppercase text-sm tracking-widest">Запрошений гість (необов'язково)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Ім'я спікера" className="p-4 bg-white/10 rounded-2xl border border-white/20 outline-none focus:border-orange placeholder:text-white/40" 
                   onChange={(e) => setFormData({...formData, speakerName: e.target.value})} />
            <input placeholder="Посада/Роль" className="p-4 bg-white/10 rounded-2xl border border-white/20 outline-none focus:border-orange placeholder:text-white/40" 
                   onChange={(e) => setFormData({...formData, speakerRole: e.target.value})} />
          </div>
        </div>

        {/* СЕКЦІЯ 5: ОПЛАТА */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-orange/5 rounded-[2.5rem] border-2 border-dashed border-orange/30">
          <div className="flex-1">
            <h3 className="font-black text-orange uppercase text-sm mb-2">Вартість участі</h3>
            <div className="flex gap-3">
              {["free", "paid", "donation"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, paymentType: type as PaymentType})}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${formData.paymentType === type ? 'bg-orange text-white' : 'bg-white border border-gray-l text-gray-d'}`}
                >
                  {type === 'free' ? 'Вільний' : type === 'paid' ? 'Квиток' : 'Донат'}
                </button>
              ))}
            </div>
          </div>
          {formData.paymentType === "paid" && (
            <div className="w-full md:w-48 animate-in fade-in slide-in-from-left-4">
              <input 
                type="number" 
                placeholder="Ціна (₴)" 
                className="w-full p-5 bg-white rounded-2xl border-2 border-orange outline-none font-black text-xl text-orange"
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
          )}
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full py-6 bg-orange text-white rounded-[2rem] font-black text-xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
        >
          {loading ? "Зберігаємо у всесвіті..." : "Створити івент 🐸"}
        </button>

      </form>
    </div>
  );
}