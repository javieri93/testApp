interface CountdownTimerProps {
  nextPrayerName: string;
  nextPrayerTime: string;
  countdown: number;
}

export function CountdownTimer({ nextPrayerName, nextPrayerTime, countdown }: CountdownTimerProps) {
  const formatCountdown = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2C5282] rounded-2xl p-6 text-white text-center shadow-xl">
      <p className="text-white/80 text-sm uppercase tracking-wider mb-2">
        Waktu menuju
      </p>
      <h2 className="text-3xl font-bold mb-1">{nextPrayerName}</h2>
      <p className="text-2xl text-[#D4A574] mb-4">{nextPrayerTime}</p>
      <div className="bg-white/10 rounded-xl py-4">
        <p className="text-5xl font-mono font-bold tracking-widest">
          {formatCountdown(countdown)}
        </p>
      </div>
    </div>
  );
}