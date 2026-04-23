import CategoryNav from "@/components/ui/CategoryNav";
import EventCard from "@/components/ui/EventCard";
import { Event } from "@/types/types";

import { eventApi, organizerApi } from "@/lib/api";
import Card from "@/components/ui/Card";
import EventCarousel from "@/components/ui/EventCarousel";

export default async function Home() {
  const [events, recommendedOrganizers] = await Promise.all([
    eventApi.getAll(),
    organizerApi.getRecommended()
  ]);

  const freeEvents = events.filter(e => e.paymentType === "free");

  return (
    <main>
{/* <div className=" w-full h-100 md: pt-2 bg-blue-300"></div> */}
  
  
 
    <div className="">
      <section>
      <EventCarousel 
        events={events} 
      />
        {/* Якщо івентів немає */}
        {events.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-l rounded-3xl">
            <p className="text-gray-d font-medium">Наразі немає активних подій...</p>
          </div>
        )}
      </section>

      <section className=" pt-6 md:pt-4">  <CategoryNav/></section>

     
  <section>
      <EventCarousel 
        events={events} 
      />
        {/* Якщо івентів немає */}
        {events.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-l rounded-3xl">
            <p className="text-gray-d font-medium">Наразі немає активних подій...</p>
          </div>
        )}
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
    </main>
  );
}