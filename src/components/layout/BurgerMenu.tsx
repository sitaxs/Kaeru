"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import LocationSelector from "../ui/LocationSelector"; 
import HeadLogo from "../ui/HeadLogo";
// Імпортуємо твої кастомні іконки з папки Icon
import RemindersIcon from "../Icon/RemindersIcon";
import FavoritesIcon from "../Icon/FavoritesIcon";

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BurgerMenu({ isOpen, onClose }: BurgerMenuProps) {
    const [mounted, setMounted] = useState(false);
    const [isRendered, setIsRendered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false); 
    
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            if (window.innerWidth < 768) {
                document.body.style.overflow = "hidden";
            }
            const timer = setTimeout(() => setIsAnimating(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = "unset";
            const timer = setTimeout(() => setIsRendered(false), 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted || !isRendered) return null;

    const handleNavigation = (path: string) => {
        onClose();
        router.push(path);
    };

    const menuContent = (
        <div className="fixed inset-0 z-[9999] flex justify-end overflow-hidden">
            <div 
                className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-in-out ${
                    isAnimating ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            ></div>

            <div 
                className={`relative w-full md:w-[380px] h-[100dvh] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.08)] flex flex-col rounded-none md:rounded-l-[2rem] transition-transform duration-500 ease-in-out transform ${
                    isAnimating ? "translate-x-0" : "translate-x-full"
                }`}
            >
                
                <div className="flex items-center justify-between p-6 border-b border-gray-l">
                    <span className="text-xl font-black tracking-widest text-m-t">KAERU</span>
                    <button onClick={onClose} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-m-t transition-colors shadow-sm active:scale-95">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2 scrollbar-hide">
                    
                    {/* МІЙ АКАУНТ (Тепер це велика клікабельна кнопка) */}
                    <button onClick={() => handleNavigation('/profile')} className="flex items-center gap-4 px-4 mb-4 text-left w-full hover:opacity-80 transition-opacity">
                        <div className="w-14 h-14 bg-orange text-white rounded-full flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                            <div className="w-[80%] h-[80%] flex items-center justify-center mt-2">
                                <HeadLogo/>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-m-t text-lg leading-tight">Мій Акаунт</h3>
                            <span className="text-sm text-gray-d font-medium">Перейти в профіль</span>
                        </div>
                    </button>

                    {/* ВЕЛИКА КНОПКА "СТВОРИТИ ІВЕНТ" */}
                    <div className="px-2 mb-4">
                        <button onClick={() => handleNavigation('/create')} className="w-full py-3.5 bg-orange text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2 shadow-sm">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Створити івент
                        </button>
                    </div>

                    {/* ЛОКАЦІЯ */}
                    <div className="lg:hidden px-2 mb-4">
                        <div className="bg-gray-50 rounded-2xl p-2">
                            <LocationSelector />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        {/* НОВА ВКАЛДКА: МОЇ КВИТКИ */}
                        <button onClick={() => handleNavigation('/profile?tab=tickets')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 transition-colors text-m-t font-bold text-lg text-left group">
                            <span className="w-8 flex justify-center text-gray-d group-hover:text-orange transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
                            </span>
                            Мої квитки
                        </button>

                        <button onClick={() => handleNavigation('/reminders')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 transition-colors text-m-t font-bold text-lg text-left group">
                            <span className="w-8 flex justify-center text-gray-d group-hover:text-orange transition-colors">
                                {/* Замінили на твій дзвіночок */}
                                <RemindersIcon className="w-6 h-6" />
                            </span>
                            Сповіщення
                        </button>
                        
                        <button onClick={() => handleNavigation('/favorites')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-100 transition-colors text-m-t font-bold text-lg text-left group">
                            <span className="w-8 flex justify-center text-gray-d group-hover:text-orange transition-colors">
                                {/* Замінили на твою лапку */}
                                <FavoritesIcon className="w-[26px] h-[26px]" />
                            </span>
                            Вподобайки
                        </button>
                        
                        <button onClick={() => handleNavigation('/dashboard')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-grean-l/10 transition-colors text-m-t font-bold text-lg text-left group">
                            <span className="w-8 flex justify-center text-grean-l">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
                            </span>
                            Для організатора
                        </button>
                    </div>

                    <div className="h-px bg-gray-l my-4 mx-4"></div>

                    <div className="flex flex-col gap-1">
                        <button onClick={() => handleNavigation('/settings')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-gray-d font-medium text-lg text-left">
                            <span className="w-8 flex justify-center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span>
                            Налаштування
                        </button>
                        <button onClick={() => handleNavigation('/help')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-gray-d font-medium text-lg text-left">
                            <span className="w-8 flex justify-center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></span>
                            Допомога
                        </button>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-l pb-8 md:pb-6">
                    <button 
                        onClick={() => { 
                            localStorage.removeItem("kaeru_user"); 
                            handleNavigation('/login'); 
                        }} 
                        className="w-full py-4 rounded-xl font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Вийти
                    </button>
                </div>

            </div>
        </div>
    );

    return createPortal(menuContent, document.body);
}