'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Card from './Card';
import { Event } from '../../types/types';

interface EventCarouselProps {
  events: Event[];
}

export default function EventCarousel({ events = [] }: EventCarouselProps) {
  // Налаштування для швидкості та плавності
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    duration: 20,    // Швидша анімація
    friction: 0.5,   // Плавніший і довший скрол
    dragFree: true,  // Дозволяє вільно "штовхати" карусель
  });

  // Стани для кнопок та пагінації
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Функції керування
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Ініціалізація точок (пагінації)
  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  // Оновлення стану кнопок при гортанні
  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  // Підписка на події Embla
  useEffect(() => {
    if (!emblaApi) return;
    
    onInit(emblaApi);
    onSelect(emblaApi);
    
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  if (!events.length) return null;

  return (
    <section className="py-3 pt-18 md:pt-10 overflow-hidden">
      <div className="relative group/carousel">
        
        {/* ЛІВА КНОПКА */}
        <button 
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="hidden md:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          aria-label="Попередній слайд"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        {/* ПРАВА КНОПКА */}
        <button 
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="hidden md:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] items-center justify-center text-black hover:bg-gray-50 hover:scale-105 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          aria-label="Наступний слайд"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Viewport: додаємо відступи, щоб картки не впиралися в краї */}
        <div className="overflow-hidden px-4 md:px-12" ref={emblaRef}>
          {/* Container: використовуємо від'ємний margin, щоб компенсувати padding в'юпорту */}
          <div className="flex -ml-4 md:-ml-6">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="flex-[0_0_85vw] sm:flex-[0_0_380px] min-w-0 pl-4 md:pl-6"
              >
                {/* Контейнер для тіні, щоб не обрізалася знизу */}
                <div className="h-full pb-4"> 
                  <Card {...event} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Пагінація (крапочки) */}
        <div className="flex justify-center gap-2 mt-6 h-6 items-center">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Перейти до слайду ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === selectedIndex 
                  ? "w-5 h-2 md:w-7 md:h-2.5 bg-grean-d" 
                  : "w-2 h-2 md:w-2.5 md:h-2.5 bg-grean-l/50 hover:bg-grean-l/80"
              }`}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}