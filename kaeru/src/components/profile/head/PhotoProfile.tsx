"use client";
import { User } from "@/types/types";
import RoleSwitcher from "./RoleSwitcher";

interface PhotoProfileProps {
  user: User;
  role: "viewer" | "organizer";
  onSwitch: (role: "viewer" | "organizer") => void;
  isViewer: boolean;
}

export default function PhotoProfile({ user, role, onSwitch, isViewer }: PhotoProfileProps) {
  return (
    
    <div className="w-full md:w-[280px] shrink-0">
      <div className="flex flex-col md:items-start mb-6 md:sticky md:top-24">
        
        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 w-full mb-6">
          
          <div className="relative w-16 h-16 md:w-28 md:h-28  lg:w-20 lg:h-20 bg-orange rounded-full flex items-center justify-center text-white text-2xl md:text-5xl  lg:text-3xl font-medium uppercase shadow-md zz1 overflow-hidden shrink-0 md:mb-4">
            {user.photoUser ? (
              <img
                src={user.photoUser}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              user.name?.charAt(0)
            )}
          </div>

          <div className="flex flex-col min-w-0 text-left">
            <h1 className="text-lg md:text-1xl font-black text-m-t uppercase tracking-tight leading-tight mb-1 truncate" title={user.name}>
              {user.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="w-full">
          <RoleSwitcher current={role} onSwitch={onSwitch} />
        </div>
      </div>
    </div>
  );
}