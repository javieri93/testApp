import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';

interface HeaderProps {
  city?: string;
  country?: string;
}

export function Header({ city, country }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  
  const locationText = city && country ? `${city}, ${country}` : city;
  
  return (
    <header className="bg-[#1E3A5F] text-white py-6 px-4">
      <div className="max-w-lg mx-auto flex items-center justify-center gap-3">
        <Moon className="w-8 h-8 text-[#D4A574]" />
        <h1 className="text-2xl font-semibold tracking-wide">Waktu Sholat</h1>
      </div>
      {locationText && (
        <p className="text-center text-white/80 mt-2 text-sm">
          {locationText}
        </p>
      )}
      <p className="text-center text-white/90 mt-3 text-2xl font-mono">
        {timeString}
      </p>
    </header>
  );
}