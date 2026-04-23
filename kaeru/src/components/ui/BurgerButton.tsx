"use client";

export default function BurgerButton({ onClick, className = "" }: { onClick?: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full hover:bg-gray-100 transition-colors duration-200 group focus:outline-none ${className}`}
      aria-label="Меню"
    >
      {/* Контейнер для ліній */}
      <div className="flex flex-col items-center justify-center gap-[5px] w-5 h-5">
        <span className="w-5 h-[2px] bg-m-t rounded-full transition-transform duration-300 group-hover:scale-x-110"></span>
        <span className="w-5 h-[2px] bg-m-t rounded-full transition-transform duration-300"></span>
        <span className="w-5 h-[2px] bg-m-t rounded-full transition-transform duration-300 group-hover:scale-x-110"></span>
      </div>
    </button>
  );
}