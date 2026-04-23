import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types/types";

export default function SmallEventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="group flex flex-col gap-3 min-w-[240px] max-w-[280px]">
      <div className="relative w-full h-[140px] rounded-2xl overflow-hidden bg-gray-100">
        <Image src={event.imageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-m-t">
          {event.paymentType === "free" ? "Безкоштовно" : `${event.price} ₴`}
        </div>
      </div>
      <div>
        <p className="text-orange text-xs font-bold mb-1 uppercase tracking-wider">{event.date}</p>
        <h3 className="font-bold text-m-t line-clamp-2 leading-snug group-hover:text-orange transition-colors">{event.title}</h3>
      </div>
    </Link>
  );
}