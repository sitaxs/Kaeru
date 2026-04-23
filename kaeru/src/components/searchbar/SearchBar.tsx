"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormatPicker from "../ui/FormatPicker"; 
import CalendarPicker from "./CalendarPicker";
import DesktopSearchPill from "./DesktopSearchPill";
import MobileSearchModal from "./MobileSearchModal";

interface SearchBarProps {
    onClose?: () => void;
    initialTab?: "what" | "format" | "when" | null;
}

export default function SearchBar({ onClose, initialTab = null }: SearchBarProps) {
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const [activeTab, setActiveTab] = useState<"what" | "format" | "when" | null>(initialTab);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

    const [query, setQuery] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setActiveTab(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
        if (item === "clear_all") { setList([]); return; }
        setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
    };

    const handleSearch = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveTab(null);
        setIsMobileModalOpen(false);
        if (onClose) onClose();
        
        const catQuery = selectedCategories.join(",");
        const dateQuery = selectedDates.join(",");
        router.push(`/events?q=${query}&cat=${catQuery}&dates=${dateQuery}`);
    };

    return (
        <>
            {/* --- ПК і ПЛАНШЕТ (Повернуто md:block, без випадіння з шапки) --- */}
            <div ref={searchRef} className="relative z-10 flex-1 mx-4 lg:mx-auto w-full max-w-4xl hidden md:block">
                <DesktopSearchPill 
                    query={query} setQuery={setQuery}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                    activeTab={activeTab} setActiveTab={setActiveTab}
                    onSearch={handleSearch}
                />

                {activeTab && (
                    <div className="absolute top-[120%] left-0 w-full bg-background rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-l/30 p-8 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {activeTab === "what" && (
                            <div className="flex items-center gap-3 text-gray-d font-medium">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <span>Почніть вводити назву події або ім'я спікера...</span>
                            </div>
                        )}
                        {activeTab === "format" && (
                            <FormatPicker 
                                selectedCategories={selectedCategories} 
                                toggleCategory={(cat) => toggleItem(cat, selectedCategories, setSelectedCategories)} 
                            />
                        )}
                        {activeTab === "when" && (
                            <CalendarPicker 
                                selectedDates={selectedDates} 
                                onToggle={(d) => toggleItem(d, selectedDates, setSelectedDates)} 
                            />
                        )}
                    </div>
                )}
            </div>

            {/* --- МОБІЛЬНИЙ ТЕЛЕФОН (<768px) --- */}
            <div className="md:hidden w-full px-2 mt-2" onClick={() => setIsMobileModalOpen(true)}>
                <div className="w-full h-[3.5rem] px-6 border border-gray-l/50 rounded-[2rem] bg-background flex items-center shadow-sm cursor-text">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--main-text)" strokeWidth="2.5" className="mr-3 shrink-0"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <span className="text-[1rem] text-m-t font-bold truncate">Тут будуть івенти...</span>
                </div>
            </div>

            {/* --- Повноекранна мобільна модалка --- */}
            <MobileSearchModal 
                isOpen={isMobileModalOpen} onClose={() => setIsMobileModalOpen(false)}
                query={query} setQuery={setQuery}
                selectedCategories={selectedCategories} toggleCategory={(cat) => toggleItem(cat, selectedCategories, setSelectedCategories)}
                selectedDates={selectedDates} toggleDate={(d) => toggleItem(d, selectedDates, setSelectedDates)}
                onSearch={handleSearch}
            />
        </>
    );
}