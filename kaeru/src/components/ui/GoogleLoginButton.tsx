"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  // Функція для розшифровки захищеного токена, який повертає Google
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  };

  const handleCallbackResponse = async (response: any) => {
    const userObject = parseJwt(response.credential);
    if (!userObject) return;
    
    // Формуємо об'єкт юзера з даних Google
    const googleUser = {
      id: userObject.sub, // Унікальний ID Google
      name: userObject.name,
      email: userObject.email,
      image: userObject.picture,
    };

    try {
      // 1. Шукаємо юзера в базі
      const res = await fetch(`http://localhost:3001/users?email=${googleUser.email}`);
      const existingUsers = await res.json();

      let finalUser;

      if (existingUsers.length > 0) {
        // Юзер є - просто логінимо
        finalUser = existingUsers[0];
      } else {
        // Юзера немає - створюємо в базі
        const createRes = await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...googleUser, password: "" }),
        });
        finalUser = await createRes.json();
      }

      // 2. Записуємо в пам'ять браузера
      localStorage.setItem("kaeru_user", JSON.stringify(finalUser));
      
      // 3. Повертаємо на головну сторінку
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Помилка при вході через Google:", error);
    }
  };

  useEffect(() => {
    // Перевіряємо, чи завантажився скрипт Google
    // @ts-ignore
    if (typeof google !== "undefined" && google.accounts) {
      // @ts-ignore
      google.accounts.id.initialize({
        // ТУТ МАЄ БУТИ ВАШ CLIENT ID З GOOGLE CLOUD CONSOLE
        client_id: "ВАШ_CLIENT_ID.apps.googleusercontent.com", 
        callback: handleCallbackResponse,
      });

      // Малюємо кнопку
      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", width: "100%", shape: "pill", text: "continue_with" }
      );
    }
  }, []);

  return <div id="googleSignInDiv" className="w-full flex justify-center"></div>;
}