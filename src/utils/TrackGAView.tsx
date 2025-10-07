'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Suspense } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function TrackGAViewInner({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');
      window.gtag('config', gaId, { page_path: url });
    }
  }, [pathname, searchParams, gaId]);

  return null;
}

export default function TrackGAView({ gaId }: { gaId: string }) {
  return (
    <Suspense fallback={null}>
      <TrackGAViewInner gaId={gaId} />
    </Suspense>
  );
}
