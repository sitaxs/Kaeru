"use client";

interface SettingsTabProps {
  user: any;
  onLogout: () => void;
}

export default function SettingsTab({ user, onLogout }: SettingsTabProps) {
  return (
    <div className="animate-in fade-in duration-300 w-full">
      {/* Контейнер відцентровано на ПК */}
      <div className="max-w-2xl mx-auto w-full">
        <h3 className="text-xl md:text-2xl font-bold text-m-t mb-6 text-center md:text-left">Налаштування акаунта</h3>
        
        <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm mb-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-500 mb-2">Ім'я</label>
            <input type="text" defaultValue={user?.name || ""} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange transition-colors" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-500 mb-2">Електронна пошта</label>
            <input type="email" defaultValue={user?.email || ""} className="w-full bg-gray-100 border border-transparent rounded-xl px-4 py-3 text-gray-500 outline-none cursor-not-allowed" disabled />
            <p className="text-xs text-gray-400 mt-2">Email не можна змінити, оскільки він прив'язаний до вашого Google акаунта.</p>
          </div>
          <button className="w-full bg-m-t text-white font-bold py-3.5 rounded-xl hover:bg-opacity-90 transition-all">
            Зберегти зміни
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-4 bg-red-50 text-red font-bold rounded-xl hover:bg-red hover:text-white transition-colors"
        >
          Вийти з акаунта
        </button>
      </div>
    </div>
  );
}