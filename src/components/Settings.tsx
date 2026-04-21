import { useState } from 'react';
import { Settings as SettingsIcon, X, ChevronDown } from 'lucide-react';
import type { CalculationMethod, Madhab } from '../types';

interface SettingsProps {
  method: CalculationMethod;
  madhab: Madhab;
  onMethodChange: (method: CalculationMethod) => void;
  onMadhabChange: (madhab: Madhab) => void;
}

const methods: { value: CalculationMethod; label: string }[] = [
  { value: 'MWL', label: 'Muslim World League' },
  { value: 'ISNA', label: 'Islamic Society of North America' },
  { value: 'Egypt', label: 'Egyptian General Authority' },
  { value: 'Makkah', label: 'Umm Al-Qura University' },
  { value: 'Karachi', label: 'Karachi' },
  { value: 'Tehran', label: 'Tehran' },
];

const madhabs: { value: Madhab; label: string }[] = [
  { value: 'Shafi', label: 'Shafi\'i' },
  { value: 'Hanafi', label: 'Hanafi' },
];

export function Settings({ method, madhab, onMethodChange, onMadhabChange }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
      >
        <SettingsIcon className="w-6 h-6 text-[#1E3A5F]" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Pengaturan</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Perhitungan
                </label>
                <div className="relative">
                  <select
                    value={method}
                    onChange={(e) => onMethodChange(e.target.value as CalculationMethod)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                  >
                    {methods.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mazhab
                </label>
                <div className="relative">
                  <select
                    value={madhab}
                    onChange={(e) => onMadhabChange(e.target.value as Madhab)}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
                  >
                    {madhabs.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Mempengaruhi waktu Ashar
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}