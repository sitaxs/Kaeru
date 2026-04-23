"use client";

import { useRouter, useSearchParams } from "next/navigation";

const subCategoryData: Record<string, string[]> = {
  entertainment: ["Стендап", "Кіно", "Вечірки", "Ігри", "Концерти", "Квізи", "Караоке", "Фестивалі", "Шоу"],
  education: ["Лекції", "Воркшопи", "ІТ", "Мови", "Психологія", "Маркетинг", "Фотографія", "Кулінарія"],
  family: ["Дитячі табори", "Майстер-класи", "Аніматори", "Квести", "Екскурсії", "Зоопарки", "Цирк"],
  arts: ["Виставки", "Театр", "Музеї", "Поезія", "Живопис", "Скульптура", "Опера", "Балет"],
  tech: ["Розробка", "Дизайн", "Штучний інтелект", "Кібербезпека", "Стартапи", "Blockchain", "VR/AR"],
  sports: ["Марафони", "Йога", "Фітнес", "Турніри", "Командні ігри", "Теніс", "Плавання", "Велоспорт"],
  business: ["Нетворкінг", "Фінанси", "Лідерство", "HR", "Інвестиції", "Продажі", "E-commerce"],
  food: ["Дегустації", "Ресторани", "Кава", "Вино", "Майстер-класи", "Street Food", "Веганство"]
};

// ТА САМА НІЖНА ЛІНІЯ (як у категоріях):
// h-[2px] - товщина
// border-l/r-[60px] - відступи від країв екрана, щоб лінія була коротшою
const subtleScrollbar = `
  [&::-webkit-scrollbar]:h-[2px] 
  [&::-webkit-scrollbar-track]:bg-transparent 
  [&::-webkit-scrollbar-thumb]:bg-gray-200 
  [&::-webkit-scrollbar-thumb]:rounded-full 
  [&::-webkit-scrollbar-thumb]:border-l-[60px] 
  [&::-webkit-scrollbar-thumb]:border-r-[60px] 
  [&::-webkit-scrollbar-thumb]:border-transparent 
  [&::-webkit-scrollbar-thumb]:bg-clip-padding
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-300
`;

export default function SubCategoryPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const subsParam = searchParams.get("subs");
  const selectedSubs = subsParam ? subsParam.split(",") : [];

  if (!category || !subCategoryData[category]) return null;

  const toggleSub = (sub: string) => {
    let newSubs = selectedSubs.includes(sub) ? selectedSubs.filter(s => s !== sub) : [...selectedSubs, sub];
    const params = new URLSearchParams(searchParams.toString());
    newSubs.length > 0 ? params.set("subs", newSubs.join(",")) : params.delete("subs");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearSubs = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("subs");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    // Backdrop-blur залишаємо для ефекту прилипання
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md transition-all mb-4">
      <div className="w-full max-w-[90rem] mx-auto overflow-hidden">
        {/* Додано subtleScrollbar та підібрано відступи pb-6 */}
        <div className={`flex items-center gap-3 overflow-x-auto pt-5 pb-6 px-4 sm:px-8 md:px-12 ${subtleScrollbar}`}>
          <button
            onClick={clearSubs}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 outline-none border ${
              selectedSubs.length === 0 
                ? "bg-gray-100 text-gray-500 cursor-default border-transparent" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            Всі події
          </button>

          {subCategoryData[category].map(sub => {
            const isSelected = selectedSubs.includes(sub);
            return (
              <button
                key={sub}
                onClick={() => toggleSub(sub)}
                className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 outline-none border ${
                  isSelected 
                    ? "bg-orange text-white border-transparent shadow-sm shadow-orange/20" 
                    : "bg-white text-m-t border-gray-200 hover:border-gray-300"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}