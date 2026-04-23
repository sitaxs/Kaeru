"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return (
      <>
        <div className="flex-1 w-full relative pb-20 md:pb-0">
          {children}
        </div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Прибрали динамічні pt/mt. Тепер контент просто йде за хедером */}
      <div className="flex-1 w-full container mx-auto pb-24 md:pb-12 px-4 sm:px-6">
        {children}
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}