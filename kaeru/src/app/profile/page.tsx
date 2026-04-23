"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileEntry from "@/components/profile/ProfileEntry";

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("kaeru_user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    // Перевіряємо, чи є збережена роль, щоб одразу перекинути на потрібний URL
    const savedRole = localStorage.getItem("preferred_role");
    if (savedRole === "viewer") {
      router.push("/profile/tickets");
    } else if (savedRole === "organizer") {
      router.push("/profile/studio");
    } else {
      setIsLoading(false); // Показуємо вибір ролей (Hub), якщо нічого не збережено
    }
  }, [router]);

  const handleSelect = (r: "viewer" | "organizer", rem: boolean) => {
    if (rem) localStorage.setItem("preferred_role", r);
    router.push(r === "viewer" ? "/profile/tickets" : "/profile/studio");
  };

  if (isLoading) return null;

  return <ProfileEntry onSelect={handleSelect} />;
}