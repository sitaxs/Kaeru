"use client";

import { useState } from "react";

interface CalendarPickerProps {
    selectedDates: string[]; // Тепер це масив
    onToggle: (date: string) => void; // Функція перемикання
}

export default function CalendarPicker({ selectedDates, onToggle }: CalendarPickerProps) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayIndex = (new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 6) % 7;

    const shortcuts = ["Тут і зараз", "Завтра", "На горизонті"];

    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Швидкі кнопки (Мульти-вибір) */}
            <div className="flex justify-center gap-3 mb-6 border-b border-gray-l pb-4">
                {shortcuts.map(s => (
                    <button 
                        key={s} 
                        onClick={() => onToggle(s)} 
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                            selectedDates.includes(s) ? "bg-orange text-white shadow-sm" : "text-gray-d hover:text-m-t hover:bg-gray-l"
                        }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            <div className="flex justify-between items-center mb-6 px-2">
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="w-8 h-8 rounded-full hover:bg-gray-l flex items-center justify-center text-gray-d transition-colors">{"<"}</button>
                <h3 className="font-bold text-m-t text-lg">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="w-8 h-8 rounded-full hover:bg-gray-l flex items-center justify-center text-gray-d transition-colors">{">"}</button>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center">
                {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map(d => (
                    <span key={d} className="text-xs font-bold text-gray-d mb-2">{d}</span>
                ))}
                
                {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`empty-${i}`} />)}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isPast = dateObj < today;
                    const formattedDate = `${day} ${monthNames[currentMonth.getMonth()]}`;
                    const isSelected = selectedDates.includes(formattedDate);

                    return (
                        <button 
                            key={day} 
                            disabled={isPast}
                            onClick={() => onToggle(formattedDate)}
                            className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                isPast 
                                    ? "text-gray-300 cursor-not-allowed opacity-50" 
                                    : isSelected 
                                        ? "bg-m-t text-background shadow-md scale-105" 
                                        : "text-m-t hover:bg-gray-l border border-transparent hover:border-gray-d"
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}