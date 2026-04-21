import { RefreshCw, AlertCircle } from 'lucide-react';

interface LocationStatusProps {
  hasLocation: boolean;
  loading: boolean;
  error: string | null;
  onRequestLocation: () => void;
}

export function LocationStatus({ hasLocation, loading, error, onRequestLocation }: LocationStatusProps) {
  if (hasLocation) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-amber-800 text-sm">
          {error || 'Izinkan akses lokasi untuk melihat waktu salat berdasarkan posisi Anda'}
        </p>
      </div>
      <button
        onClick={onRequestLocation}
        disabled={loading}
        className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#2C5282] transition-colors disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Memuat...' : 'Aktifkan'}
      </button>
    </div>
  );
}