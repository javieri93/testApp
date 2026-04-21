import { useState, useEffect, useMemo, useCallback } from 'react';
import * as adhan from 'adhan';
import type { Coordinates, PrayerTimes, PrayerInfo, CalculationMethod, Madhab } from '../types';

const prayerNames = [
  { key: 'fajr', name: 'Fajr', arabicName: 'فجر' },
  { key: 'sunrise', name: 'Sunrise', arabicName: 'شروق' },
  { key: 'dhuhr', name: 'Dhuhr', arabicName: 'ظهر' },
  { key: 'asr', name: 'Asr', arabicName: 'عصر' },
  { key: 'maghrib', name: 'Maghrib', arabicName: 'مغرب' },
  { key: 'isha', name: 'Isha', arabicName: 'عشاء' },
];

function getCalculationMethod(method: CalculationMethod): adhan.CalculationParameters {
  const methods: Record<CalculationMethod, () => adhan.CalculationParameters> = {
    MWL: adhan.CalculationMethod.MuslimWorldLeague,
    ISNA: adhan.CalculationMethod.NorthAmerica,
    Egypt: adhan.CalculationMethod.Egyptian,
    Makkah: adhan.CalculationMethod.UmmAlQura,
    Karachi: adhan.CalculationMethod.Karachi,
    Tehran: adhan.CalculationMethod.Tehran,
  };
  return methods[method]();
}

function getMadhab(madhab: Madhab): 'shafi' | 'hanafi' {
  return madhab === 'Shafi' ? 'shafi' : 'hanafi';
}

export function usePrayerTimes(
  coordinates: Coordinates | null,
  method: CalculationMethod,
  madhab: Madhab
) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerInfo | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerInfo | null>(null);
  const [countdown, setCountdown] = useState<number>(0);

  const calculateTimes = useCallback(() => {
    if (!coordinates) return;

    try {
      const params = getCalculationMethod(method);
      params.madhab = getMadhab(madhab);

      const date = new Date();
      const prayerTimesObj = new adhan.PrayerTimes(coordinates, date, params);

      setPrayerTimes({
        fajr: prayerTimesObj.fajr,
        sunrise: prayerTimesObj.sunrise,
        dhuhr: prayerTimesObj.dhuhr,
        asr: prayerTimesObj.asr,
        maghrib: prayerTimesObj.maghrib,
        isha: prayerTimesObj.isha,
      });
    } catch (e) {
      console.error('Failed to calculate prayer times:', e);
    }
  }, [coordinates, method, madhab]);

  useEffect(() => {
    calculateTimes();
  }, [calculateTimes]);

  useEffect(() => {
    if (!prayerTimes) return;

    const now = new Date();
    const times: PrayerInfo[] = prayerNames
      .filter(p => p.key !== 'sunrise')
      .map(p => ({
        ...p,
        time: prayerTimes[p.key as keyof PrayerTimes] as Date,
        isPassed: (prayerTimes[p.key as keyof PrayerTimes] as Date) < now,
      }));

    const current = times.find(p => !p.isPassed);
    const nextIndex = times.findIndex(p => !p.isPassed);
    const next = nextIndex < times.length - 1 ? times[nextIndex + 1] : null;

    setCurrentPrayer(current || times[times.length - 1]);
    setNextPrayer(next);

    const updateCountdown = () => {
      if (next) {
        const diff = next.time.getTime() - Date.now();
        setCountdown(Math.max(0, Math.floor(diff / 1000)));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const prayerList = useMemo((): PrayerInfo[] => {
    if (!prayerTimes) return [];
    
    const now = new Date();
    return prayerNames
      .filter(p => p.key !== 'sunrise')
      .map(p => ({
        ...p,
        time: prayerTimes[p.key as keyof PrayerTimes] as Date,
        isPassed: (prayerTimes[p.key as keyof PrayerTimes] as Date) < now,
      }));
  }, [prayerTimes]);

  return {
    prayerTimes,
    prayerList,
    currentPrayer,
    nextPrayer,
    countdown,
  };
}