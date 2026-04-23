"use client";
import { useState } from "react";
import Image from "next/image";
import { Review } from "@/types/types";

// ... (Ваш існуючий код компонента FlyIcon залишається без змін)
const FlyIcon = ({ filled, onMouseEnter, onMouseLeave, onClick }: any) => (
    <svg width="28" height="30" viewBox="0 0 43 46" fill="none" xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}
      className="cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
      style={{ filter: filled ? "none" : "grayscale(100%) opacity(30%)" }}>
      <rect width="43" height="46" fill="url(#pattern0_4_30)"/>
      <defs>
        <pattern id="pattern0_4_30" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image0_4_30" transform="matrix(0.0117557 0 0 0.010989 -0.00549451 0)"/>
        </pattern>
        <image id="image0_4_30" width="86" height="91" preserveAspectRatio="none" href="data:image/png;base64,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"/>
      </defs>
    </svg>
  );

export default function EventReviews({ reviews = [] }: { reviews?: Review[] }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [filter, setFilter] = useState("newest");

  // Беремо лише перші 5 відгуків
  const displayReviews = reviews.slice(0, 5);
  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) : "0.0";

  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-3xl font-black uppercase text-m-t mb-2">Враження глядачів</h2>
        <p className="text-gray-d">Інші глядачі вже поділилися своїми враженнями. Залиште свою оцінку!</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between bg-white border border-gray-l p-4 md:p-8 rounded-3xl gap-6 md:gap-8 shadow-sm mb-10">
        <div className="flex gap-6 md:gap-8 shrink-0 items-center md:items-start">
          <div>
            <p className="text-xs md:text-sm text-gray-d mb-1 font-medium">Загальна оцінка:</p>
            <div className="flex items-baseline gap-1 md:gap-2">
              <span className="text-3xl md:text-5xl font-black text-m-t">{averageRating}</span>
              <span className="text-orange text-xl md:text-3xl">★</span>
            </div>
          </div>
          <div className="w-[1px] h-12 md:h-16 bg-gray-l"></div>
          <div>
            <p className="text-xs md:text-sm text-gray-d mb-1 font-medium">Кількість оцінок:</p>
            <span className="text-3xl md:text-5xl font-black text-m-t">{reviews.length}</span>
          </div>
        </div>

        <div className="flex-1 w-full bg-gray-50 p-3 md:p-4 rounded-2xl border border-gray-l/50">
          <textarea placeholder="Розкажіть про свої враження..." className="w-full bg-transparent outline-none resize-none text-m-t placeholder:text-gray-d mb-2 h-12 md:h-16 text-sm md:text-base"></textarea>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 pt-3">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button className="p-2 bg-white border border-gray-l rounded-full text-gray-d hover:text-orange hover:border-orange transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <FlyIcon key={index} filled={index <= (hover || rating)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(0)} onClick={() => setRating(index)}/>
                ))}
              </div>
            </div>
            <button className="px-6 py-2.5 w-full sm:w-auto bg-green-500 text-white font-bold uppercase tracking-wide rounded-full hover:bg-green-600 transition-colors">Оцінити</button>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 bg-white border border-gray-l rounded-xl px-3 py-1.5 shadow-sm text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
            <select className="bg-transparent outline-none text-m-t font-medium cursor-pointer" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="newest">Спочатку нові</option>
              <option value="oldest">Спочатку старі</option>
              <option value="positive">Позитивні</option>
              <option value="negative">Негативні</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {displayReviews.length === 0 && <p className="text-gray-d italic">Ще немає відгуків. Будьте першим!</p>}
        
        {displayReviews.map(review => (
          <div key={review.id} className="bg-white border border-gray-l p-5 rounded-3xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-white">{review.authorInitial}</div>
              <div>
                <p className="font-bold text-m-t text-sm">{review.authorName}</p>
                <div className="flex gap-1 mt-0.5">
                  <span className="text-orange text-[10px]">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                </div>
              </div>
              <span className="text-xs text-gray-d ml-auto">{review.date}</span>
            </div>
            
            {review.text && <p className="text-m-t mb-3 text-sm">{review.text}</p>}
            
            {review.mediaUrl && (
              <div className="flex gap-2 mb-3">
                <div className="w-20 h-20 bg-gray-200 rounded-xl relative overflow-hidden">
                   <Image src={review.mediaUrl} alt="review photo" fill className="object-cover"/>
                </div>
              </div>
            )}

            {/* ВІДПОВІДЬ ОРГАНІЗАТОРА */}
            {review.adminReply && (
              <div className="mt-4 bg-gray-50 border border-gray-l p-4 rounded-2xl ml-4 md:ml-12 relative">
                <div className="absolute -left-3 top-4 text-gray-l">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-m-t text-sm">{review.adminReply.author}</span>
                  <span className="text-[10px] bg-orange/10 text-orange px-2 py-0.5 rounded-full font-bold">Організатор</span>
                  <span className="text-xs text-gray-d ml-auto">{review.adminReply.date}</span>
                </div>
                <p className="text-sm text-gray-d">{review.adminReply.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {reviews.length > 5 && (
        <div className="mt-8 flex flex-col items-center gap-6">
          <button className="px-8 py-3 border border-gray-l text-m-t font-bold rounded-full hover:bg-gray-100 transition-colors uppercase text-sm tracking-widest">
            Показати ще 10
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button key={page} className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors ${page === 1 ? "bg-orange text-white" : "bg-white border border-gray-l text-m-t hover:bg-gray-100"}`}>
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}