"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import { authApi } from "@/lib/api"; // Імпортуємо наш API

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const newUser = await authApi.register({ name, email, password });
      
      localStorage.setItem("userId", newUser.id);
      localStorage.setItem("kaeru_user", JSON.stringify(newUser));
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Помилка з'єднання з сервером.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100dvh] max-w-md mx-auto px-4 py-12">
      
      <Link href="/" className="fixed top-6 left-6 md:top-10 md:left-10 w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-m-t rounded-full transition-colors z-50 shadow-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </Link>

      <div className="text-center mb-8 w-full mt-10 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-black text-m-t mb-2">Створити акаунт</h1>
        <p className="text-gray-d text-sm md:text-base">Приєднуйтесь до Kaeru, щоб знаходити найкращі події</p>
      </div>

      <div className="w-full bg-white p-6 md:p-8 rounded-[32px] border border-gray-l shadow-sm">
        
        <div className="flex flex-col gap-3 mb-6">
          <div className="w-full mb-1">
             <GoogleLoginButton />
          </div>
          <div className="flex gap-3">
            <button className="flex-1 h-10 flex items-center justify-center gap-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-bold text-sm">Apple</button>
            <button className="flex-1 h-10 flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition-colors font-bold text-sm">Facebook</button>
          </div>
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-gray-l"></div>
          <span className="flex-shrink-0 mx-4 text-gray-d text-[10px] font-bold uppercase tracking-widest">Або через пошту</span>
          <div className="flex-grow border-t border-gray-l"></div>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input type="text" placeholder="Як до вас звертатися?" value={name} onChange={e => setName(e.target.value)} className="w-full h-14 px-5 bg-transparent border border-gray-l rounded-2xl outline-none focus:border-orange text-m-t" required />
          <input type="email" placeholder="Email адреса" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-14 px-5 bg-transparent border border-gray-l rounded-2xl outline-none focus:border-orange text-m-t" required />
          
          <div className="relative w-full">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Придумайте пароль" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full h-14 px-5 pr-12 bg-transparent border border-gray-l rounded-2xl outline-none focus:border-orange text-m-t" 
              required 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange transition-colors"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          {/* ПОМИЛКА ТЕПЕР ТУТ - ПІД ПАРОЛЕМ */}
          {error && <p className="text-red-500 text-sm text-center font-medium mt-1">{error}</p>}

          <button type="submit" className="w-full h-14 mt-4 bg-orange text-white font-bold rounded-2xl hover:opacity-90 transition-opacity text-lg">Зареєструватися</button>
          
          <p className="text-[11px] text-gray-d text-center mt-2 leading-tight">
            Реєструючись, ви погоджуєтеся з нашими <Link href="#" className="underline hover:text-orange">Умовами використання</Link> та <Link href="#" className="underline hover:text-orange">Політикою конфіденційності</Link>.
          </p>
        </form>
      </div>

      <div className="mt-8 text-center pb-6">
        <p className="text-m-t text-sm">Вже є акаунт? <Link href="/login" className="text-orange font-bold hover:underline">Увійти</Link></p>
      </div>
    </div>
  );
}