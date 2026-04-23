"use client";

interface RoleSwitcherProps {
  current: "viewer" | "organizer";
  onSwitch: (role: "viewer" | "organizer") => void;
}

export default function RoleSwitcher({ current, onSwitch }: RoleSwitcherProps) {
  const isViewer = current === "viewer";
  
  return (
    // На ПК (md:) — стовпчик, на мобайлі — рядок з розносом по краях (justify-between)
    <div className="flex flex-row md:flex-col items-center md:items-start justify-between w-full gap-3 mb-6">
      
      {/* ЛІВА ЧАСТИНА: Індикатор режиму */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 shrink-0">
        <div className={`w-2 h-2 rounded-full ${isViewer ? 'bg-orange' : 'bg-grean-l'}`}></div>
        <span className="text-[10px] font-black uppercase text-m-t tracking-widest">
          Режим: {isViewer ? 'Глядач' : 'Організатор'}
        </span>
      </div>
      
      {/* ПРАВА ЧАСТИНА: Кнопка (на мобайлі вона буде "приклеєна" до правого краю завдяки justify-between) */}
      <button 
        onClick={() => onSwitch(isViewer ? "organizer" : "viewer")}
        className="text-[12px] font-bold text-gray-400 hover:text-m-t transition-colors uppercase tracking-widest flex items-center gap-1 group whitespace-nowrap"
      >
        <span>Змінити</span>
        <svg 
          className="transform group-hover:translate-x-1 transition-transform shrink-0" 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
}