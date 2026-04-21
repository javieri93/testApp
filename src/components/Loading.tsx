export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-[#D4A574] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-500">Memuat waktu salat...</p>
    </div>
  );
}