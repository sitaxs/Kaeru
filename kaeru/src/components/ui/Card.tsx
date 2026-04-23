'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Event } from "../../types/types";
import { LikeButton } from '../Icon/LikeButton';
import { cn } from '../../lib/utils';

export default function EventCard(props: Event) {
  // Витягуємо imageUrl з пропсів (тепер це масив згідно твого types.ts)
  const { id, title, date, location, price, imageUrl, tags, paymentType, status, category, description } = props;

  // Виправляємо логіку: тепер ми перевіряємо сам imageUrl
  // Використовуємо :any, щоб уникнути конфліктів TypeScript, якщо в базі трапиться старий рядок
  const rawImage: any = imageUrl; 
  const validImages: string[] = Array.isArray(rawImage) && rawImage.length > 0 
    ? rawImage 
    : (typeof rawImage === 'string' && rawImage ? [rawImage] : ["/placeholder.jpg"]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <div className="relative flex flex-col w-[320px] sm:w-[360px] shrink-0 group h-full">
      <Link 
        href={`/events/${id}`} 
        className="flex flex-col h-full bg-white rounded-[2rem] p-3 shadow-[3px_4px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
      >
        
        <div className="relative w-full h-[240px] sm:h-[260px] rounded-[1.5rem] overflow-hidden shrink-0">
         {validImages.map((src: string, idx: number) => (
            <Image
              key={idx}
              src={src}
              alt={title}
              fill
              className={cn(
                "object-cover transition-all duration-700 ease-in-out group-hover:scale-105 absolute inset-0",
                idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
                status === "active" && "grayscale-0",
                status === "pending" && "grayscale-[0.5] opacity-70 animate-pulse",
                status === "inactive" && "grayscale opacity-50"
              )}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-0 pointer-events-none"></div>

          {/* Стрілочки каруселі */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 z-20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 z-20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </>
          )}

          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10 pr-12">
            {tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 text-white/100 text-[11px] font-medium rounded-full tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute top-3 right-3 z-20">
            <LikeButton 
              event={props} 
              fill="gray"
              strokeWidth="1"
              stroke="white"
              className="w-11 h-11 flex items-center justify-center hover:scale-110 transition-transform"
            />
          </div>

          {/* Точки каруселі */}
          {validImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
              {validImages.map((_: string, index: number) => (
                <div 
                  key={index} 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    index === currentIndex ? "bg-white scale-125" : "bg-white/50"
                  )}
                ></div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 px-2 pt-4 pb-2 font-sans">
          
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight line-clamp-1">
              {title}
            </h3>
            <span className="px-3 py-1 border border-gray-200 rounded-full text-[10px] sm:text-xs font-medium text-gray-700 shrink-0 whitespace-nowrap">
              {category}
            </span>
          </div>

          <div className="text-[13px] text-gray-500 mt-1.5 font-medium">
            {date} <span className="mx-1">•</span> {location}
          </div>

          <div className="text-[13px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {description || "Детальна інформація про цю подію, розклад та спікерів доступна на сторінці заходу."}
          </div>

          <div className="mt-auto pt-5 flex items-center justify-between">
            
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-lg text-gray-900">
                {paymentType === "paid" && price ? `${price} ₴` : null}
                {paymentType === "free" && "Безкоштовно"}
                {paymentType === "donation" && "Донат"}
              </span>
              {paymentType === "paid" && <span className="text-xs text-gray-500 font-medium">/ квиток</span>}
            </div>

            <div className="bg-orange text-white px-4 py-2.5 rounded-full flex items-center gap-2 text-[13px] font-semibold hover:scale-110 transition-transform shadow-md">
              Деталі
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
}