import type { PrayerInfo } from '../types';
import { Check } from 'lucide-react';

interface PrayerCardProps {
  prayer: PrayerInfo;
  isCurrent: boolean;
}

export function PrayerCard({ prayer, isCurrent }: PrayerCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`bg-white rounded-xl p-4 flex items-center justify-between transition-all duration-300 ${
        isCurrent 
          ? 'ring-2 ring-[#1E3A5F] shadow-lg transform scale-[1.02]' 
          : 'shadow-sm border border-gray-100'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isCurrent ? 'bg-[#1E3A5F]' : 'bg-[#F5F5F5]'
        }`}>
          {prayer.isPassed ? (
            <Check className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-green-500'}`} />
          ) : isCurrent ? (
            <span className="text-white font-semibold text-sm">NOW</span>
          ) : (
            <span className="text-[#1E3A5F] font-semibold text-sm">
              {formatTime(prayer.time).split(':')[0]}
            </span>
          )}
        </div>
        <div>
          <h3 className={`font-semibold ${isCurrent ? 'text-[#1E3A5F]' : 'text-gray-800'}`}>
            {prayer.name}
          </h3>
          <p className="text-xs text-gray-500 font-arabic">{prayer.arabicName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-medium ${prayer.isPassed ? 'text-green-500' : 'text-gray-800'}`}>
          {formatTime(prayer.time)}
        </p>
      </div>
    </div>
  );
}