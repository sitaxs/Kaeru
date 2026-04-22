import Link from "next/link";
import { Event } from "../../types/types";
import Image from "next/image";
import { LikeButton } from '../Icon/LikeButton';
import { cn } from '../../lib/utils';

// Використовуємо props, щоб передати весь об'єкт івенту в кнопку
function EventCard(props: Event) {
  const { id, title, date, location, price, imageUrl, tags, paymentType, status } = props;

  return (
    <div className="relative w-[20rem] md:w-[24rem] lg:w-[26.25rem] shrink-0 group">
      <Link
        href={`/events/${id}`}
        className="flex w-full h-[14rem] md:h-[15rem] lg:h-[15rem] bg-background border border-gray-l rounded-3xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        {/* ЛІВА ЧАСТИНА (Зображення) */}
        <div className="relative w-[40%] md:w-[45%] h-full shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={cn(
              "object-cover ",
              status === "active" && "grayscale-0",
              status === "pending" && "grayscale-[0.5] opacity-70 animate-pulse sepia-[0.2]",
              status === "inactive" && "grayscale opacity-50"
            )}
            sizes="(max-width: 768px) 40vw, 30vw"
          />
          {status === "inactive" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
              <span className="border-2 border-gray-dark/50 text-gray-dark/70 text-[10px] px-2 py-1 rounded-md font-black uppercase rotate-[-12deg]">
                Минуло
              </span>
            </div>
          )}
        </div>

        {/* ПРАВА ЧАСТИНА (Контент) */}
        <div className="p-4 flex flex-col justify-between w-[60%] md:w-[55%] font-sans">
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-bold text-m-t leading-tight mb-1 lg:mb-2 line-clamp-2">
              {title}
            </h3>
            <p className="text-[0.7rem] md:text-[0.75rem] lg:text-[0.875rem] text-gray-d">{date}</p>
            <p className="text-[0.7rem] md:text-[0.75rem] lg:text-[0.875rem] text-gray-d line-clamp-1 mt-0.5">{location}</p>
          </div>

          <div className="flex flex-wrap gap-1 lg:gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 lg:px-3 lg:py-1 bg-gray-l rounded-[1rem] text-[0.6rem] md:text-[0.65rem] lg:text-[0.75rem] font-medium text-m-t">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-1">
            <span className="font-bold text-sm md:text-base text-gray-dark uppercase tracking-wider">
              {paymentType === "paid" && price && `${price} грн`}
              {paymentType === "free" && "Безкоштовно"}
              {paymentType === "donation" && (
                <span className="text-brand-orange flex flex-col leading-none">
                  <span className="text-[10px] lowercase font-medium opacity-70">За</span>
                  <span className="text-sm md:text-base">донат</span>
                </span>
              )}
            </span>
          </div>
        </div>
      </Link>

      {/* ЛАПА - Передаємо весь об'єкт івенту через пропс `event` */}
      <div className="absolute bottom-4 right-4 z-20">
        <LikeButton event={props} className="w-8 h-8 md:w-9 md:h-9 z-10" />
      </div>
    </div>
  );
}

export default EventCard;