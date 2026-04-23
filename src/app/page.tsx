import CategoryNav from "@/components/ui/CategoryNav";
import EventCard from "@/components/ui/EventCard";
import Logo from "@/components/ui/Logo";
import { Event } from "@/types/types";
import Image from "next/image";
async function getEvents() {
  try {
    // Змінили адресу на 5000/api
    const res = await fetch('http://localhost:3001/events', { 
      cache: 'no-store' 
    });
    
    if (!res.ok) {
      console.error("Помилка сервера:", res.status);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Не вдалося підключитися до бекенду:", error);
    return []; 
  }
}



export default async function Home() {
  const events: Event[] = await getEvents();

  return (
    
    <div className="space-y-10 ">
      
      {/* 1. Блок з категоріями (теж карусель для мобільних) */}
      

      {/* 2. Карусель Івентів */}
      <section>
        <div className="flex justify-between items-end mb-6">
        </div>

        {/* Контейнер каруселі. hide-scrollbar приховає смугу, а snap-x зробить скрол плавним */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {events.map((event) => (
            <div key={event.id} className="snap-start shrink-0">
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {/* Якщо івентів немає */}
        {events.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-l rounded-3xl">
            <p className="text-gray-d font-medium">Наразі немає активних подій...</p>
          </div>
        )}
      </section>

      <section>
       <CategoryNav/>
      </section>

      {/* 3. Ще одна секція (наприклад, для безкоштовних) */}
      <section className="pt-8 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-black text-m-t mb-6">Безкоштовно</h2>
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {events.filter(e => e.paymentType === "free").map((event) => (
            <div key={event.id} className="snap-start shrink-0">
              <EventCard {...event} />
             
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}