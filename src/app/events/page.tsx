import CategoryNav from "@/components/ui/CategoryNav";
import SubCategoryPicker from "@/components/event/SubCategoryPicker";
import EventsFeed from "@/components/event/EventsFeed";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background pt-6 pb-10">
      <CategoryNav />
      
      {/* Лінія-розділювач (Пункт 1) */}
      <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8">
        <div className="h-[1px] bg-gray-l/50 w-full mt-2 mb-2"></div>
      </div>
      
      <SubCategoryPicker />
      <EventsFeed />
    </main>
  );
}