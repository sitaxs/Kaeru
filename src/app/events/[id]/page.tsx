import { eventApi } from "@/lib/api"; 
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LikeButton } from "@/components/Icon/LikeButton";
import ShareButton from "@/components/ui/ShareButton";
import ExpandableText from "@/components/ui/ExpandableText";
import EventReviews from "@/components/ui/EventReviews";
import SmallEventCard from "@/components/ui/SmallEventCard";

// ДИНАМІЧНІ МЕТА-ДАНІ (SEO)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = await eventApi.getById(id).catch(() => null);

  if (!event) return { title: "Не знайдено" };

  return {
    title: event.seo?.title || `${event.title} | Kaeru`,
    description: event.seo?.description || event.description,
    openGraph: {
      images: [event.seo?.ogImage || event.imageUrl],
    },
  };
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await eventApi.getById(id).catch(() => null);

  if (!event) return notFound();

  // Отримуємо всі івенти, щоб знайти "схожі"
  const allEvents = await eventApi.getAll().catch(() => []);
  const similarEvents = allEvents
    .filter((e: any) => e.category === event.category && e.id !== event.id)
    .slice(0, 4);

  const coverImage = event.bannerUrl || event.imageUrl;
  const timeDisplay = event.endsAt ? `${event.startsAt || event.date} - ${event.endsAt}` : event.startsAt || event.date;

  return (
    <div className="max-w-5xl mx-auto pb-32 md:pb-20 -mt-[140px] md:-mt-[160px]">
      
     <div className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] h-[350px] md:h-[550px] overflow-hidden bg-[#0a0a0a] mb-8 md:mb-12 flex items-center justify-center">
        
        {/* Розмитий фон (працює як підсвітка на ПК) */}
        <div className="absolute inset-0 opacity-60">
          <Image src={coverImage} alt="Background" fill className="object-cover blur-[50px] scale-125" priority />
        </div>
        
        {/* Основна картинка */}
        {/* ЗМІНА ТУТ: додав mx-auto, щоб контейнер центрувався */}
        <div className="relative w-full max-w-7xl h-full z-10 drop-shadow-2xl md:py-8 md:px-8 mx-auto">
          {/* ЗМІНА ТУТ: прибрав object-contain з div, бо він має бути тільки в Image */}
          <div className="relative w-full h-full md:rounded-[32px] overflow-hidden">
            <Image 
              src={coverImage} 
              alt={event.title} 
              fill 
              /* ЗМІНА ТУТ: додав object-center для ідеального центрування */
              className="object-cover md:object-contain object-center" 
              priority 
            />
          </div>
        </div>
      </div>

      {/* ЗБІЛЬШЕНА ЛАПКА */}
      <div className="flex justify-end items-center gap-4 mb-8 px-4 md:px-0">
        <ShareButton />
        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center cursor-pointer">
    {/* Передаємо об'єкт event, який ми отримали з API вище по коду */}
    <LikeButton event={event} className="w-10 h-10 md:w-12 md:h-12" />
</div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative px-4 md:px-0">
        <div className="flex-1 space-y-6 w-full">
          <h1 className="text-3xl md:text-5xl font-black text-m-t leading-tight uppercase tracking-tight">{event.title}</h1>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-d mt-0.5 shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <p className="font-bold text-m-t text-lg">{timeDisplay}</p>
            </div>
            
            <div className="flex items-start gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-d mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <div>
                <p className="font-bold text-m-t text-lg">Локація</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.locationDetail || event.location)}`} target="_blank" rel="noopener noreferrer" className="text-gray-d hover:text-orange transition-colors underline decoration-dashed underline-offset-4">
                  {event.locationDetail || event.location}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-[72px] left-0 w-full md:w-[320px] md:sticky md:top-32 md:bottom-auto md:left-auto p-4 md:p-6 border-t md:border border-gray-l bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:shadow-md md:rounded-3xl z-40 shrink-0 flex md:flex-col items-center md:items-start justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-d font-black uppercase md:hidden mb-0.5 tracking-widest">Вартість</span>
            <p className="text-2xl md:text-3xl font-black text-m-t">
              {event.paymentType === "free" && "Безкоштовно"}
              {event.paymentType === "donation" && <span className="text-orange">За донат</span>}
              {event.paymentType === "paid" && `${event.price} ₴`}
            </p>
          </div>
          <button className="w-auto px-8 md:px-0 md:w-full py-3.5 md:py-4 bg-orange text-white border-2 border-orange rounded-full font-bold text-[17px] tracking-wide transition-colors duration-200 hover:bg-white hover:text-orange active:bg-white active:text-orange outline-none">
            Зареєструватися
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 my-10 hidden md:block"></div>

      <div className="grid md:grid-cols-3 gap-10 mt-8 md:mt-0 px-4 md:px-0">
        <div className="md:col-span-2 space-y-10">
          <ExpandableText text={event.description || ""} />

          {event.speaker && (
            <section className="bg-gray-l/30 p-6 md:p-8 rounded-3xl border border-gray-l">
              <h2 className="text-xl font-bold mb-6 text-m-t">Організатор / Спікер</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <Image src={event.speaker.avatarUrl} alt={event.speaker.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-xl text-m-t">{event.speaker.name}</p>
                  <p className="text-orange font-medium mb-2">{event.speaker.role}</p>
                  <p className="text-gray-d text-sm leading-relaxed">{event.speaker.about}</p>
                </div>
              </div>
            </section>
          )}
        </div>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-l p-6 rounded-3xl">
             <h3 className="font-bold text-m-t mb-4">Теги події</h3>
             <div className="flex flex-wrap gap-2">
              {event.tags?.map((tag: string) => <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">{tag}</span>)}
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">{event.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ВІДГУКИ */}
      <div className="px-4 md:px-0">
        <EventReviews reviews={event.reviews || []} />
      </div>

      {/* СХОЖІ ІВЕНТИ */}
      {similarEvents.length > 0 && (
        <div className="mt-20 pt-10 border-t border-gray-200 px-4 md:px-0">
          <h2 className="text-2xl font-black uppercase text-m-t mb-8">Вам також може сподобатись</h2>
          <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x">
            {similarEvents.map((simEvent: any) => (
              <div key={simEvent.id} className="snap-start">
                <SmallEventCard event={simEvent} />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}