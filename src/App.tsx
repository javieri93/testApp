import { useEffect, useCallback } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { useGeolocation } from './hooks/useGeolocation';
import { usePrayerTimes } from './hooks/usePrayerTimes';
import { Header } from './components/Header';
import { PrayerCard } from './components/PrayerCard';
import { CountdownTimer } from './components/CountdownTimer';
import { Loading } from './components/Loading';
import { LocationStatus } from './components/LocationStatus';
import { Settings } from './components/Settings';
import type { CalculationMethod, Madhab } from './types';

function PrayerApp() {
  const { settings, dispatch } = useAppContext();
  const { coordinates, loading, error, requestLocation } = useGeolocation();
  
  const { prayerList, currentPrayer, nextPrayer, countdown } = usePrayerTimes(
    settings.location?.coordinates || coordinates || null,
    settings.method,
    settings.madhab
  );

  useEffect(() => {
    if (coordinates && settings.useLocation) {
      dispatch({ 
        type: 'SET_LOCATION', 
        payload: { 
          coordinates,
          city: 'Lokasi Saat Ini',
          country: ''
        } 
      });
    }
  }, [coordinates, settings.useLocation, dispatch]);

  const handleRequestLocation = useCallback(() => {
    requestLocation();
  }, [requestLocation]);

  const handleMethodChange = useCallback((method: CalculationMethod) => {
    dispatch({ type: 'SET_METHOD', payload: method });
  }, [dispatch]);

  const handleMadhabChange = useCallback((madhab: Madhab) => {
    dispatch({ type: 'SET_MADHAB', payload: madhab });
  }, [dispatch]);

  const hasLocation = settings.location?.coordinates || coordinates;
  const nextPrayerTime = nextPrayer 
    ? nextPrayer.time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header 
        city={settings.location?.city} 
        country={settings.location?.country} 
      />

      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        <LocationStatus
          hasLocation={!!hasLocation}
          loading={loading}
          error={error}
          onRequestLocation={handleRequestLocation}
        />

        {!hasLocation && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              Klik tombol di bawah untuk mengaktifkan lokasi
            </p>
            <button
              onClick={handleRequestLocation}
              className="bg-[#1E3A5F] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2C5282] transition-colors"
            >
              Aktifkan Lokasi
            </button>
          </div>
        )}

        {hasLocation && prayerList.length > 0 && (
          <>
            {nextPrayer && countdown > 0 && (
              <div className="mb-6">
                <CountdownTimer
                  nextPrayerName={nextPrayer.name}
                  nextPrayerTime={nextPrayerTime}
                  countdown={countdown}
                />
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Jadwal Sholat Hari Ini
              </h3>
              {prayerList.map((prayer) => (
                <PrayerCard
                  key={prayer.name}
                  prayer={prayer}
                  isCurrent={currentPrayer?.name === prayer.name}
                />
              ))}
            </div>
          </>
        )}

        {loading && <Loading />}
      </main>

      <Settings
        method={settings.method}
        madhab={settings.madhab}
        onMethodChange={handleMethodChange}
        onMadhabChange={handleMadhabChange}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <PrayerApp />
    </AppProvider>
  );
}

export default App;