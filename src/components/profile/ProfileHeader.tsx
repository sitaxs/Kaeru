"use client";
import { User } from "@/types/types";

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="mb-8 md:mb-12 relative">
      {/* БАНЕР */}
      <div className="h-32 md:h-48 w-full bg-gradient-to-r from-orange/20 to-orange/40 rounded-[32px] overflow-hidden relative group cursor-pointer">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         {/* Іконка зміни банера (з'являється при наведенні) */}
         <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
         </div>
      </div>

      {/* АВАТАРКА ТА ІНФО */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 px-6 md:px-10 -mt-16 relative z-10">
        
        {/* Блок аватарки */}
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-orange border-4 border-white rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-black uppercase shadow-md shrink-0">
            {user.name ? user.name.charAt(0) : "U"}
          </div>
          
          {/* Кнопка зміни фото (З ефектом hover:scale-110) */}
          <div className="absolute bottom-0 right-0 bg-white p-2 md:p-2.5 rounded-full shadow-md border border-gray-100 hover:scale-110 transition-transform duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          </div>
        </div>

        <div className="text-center md:text-left mb-2 md:mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-m-t">{user.name || "Ім'я"}</h1>
          <p className="text-sm md:text-base text-gray-500">{user.email || "Електронна адреса"}</p>
        </div>
      </div>
    </div>
  );
}