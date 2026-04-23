"use client";
import Image from "next/image";
import Link from "next/link";

interface ProfileEventCardProps {
  title: string;
  date: string;
  location: string;
  price: number | null; // Підтримує null для безкоштовних подій
  imageUrl: string;     // Використовуємо нове поле з бази даних
  tags: string[];
  isActive?: boolean;
  href?: string;
  
  // Керування кнопками
  showTicketButton?: boolean;
  showWalletButton?: boolean;
  showEditButton?: boolean;
  showReviewButton?: boolean;
  showNotifyButton?: boolean;

  onTicketClick?: () => void;
  onWalletClick?: () => void;
  onEditClick?: () => void;
  onReviewClick?: () => void;
  onNotifyClick?: () => void;
}

export default function ProfileEventCard({
  title, date, location, price, imageUrl, tags,
  isActive = true, href,
  showTicketButton = false, showWalletButton = false, showEditButton = false,
  showReviewButton = false, showNotifyButton = false,
  onTicketClick, onWalletClick, onEditClick, onReviewClick, onNotifyClick,
}: ProfileEventCardProps) {
  
  const handleAction = (e: React.MouseEvent, action?: () => void) => {
    e.preventDefault();
    if (action) action();
  };

  const CardContent = (
    // Горизонтальна картка (flex-col на телефоні, sm:flex-row на планшеті/ПК)
    // h-full забезпечує однакову висоту для всіх карток у сітці
    <div className={`group flex flex-col sm:flex-row bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100 w-full h-full relative ${isActive ? 'opacity-100' : 'opacity-70'}`}>
      
      {/* Кнопка редагування (якщо є) */}
      {showEditButton && (
        <button onClick={(e) => handleAction(e, onEditClick)} className="absolute top-2 right-2 z-10 bg-white/90 p-2 rounded-full shadow-sm hover:bg-orange hover:text-white transition-all duration-200 active:scale-95">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      )}

      {/* Зображення (Статичне, без ефектів збільшення при наведенні) */}
      <div className="relative h-[160px] sm:h-auto sm:w-[180px] shrink-0 overflow-hidden bg-gray-100">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* Інформація (flex-1 розтягує цей блок, щоб він зайняв всю висоту картки) */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        
        {/* Верхня частина з текстом */}
        <div>
          <h3 className="text-base md:text-lg font-bold text-m-t leading-tight mb-2 line-clamp-2 transition-colors group-hover:text-orange">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-1 flex items-center gap-1.5">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
             {date}
          </p>
          <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {location}
          </p>
        </div>

        {/* Нижня частина з кнопками (mt-auto притискає її до самого низу!) */}
        <div className="flex flex-col mt-auto pt-4">
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1.5 flex-wrap">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-2 py-0.5 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>
            {/* Логіка ціни: якщо null або 0, пишемо "Безкоштовно" */}
            <span className="font-bold text-base md:text-lg text-m-t whitespace-nowrap ml-2">
              {price === null || price === 0 ? "Безкоштовно" : `${price} ₴`}
            </span>
          </div>

          {/* Кнопки для АКТИВНИХ івентів (Єдиний формат: py-2.5, text-sm, active:scale-95) */}
          {(showTicketButton || showWalletButton) && (
            <div className="flex gap-2">
              {showTicketButton && (
                <button onClick={(e) => handleAction(e, onTicketClick)} className="flex-1 bg-orange text-white py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-[#D97706] hover:scale-[1.02] active:scale-95 shadow-sm">
                  Показати квиток
                </button>
              )}
              {showWalletButton && (
                <button onClick={(e) => handleAction(e, onWalletClick)} className="bg-black text-white px-4 py-2.5 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-gray-800 hover:scale-[1.02] active:scale-95 shadow-sm" title="Додати в Wallet">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                </button>
              )}
            </div>
          )}

          {/* Кнопки для НЕАКТИВНИХ івентів (Єдиний формат: py-2.5, text-sm, active:scale-95) */}
          {(showReviewButton || showNotifyButton) && (
            <div className="flex flex-col gap-2">
              {showReviewButton && (
                <button onClick={(e) => handleAction(e, onReviewClick)} className="w-full bg-white border-2 border-orange text-orange py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-orange hover:text-white hover:scale-[1.02] active:scale-95">
                  Залишити відгук
                </button>
              )}
              {showNotifyButton && (
                <button onClick={(e) => handleAction(e, onNotifyClick)} className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:bg-gray-200 hover:scale-[1.02] active:scale-95">
                  Повідомити про повтор
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) return <Link href={href} className="block w-full h-full cursor-pointer">{CardContent}</Link>;
  return <div className="w-full h-full">{CardContent}</div>;
}