"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchIcon from "../Icon/SearchIcon";
import RemindersIcon from "../Icon/RemindersIcon";
import FavoritesIcon from "../Icon/FavoritesIcon";
import AccountIcon from "../Icon/AccountIcon";

export default function BottomNav({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const pathname = usePathname() || "";
  const router = useRouter();

  const isSearchActive = pathname === "/" || pathname.startsWith("/category") || pathname.startsWith("/search");
  const isRemindersActive = pathname.startsWith("/reminders");
  const isFavoritesActive = pathname.startsWith("/favorites");
  const isAccountActive = pathname.startsWith("/profile");

  const itemClass = "flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 text-gray-d";
  const activeItemClass = "flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 text-orange";
  const iconSize = "w-[30px] h-[30px]";

  // Функція перевірки авторизації
  const handleProtectedNavigation = (e: React.MouseEvent, href: string) => {
    const user = localStorage.getItem("kaeru_user");

    if (!user) {
      e.preventDefault(); // Зупиняємо стандартний перехід за посиланням
      router.push("/login"); // Відправляємо на сторінку логіну (зміни шлях, якщо у тебе інший, наприклад /auth)
    }
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      onOpenSearch?.();
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-l z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center px-2 py-3">
        
        {/* Пошук - відкритий для всіх */}
        <Link href="/" onClick={handleSearchClick} className={isSearchActive ? activeItemClass : itemClass}>
          <SearchIcon isActive={isSearchActive} className={iconSize} />
          <span className="text-[10px] font-medium mt-0.5">Пошук</span>
        </Link>

        {/* Нагадування - ЗАХИЩЕНЕ */}
        <Link 
          href="/reminders" 
          onClick={(e) => handleProtectedNavigation(e, "/reminders")}
          className={isRemindersActive ? activeItemClass : itemClass}
        >
          <RemindersIcon isActive={isRemindersActive} className={iconSize} />
          <span className="text-[10px] font-medium mt-0.5">Нагадування</span>
        </Link>

        {/* Вподобайки - ЗАХИЩЕНЕ */}
        <Link 
          href="/favorites" 
          onClick={(e) => handleProtectedNavigation(e, "/favorites")}
          className={isFavoritesActive ? activeItemClass : itemClass}
        >
          <FavoritesIcon isActive={isFavoritesActive} className={iconSize} />
          <span className="text-[10px] font-medium mt-0.5">Вподобайки</span>
        </Link>

        {/* Акаунт - логіка переходу зазвичай веде на профіль або логін автоматично */}
        <Link href="/profile" className={isAccountActive ? activeItemClass : itemClass}>
          <AccountIcon isActive={isAccountActive} className={iconSize} />
          <span className="text-[10px] font-medium mt-0.5">Акаунт</span>
        </Link>

      </div>
    </nav>
  );
}