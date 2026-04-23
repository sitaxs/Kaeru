"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isHomePage = pathname === "/";

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
      {/* Динамічний відступ: великий для головної сторінки, менший для всіх інших */}
      <div 
        className={`flex-1 w-full container mx-auto pb-24 md:pb-12 ${
          isHomePage ? "pt-24 md:pt-55" : "mt-[50px] md:mt-[100px]"
        }`}
      >
        {children}
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}