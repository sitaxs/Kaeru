'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../../lib/utils';
import axios from 'axios'; // Підключено axios

// Додано пропс fill зі значенням за замовчуванням "transparent"
export const LikeButton = ({ event, className, fill, stroke, strokeWidth  = "transparent" }: { event: any, className?: string, fill?: string, stroke?: string, strokeWidth?: string}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [dbRecordId, setDbRecordId] = useState<string | null>(null);
    const router = useRouter();

    const actualEventId = String(event.originalEventId || event.id);

    const getUser = () => {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem("kaeru_user");
        return stored ? JSON.parse(stored) : null;
    };

    useEffect(() => {
        const checkFavorite = async () => {
            try {
                const user = getUser();
                if (!user || !actualEventId) return;
                
                const userId = String(user.id);
                
                // Використовуємо axios.get замість fetch
                const { data } = await axios.get(`http://localhost:3001/favorites?userId=${userId}&originalEventId=${actualEventId}`);
                
                if (data.length > 0) {
                    setIsLiked(true);
                    setDbRecordId(data[0].id);
                } else {
                    setIsLiked(false);
                    setDbRecordId(null);
                }
            } catch (error) {
                setIsLiked(false);
            }
        };
        checkFavorite();
    }, [actualEventId]);

    const toggleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        const user = getUser();
        if (!user) {
            router.push('/login');
            return;
        }

        const userId = String(user.id);
        const previousState = isLiked;
        setIsLiked(!isLiked);

        try {
            if (previousState && dbRecordId) {
                // Використовуємо axios.delete замість fetch
                await axios.delete(`http://localhost:3001/favorites/${dbRecordId}`);
                setDbRecordId(null);
            } else {
                const { id: _old, ...eventData } = event;
                
                // Використовуємо axios.post замість fetch
                const { data: newData } = await axios.post(`http://localhost:3001/favorites`, {
                    ...eventData,
                    originalEventId: actualEventId,
                    userId: userId
                });

                setDbRecordId(newData.id);
            }
            
            window.dispatchEvent(new Event('favoritesChanged'));

        } catch (error) {
            console.error("Помилка:", error);
            setIsLiked(previousState);
        }
    };

    return (
        <button
          onClick={toggleLike}
          className={cn(
            "transition-all duration-200 hover:scale-110 active:scale-90 outline-none flex items-center justify-center",
            className
          )}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 33 31" 
            xmlns="http://www.w3.org/2000/svg"
            stroke={isLiked ? "#C1DF43" : stroke}
            fill={isLiked ? "#C1DF43" : fill} 
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          >
            <path d="M15.0227 0.501124C15.0227 0.501124 18.7363 0.323343 18.5418 4.41241C18.5418 4.41241 17.1503 7.82536 17.9224 12.2538C17.9224 12.2538 19.0057 19.6454 22.0999 19.3437C22.0999 19.3437 23.4164 19.57 25.5801 15.5159C25.5801 15.5159 26.2384 13.3017 26.1606 11.0147C26.1606 11.0147 27.0883 7.71222 30.4936 9.17761C30.4936 9.17761 33.8988 10.3036 31.1519 14.1664C31.1519 14.1664 28.6771 15.0284 26.5884 18.1423C26.5884 18.1423 24.1775 20.8064 23.622 25.7575C23.622 25.7575 23.1442 29.5475 18.889 30.1105C18.889 30.1105 15.2532 31.2365 12.6229 26.509C12.6229 26.509 10.8814 24.0335 6.58732 23.3951C6.58732 23.3951 5.27077 22.7944 2.40991 23.1338C2.40991 23.1338 0.0101132 22.7594 0.590618 20.0198C0.590618 20.0198 1.75163 17.6925 4.42084 19.2683C4.42084 19.2683 6.62621 21.6307 8.79268 22.0832C8.79268 22.0832 9.99258 23.0584 12.0813 22.6839C12.0813 22.6839 12.5451 20.0576 8.52326 17.019C8.52326 17.019 7.74833 16.1193 5.89294 15.6318C5.89294 15.6318 2.75987 15.1442 3.57092 11.206C3.57092 11.206 5.89294 7.94119 8.98711 10.8693C8.98711 10.8693 9.68427 11.8067 9.79815 12.8572C9.79815 12.8572 11.4619 18.7861 14.8672 19.6858C14.8672 19.6858 16.8392 16.984 14.6727 10.643C14.6727 10.643 13.6519 8.61054 11.5 5.49999C11.5 5.49999 9.72038 0.67891 15.0199 0.503818L15.0227 0.501124Z" />
          </svg>
        </button>
    );
};