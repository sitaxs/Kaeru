"use client";
import { useState } from "react";

export default function ExpandableText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return <p className="text-gray-d leading-relaxed text-lg">Опис відсутній.</p>;

  return (
    <div className="bg-gray-l/20 p-6 md:p-8 rounded-3xl border border-gray-l/50 relative overflow-hidden transition-all duration-300">
      <p className={`text-gray-d leading-relaxed text-lg ${!isExpanded ? "line-clamp-3" : ""}`}>
        {text}
      </p>
      
      {!isExpanded ? (
        <>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f8f9fa] to-transparent pointer-events-none"></div>
          <div className="mt-4 text-center relative z-10">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-m-t font-bold border-b border-m-t pb-0.5 hover:text-orange hover:border-orange transition-colors uppercase text-sm tracking-wide"
            >
              Більше інфо
            </button>
          </div>
        </>
      ) : (
        <div className="mt-8 text-center relative z-10">
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-d font-bold border-b border-gray-d pb-0.5 hover:text-orange hover:border-orange transition-colors uppercase text-sm tracking-wide"
          >
            Згорнути
          </button>
        </div>
      )}
    </div>
  );
}