"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EventCard from "@/components/ui/EventCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFavorites = async () => {
    try {
      const storedUser = localStorage.getItem("kaeru_user");
      if (!storedUser) {
        router.push("/login");
        return;
      }
      
      const user = JSON.parse(storedUser);
      const userId = String(user.id);
      
      const res = await fetch(`http://localhost:3001/favorites?userId=${userId}&_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.reverse());
      }
    } catch (err) {
      console.error("Помилка завантаження:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();

    window.addEventListener("favoritesChanged", fetchFavorites);
    window.addEventListener("focus", fetchFavorites);
    
    return () => {
      window.removeEventListener("favoritesChanged", fetchFavorites);
      window.removeEventListener("focus", fetchFavorites);
    };
  }, []);

  const clearAllFavorites = async () => {
    if (favorites.length === 0) return;
    
    if (!window.confirm("Ви дійсно хочете видалити всі збережені події?")) return;

    try {
      setLoading(true);
      await Promise.all(
        favorites.map(fav =>
          fetch(`http://localhost:3001/favorites/${fav.id}`, { method: 'DELETE' })
        )
      );
      
      setFavorites([]);
      window.dispatchEvent(new Event('favoritesChanged'));
    } catch (err) {
      console.error("Помилка при очищенні:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white pb-32 pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 mt-2 md:mt-4 border-b border-gray-l pb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-m-t rounded-full transition-colors shrink-0 border-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </Link>
            
            {/* Зменшений заголовок до text-3xl */}
            <h1 className="text-2xl md:text-3xl font-black text-m-t flex items-center gap-3">
              Вподобайки
              {!loading && favorites.length > 0 && (
                <span className="text-lg md:text-xl font-bold text-gray-500 bg-gray-100 px-3 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </h1>
          </div>

          <button 
            onClick={clearAllFavorites}
            disabled={favorites.length === 0}
            className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-colors shrink-0 ${
              favorites.length > 0 
                ? "bg-gray-100 text-red-500 hover:bg-gray-200 cursor-pointer" 
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
          >
            Видалити всі
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-32 text-gray-400 font-bold animate-pulse text-lg">Завантаження...</div>
        ) : favorites.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-20 animate-in fade-in duration-700">
            <div className="text-6xl mb-6">🤍</div>
            <h2 className="text-2xl font-bold text-m-t mb-3">Тут поки порожньо</h2>
            <p className="text-gray-d mb-8">Додавайте події у вподобайки, щоб створити власну підбірку.</p>
            <Link href="/" className="bg-orange text-white px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-all shadow-sm inline-block">
              Знайти цікаві події
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 justify-items-center animate-in fade-in duration-500">
            {favorites.map((event) => (
              <EventCard key={event.id} {...event} id={event.originalEventId} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}