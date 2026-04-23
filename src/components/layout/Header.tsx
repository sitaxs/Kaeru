"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../searchbar/SearchBar";
import BurgerButton from "../ui/BurgerButton";
import LocationSelector from "../ui/LocationSelector";
import Logo from "../ui/Logo";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState<"what" | "format" | "when" | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const collapsed = (!isHomePage || isScrolled) && !isSearchExpanded;

  useEffect(() => {
    const savedPhoto = localStorage.getItem("user_photo");
    if (savedPhoto) setUserPhoto(savedPhoto);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY > 20) {
          setIsSearchExpanded(false);
          setActiveSearchTab(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const openSearch = (tab: "what" | "format" | "when") => {
      setActiveSearchTab(tab);
      setIsSearchExpanded(true);
  };

  return (
    <>
      <div 
        className={`hidden md:block fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isSearchExpanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => { setIsSearchExpanded(false); setActiveSearchTab(null); }}
      />

      <header
        className={`fixed top-0 z-50 w-full bg-white transition-all duration-300 border-b ${
          collapsed ? "border-gray-200 pb-2 md:pb-4 shadow-sm" : "border-transparent pb-2 md:pb-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="flex h-16 md:h-20 items-center justify-between relative">

            <div className="flex-1 flex items-center justify-start z-30">
              <Link 
                href="/" 
                className={`absolute flex items-center gap-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] whitespace-nowrap hover:opacity-90 ${
                  collapsed ? "left-0 translate-x-0" : "left-0 translate-x-0 md:left-1/2 md:-translate-x-1/2"
                }`}
                onClick={() => { setIsSearchExpanded(false); setActiveSearchTab(null); }}
              >
                <div className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center shrink-0">
                    <Logo />
                </div>
                <h1 className="text-2xl md:text-[26px] lg:text-3xl font-medium tracking-widest text-m-t mt-1">
                  KAERU
                </h1>
              </Link>
            </div>

            <search className="hidden md:flex flex-[2] lg:flex-[2.5] items-center justify-center relative h-[3.5rem] z-10 px-2 lg:px-4">
              <div
                className={`flex items-center justify-between border border-gray-l rounded-full shadow-sm hover:shadow-md bg-white transition-all duration-300 p-1.5 gap-1 w-full max-w-[650px] ${
                  collapsed ? "opacity-100 scale-100 translate-y-0 relative" : "opacity-0 scale-95 -translate-y-4 pointer-events-none absolute"
                }`}
              >
                <button onClick={() => openSearch("what")} className="flex-1 text-sm font-medium text-m-t hover:text-orange px-2 py-2 truncate text-center transition-colors">
                  Знайти подію
                </button>
                <span className="w-[1px] h-6 bg-gray-l shrink-0"></span>
                
                <button onClick={() => openSearch("format")} className="flex-1 text-sm font-medium text-m-t hover:text-orange px-2 py-2 truncate text-center transition-colors">
                  Формат
                </button>
                <span className="w-[1px] h-6 bg-gray-l shrink-0"></span>
                
                <button onClick={() => openSearch("when")} className="flex-1 text-sm font-medium text-gray-d hover:text-orange px-2 py-2 truncate text-center transition-colors">
                  Коли
                </button>

                <button onClick={() => openSearch("what")} className="w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0 ml-1 hover:bg-orange/90 transition-transform hover:scale-105">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
              </div>
            </search>

            <div className="flex-1 flex justify-end items-center gap-3 md:gap-4 z-20">
              
              {/* ОНОВЛЕНО: Тепер локація видима ТІЛЬКИ на ПК (lg:block), на планшеті ховається */}
              <div className="flex-1 flex justify-end items-center gap-3 md:gap-4 z-20">
              
              {/* Локація: видима ТІЛЬКИ на великих екранах ПК (від 1280px - xl). На планшетах її немає */}
              <div className="hidden xl:block">
                <LocationSelector />
              </div>

             {/* Контейнер для іконок: показуємо починаючи з планшетів (md) */}
             <div className="hidden md:flex items-center gap-3">
                {/* Дзвіночок: видимий ТІЛЬКИ на ПК (xl). На планшетах ховаємо */}
                <Link href="/reminders" className="hidden xl:flex w-12 h-12 items-center justify-center rounded-full text-gray-d hover:text-m-t hover:bg-gray-100 transition-all">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                </Link>

                {/* Профіль: Залишається на ВСІХ планшетах (і на iPad, і на iPad Pro) та ПК */}
                <Link href="/profile" className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden hover:shadow-md transition-all">
                  {userPhoto ? (
                      <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                  )}
                </Link>
              </div>

              {/* Лупа для пошуку ТІЛЬКИ на телефоні біля бургера (< 768px) */}
              <button onClick={() => openSearch("what")} className="md:hidden w-10 h-10 flex items-center justify-center rounded-full text-m-t active:scale-95 transition-transform">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>

              <BurgerButton onClick={() => setIsMenuOpen(true)} />

            </div>

            </div>
          </div>

          <div
            className={`hidden md:flex transition-all duration-300 transform origin-top justify-center w-full ${
              collapsed ? "h-0 opacity-0 scale-y-75 pointer-events-none mt-0 absolute" : "h-[90px] opacity-100 scale-y-100 mt-4 relative"
            }`}
          >
            <div className="w-full transition-transform duration-300 ease-in-out z-50">
              <SearchBar 
                 onClose={() => { setIsSearchExpanded(false); setActiveSearchTab(null); }} 
                 initialTab={activeSearchTab}
              />
            </div>
          </div>

        </div>
      </header>
      
      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}