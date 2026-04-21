import type { PrayerInfo } from '../types';
import { Check, Clock } from 'lucide-react';

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

  const getStatusLabel = () => {
    if (prayer.isPassed) return null;
    if (prayer.isNow) return 'NOW';
    const remaining = prayer.remainingMinutes;
    if (remaining <= 30) return `${remaining}m`;
    const hours = Math.floor(remaining / 60);
    const mins = remaining % 60;
    return `${hours}h ${mins}m`;
  };

  const statusLabel = getStatusLabel();

  return (
    <div
      className={`bg-white rounded-xl p-4 flex items-center justify-between transition-all duration-300 ${
        prayer.isNow 
          ? 'ring-2 ring-green-500 shadow-lg transform scale-[1.02]' 
          : isCurrent 
          ? 'ring-2 ring-[#1E3A5F] shadow-lg transform scale-[1.02]' 
          : 'shadow-sm border border-gray-100'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          prayer.isNow ? 'bg-green-500' : isCurrent ? 'bg-[#1E3A5F]' : 'bg-[#F5F5F5]'
        }`}>
          {prayer.isPassed ? (
            <Check className={`w-6 h-6 ${prayer.isNow || isCurrent ? 'text-white' : 'text-green-500'}`} />
          ) : statusLabel ? (
            <span className={`text-white font-semibold text-xs ${statusLabel === 'NOW' ? 'text-sm' : 'text-xs'}`}>
              {statusLabel}
            </span>
          ) : (
            <span className="text-[#1E3A5F] font-semibold text-sm">
              {formatTime(prayer.time).split(':')[0]}
            </span>
          )}
        </div>
        <div>
          <h3 className={`font-semibold ${prayer.isNow ? 'text-green-500' : isCurrent ? 'text-[#1E3A5F]' : 'text-gray-800'}`}>
            {prayer.name}
          </h3>
          <p className="text-xs text-gray-500 font-arabic">{prayer.arabicName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-lg font-medium ${prayer.isPassed ? 'text-green-500' : 'text-gray-800'}`}>
          {formatTime(prayer.time)}
        </p>
        {statusLabel && !prayer.isNow && (
          <p className="text-xs text-gray-400 flex items-center justify-end gap-1">
            <Clock className="w-3 h-3" />
            <span>{statusLabel}</span>
          </p>
        )}
      </div>
    </div>
  );
}