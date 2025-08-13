import { LinkaLogoSpinner } from '@/components/ui/linka-logo';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <LinkaLogoSpinner size="xl" />
        <p className="text-slate-600 text-lg font-medium">Loading short-term rentals...</p>
      </div>
    </div>
  );
}
