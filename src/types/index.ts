export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  coordinates: Coordinates;
  city?: string;
  country?: string;
}

export type CalculationMethod = 
  | 'MWL' 
  | 'ISNA' 
  | 'Egypt' 
  | 'Makkah' 
  | 'Karachi' 
  | 'Tehran';

export type Madhab = 'Shafi' | 'Hanafi';

export interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

export interface PrayerInfo {
  name: string;
  arabicName: string;
  time: Date;
  isPassed: boolean;
  isNow: boolean;
  remainingMinutes: number;
}

export interface AppSettings {
  location: Location | null;
  method: CalculationMethod;
  madhab: Madhab;
  useLocation: boolean;
}

export type AppAction =
  | { type: 'SET_LOCATION'; payload: Location }
  | { type: 'SET_METHOD'; payload: CalculationMethod }
  | { type: 'SET_MADHAB'; payload: Madhab }
  | { type: 'TOGGLE_USE_LOCATION' }
  | { type: 'RESET_LOCATION' };