"use client";

interface FormatPickerProps {
    selectedCategories?: string[]; 
    toggleCategory: (cat: string) => void;
}

export default function FormatPicker({ selectedCategories = [], toggleCategory }: FormatPickerProps) {
    const formats = ["Конференція", "Воркшоп", "Вечірка", "Онлайн", "Нетворкінг", "Лекція"];
    const themes = ["IT & Tech", "Дизайн", "Бізнес", "Мистецтво", "Спорт", "Маркетинг"];

    return (
        <div className="grid grid-cols-2 gap-10">
            {/* Колонка 1: Формати */}
            <div>
                <h4 className="text-sm font-bold text-gray-d mb-4">Формат</h4>
                <div className="flex flex-wrap gap-2">
                    {formats.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => toggleCategory(tag)} 
                            // ТУТ ЗМІНИ: додано transition-transform duration-200 hover:scale-105 active:scale-95
                            // і прибрано зміну кольору бордера при hover
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-transform duration-200 hover:scale-105 active:scale-95 ${
                                selectedCategories.includes(tag) 
                                ? "bg-orange text-white border-orange shadow-sm" 
                                : "bg-white text-m-t border-gray-l"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Колонка 2: Тематика */}
            <div>
                <h4 className="text-sm font-bold text-gray-d mb-4">Тематика</h4>
                <div className="flex flex-wrap gap-2">
                    {themes.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => toggleCategory(tag)} 
                            // ТУТ ЗМІНИ: додано transition-transform duration-200 hover:scale-105 active:scale-95
                            // і прибрано зміну кольору бордера при hover
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-transform duration-200 hover:scale-105 active:scale-95 ${
                                selectedCategories.includes(tag) 
                                ? "bg-orange text-white border-orange shadow-sm" 
                                : "bg-white text-m-t border-gray-l"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}