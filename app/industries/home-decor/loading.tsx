import { LinkaLogoSpinner } from '@/components/ui/linka-logo';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <LinkaLogoSpinner size="xl" />
    </div>
  );
}
