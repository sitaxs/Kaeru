"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CalendarPicker from "./CalendarPicker";

interface MobileModalProps {
    isOpen: boolean; 
    onClose: () => void;
    query: string; 
    setQuery: (q: string) => void;
    selectedCategories: string[]; 
    toggleCategory: (c: string) => void;
    selectedDates: string[]; 
    toggleDate: (d: string) => void;
    onSearch: () => void;
}

export default function MobileSearchModal({ 
    isOpen, onClose, query, setQuery, 
    selectedCategories, toggleCategory, 
    selectedDates, toggleDate, onSearch 
}: MobileModalProps) {
    const [mounted, setMounted] = useState(false);
    const [activeCard, setActiveCard] = useState<"what" | "format" | "when">("what");

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            setActiveCard("what"); 
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-[#f7f7f9] z-[9999] flex flex-col animate-in slide-in-from-bottom-4 duration-300 overflow-hidden w-full h-[100dvh]">
            
            <div className="pt-6 px-4 flex justify-center relative">
                <button onClick={onClose} className="absolute left-4 top-6 w-8 h-8 bg-white border border-gray-l rounded-full flex items-center justify-center text-m-t shadow-sm active:scale-95 transition-transform">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pt-6 pb-32 flex flex-col gap-3 scrollbar-hide">
                
                {/* 1. ЩО */}
                {activeCard === "what" ? (
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-black text-m-t mb-5">Що шукаєте?</h2>
                        <div className="w-full h-14 border-2 border-gray-l rounded-2xl flex items-center px-4">
                            <input 
                                type="text" placeholder="Назва або спікер..." value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                className="w-full bg-transparent outline-none text-lg text-m-t font-medium" autoFocus 
                            />
                        </div>
                    </div>
                ) : (
                    <div onClick={() => setActiveCard("what")} className="bg-white rounded-3xl p-5 shadow-sm flex justify-between items-center">
                        <span className="text-gray-d font-medium text-sm">Що</span>
                        <span className="text-m-t font-bold truncate max-w-[60%]">{query || "Запит"}</span>
                    </div>
                )}

                {/* 2. ФОРМАТ */}
                {activeCard === "format" ? (
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-black text-m-t mb-5">Формат</h2>
                        <div className="flex flex-wrap gap-2">
                            {["IT & Tech", "Дизайн", "Бізнес", "Мистецтво"].map(cat => (
                                <button key={cat} onClick={() => toggleCategory(cat)} className={`px-4 py-2.5 rounded-full border text-sm font-bold ${selectedCategories.includes(cat) ? "border-orange bg-orange/10 text-orange" : "border-gray-l text-m-t"}`}>{cat}</button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div onClick={() => setActiveCard("format")} className="bg-white rounded-3xl p-5 shadow-sm flex justify-between items-center">
                        <span className="text-gray-d font-medium text-sm">Формат</span>
                        <span className="text-m-t font-bold truncate max-w-[60%] text-right">{selectedCategories.length > 0 ? selectedCategories.length : "Будь-який"}</span>
                    </div>
                )}

                {/* 3. КОЛИ (Тепер з Календарем) */}
                {activeCard === "when" ? (
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-black text-m-t mb-5">Коли?</h2>
                        <CalendarPicker 
                            selectedDates={selectedDates} 
                            onToggle={toggleDate} 
                        />
                    </div>
                ) : (
                    <div onClick={() => setActiveCard("when")} className="bg-white rounded-3xl p-5 shadow-sm flex justify-between items-center">
                        <span className="text-gray-d font-medium text-sm">Коли</span>
                        <span className="text-m-t font-bold truncate max-w-[60%] text-right">{selectedDates.length > 0 ? selectedDates.length : "Будь-коли"}</span>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-l px-6 py-4 flex justify-between items-center z-20 pb-safe">
                <button onClick={() => { setQuery(""); toggleCategory("clear_all"); toggleDate("clear_all"); setActiveCard("what"); }} className="text-m-t font-bold underline underline-offset-4">Очистити все</button>
                <button onClick={onSearch} className="bg-orange text-white px-8 py-3.5 rounded-xl font-bold text-lg flex items-center gap-2 active:scale-95 transition-transform shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Пошук
                </button>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}