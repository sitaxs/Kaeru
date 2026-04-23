"use client";
import { User } from "@/types/types";

interface ProfileHeaderProps {
  user: User;
  variant?: "compact" | "full";
}

export default function ProfileHeader({ user, variant = "compact" }: ProfileHeaderProps) {
  if (variant === "full") {
    return (
      <div className="mb-8 relative">
        {/* БАНЕР ОРГАНІЗАТОРА */}
        <div className="h-32 md:h-48 w-full bg-gradient-to-r from-green-100 to-green-200 rounded-[32px] overflow-hidden relative group cursor-pointer">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
           </div>
        </div>

        {/* АВАТАРКА ТА ІНФО */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 px-6 md:px-10 -mt-16 relative z-10">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-grean-l border-4 border-white rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-black uppercase shadow-md">
              {user.name?.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </div>
          </div>
          <div className="text-center md:text-left mb-2 md:mb-4">
            <h1 className="text-2xl md:text-3xl font-black text-m-t">{user.name}</h1>
            <p className="text-sm md:text-base text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    );
  }

  // КОМПАКТНИЙ ВАРІАНТ (ДЛЯ ГЛЯДАЧА)
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-orange rounded-full flex items-center justify-center text-white text-xl font-black uppercase shadow-sm">
        {user.name?.charAt(0)}
      </div>
      <div>
        <h1 className="text-xl font-black text-m-t leading-none">{user.name}</h1>
        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
      </div>
    </div>
  );
}