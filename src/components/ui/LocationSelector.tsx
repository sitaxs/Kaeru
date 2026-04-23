"use client";

import { useState, useRef, useEffect } from "react";

export default function LocationSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCities, setSelectedCities] = useState<string[]>(["Київ"]);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const cities = ["Київ", "Львів", "Одеса", "Дніпро", "Варшава", "Онлайн 🌐"];

    const toggleCity = (city: string) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter(c => c !== city));
        } else {
            setSelectedCities([...selectedCities, city]);
        }
    };

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setSelectedCities([]);
    };

    const getDisplayText = () => {
        if (selectedCities.length === 0) return "Всі міста";
        if (selectedCities.length === 1) return selectedCities[0];
        return `Обрано: ${selectedCities.length}`;
    };

    const sortedCities = [...cities].sort((a, b) => {
        const isASelected = selectedCities.includes(a);
        const isBSelected = selectedCities.includes(b);
        if (isASelected && !isBSelected) return -1; 
        if (!isASelected && isBSelected) return 1;  
        return 0; 
    });

    return (
        <div className="relative" ref={menuRef}>
            {/* ЗМІНА: 
              Жорстко фіксована ширина w-[140px] lg:w-[160px].
              shrink-0 гарантує, що кнопка ніколи не стиснеться і не розтягнеться.
            */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 hover:bg-gray-100 p-1.5 lg:px-2 lg:py-2 rounded-full transition-colors mr-1 group w-[140px] lg:w-[160px] shrink-0"
            >
                <span className="text-xl group-hover:scale-110 transition-transform shrink-0">
                    {selectedCities.includes("Онлайн 🌐") && selectedCities.length === 1 ? "🌐" : "📍"}
                </span>
                
                {/* Текст: min-w-0 та flex-1 дозволяють йому зайняти рівно той простір,
                  що залишився, а truncate обріже довгі назви міст, не міняючи розмір кнопки.
                */}
                <span className="hidden md:block text-sm font-bold text-m-t truncate text-left flex-1 min-w-0 ml-1">
                    {getDisplayText()}
                </span>

                {/* Хрестик: shrink-0 гарантує, що він не сплюснеться */}
                {selectedCities.length > 0 && (
                    <div 
                        onClick={clearSelection}
                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                        title="Очистити вибір"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                )}
            </button>

            {/* Випадаюче меню */}
            {isOpen && (
                <div className="absolute top-[120%] right-0 w-[280px] bg-white rounded-3xl shadow-xl border border-gray-100 p-4 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="mb-3 relative">
                        <input 
                            type="text" 
                            placeholder="Пошук міста..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-sm text-m-t outline-none focus:border-orange transition-colors"
                        />
                    </div>
                    
                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-left mb-2 group">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        </div>
                        <span className="text-sm font-bold text-m-t">Пошук поблизу мене</span>
                    </button>

                    <div className="w-full h-[1px] bg-gray-100 my-2"></div>
                    
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-2 px-3">Популярні</h4>
                    <ul className="flex flex-col gap-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                        {sortedCities.map(city => {
                            const isSelected = selectedCities.includes(city);
                            return (
                                <li 
                                    key={city} 
                                    onClick={() => toggleCity(city)}
                                    className={`px-3 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors flex justify-between items-center ${
                                        isSelected ? "bg-orange/10 text-orange font-bold" : "text-m-t hover:bg-gray-50"
                                    }`}
                                >
                                    <span>{city}</span>
                                    {isSelected && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}