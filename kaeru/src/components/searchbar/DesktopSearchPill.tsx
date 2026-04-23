"use client";

import { useRef, useEffect } from "react";

interface DesktopSearchPillProps {
    query: string;
    setQuery: (val: string) => void;
    selectedCategories: string[];
    setSelectedCategories: (cats: string[]) => void;
    selectedDates: string[];
    setSelectedDates: (dates: string[]) => void;
    activeTab: "what" | "format" | "when" | null;
    setActiveTab: (tab: "what" | "format" | "when") => void;
    onSearch: (e: React.MouseEvent) => void;
}

export default function DesktopSearchPill({ 
    query, setQuery, 
    selectedCategories, setSelectedCategories, 
    selectedDates, setSelectedDates, 
    activeTab, setActiveTab, onSearch 
}: DesktopSearchPillProps) {
    
    // Створюємо референс для нашого інпуту
    const inputRef = useRef<HTMLInputElement>(null);

    // Щоразу, коли змінюється activeTab, перевіряємо, чи це "what"
    useEffect(() => {
        if (activeTab === "what" && inputRef.current) {
            // Примусово ставимо курсор в інпут
            inputRef.current.focus();
        }
    }, [activeTab]);
    
    const getDateLabel = () => {
        if (selectedDates.length === 0) return "Будь-коли";
        if (selectedDates.length === 1) return selectedDates[0];
        return `Обрано: ${selectedDates.length}`;
    };

    const clearQuery = (e: React.MouseEvent) => { e.stopPropagation(); setQuery(""); };
    const clearCategories = (e: React.MouseEvent) => { e.stopPropagation(); setSelectedCategories([]); };
    const clearDates = (e: React.MouseEvent) => { e.stopPropagation(); setSelectedDates([]); };

    return (
        <div className={`w-full h-[4.5rem] rounded-[2.5rem] bg-background items-center flex transition-all duration-300 relative border ${
            activeTab ? "border-transparent shadow-md bg-white" : "border-gray-l/50 shadow-sm hover:shadow-md"
        }`}>
            {/* ЩО ШУКАЄТЕ */}
            <div onClick={() => setActiveTab("what")} className={`flex-[2.5] h-full flex items-center justify-between px-8 rounded-[2.5rem] transition-all duration-300 cursor-text relative z-10 ${activeTab === "what" ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] scale-[1.02]" : "hover:bg-gray-l/30"}`}>
                <div className="flex flex-col justify-center flex-1 overflow-hidden">
                    <span className="text-[0.95rem] font-bold text-m-t">Знайти подію</span>
                    <input 
                        ref={inputRef} // Прив'язуємо наш референс до інпуту
                        type="text" 
                        placeholder="Тут будуть івенти..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        className="bg-transparent outline-none text-[1rem] text-m-t w-full placeholder:text-gray-d mt-0.5" 
                    />
                </div>
                {/* ХРЕСТИК ОЧИЩЕННЯ */}
                {query.length > 0 && (
                    <button onClick={clearQuery} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-m-t hover:bg-gray-200 transition-colors z-20 shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                )}
            </div>

            <div className={`w-[1px] h-[50%] bg-gray-l transition-opacity ${activeTab === "what" || activeTab === "format" ? "opacity-0" : "opacity-100"}`}></div>

            {/* ФОРМАТ */}
            <div onClick={() => setActiveTab("format")} className={`flex-[1] h-full flex items-center justify-between px-6 rounded-[2.5rem] transition-all duration-300 cursor-pointer relative z-10 ${activeTab === "format" ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] scale-[1.02]" : "hover:bg-gray-l/30"}`}>
                <div className="flex flex-col justify-center overflow-hidden">
                    <span className="text-[0.95rem] font-bold text-m-t">Формат & Тема</span>
                    <span className={`text-[0.95rem] truncate mt-0.5 ${selectedCategories.length > 0 ? "text-orange font-medium" : "text-gray-d"}`}>
                        {selectedCategories.length > 0 ? `Обрано: ${selectedCategories.length}` : "Будь-який"}
                    </span>
                </div>
                {selectedCategories.length > 0 && (
                    <button onClick={clearCategories} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-m-t hover:bg-gray-200 transition-colors z-20 shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                )}
            </div>

            <div className={`w-[1px] h-[50%] bg-gray-l transition-opacity ${activeTab === "format" || activeTab === "when" ? "opacity-0" : "opacity-100"}`}></div>

            {/* КОЛИ + КНОПКА */}
            <div onClick={(e) => { if ((e.target as HTMLElement).closest('button')) return; setActiveTab("when"); }} className={`flex-[1.2] h-full flex items-center justify-between pl-6 pr-2 rounded-[2.5rem] transition-all duration-300 cursor-pointer relative z-10 ${activeTab === "when" ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] scale-[1.02]" : "hover:bg-gray-l/30"}`}>
                <div className="flex items-center flex-1 overflow-hidden justify-between pr-2">
                    <div className="flex flex-col justify-center overflow-hidden">
                        <span className="text-[0.95rem] font-bold text-m-t">Коли</span>
                        <span className={`text-[0.95rem] truncate mt-0.5 ${selectedDates.length > 0 ? "text-orange font-medium" : "text-gray-d"}`}>
                            {getDateLabel()}
                        </span>
                    </div>
                    {selectedDates.length > 0 && (
                        <button onClick={clearDates} className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-m-t hover:bg-gray-200 transition-colors z-20 shrink-0">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    )}
                </div>
                
                <button onClick={onSearch} className={`h-[3.2rem] bg-orange hover:opacity-90 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 text-background font-bold gap-2 ${activeTab ? "w-auto px-6 shadow-md" : "w-[3.2rem]"}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    {/* {activeTab && <span className="animate-in fade-in duration-300">Знайти</span>} */}
                </button>
            </div>
        </div>
    );
}