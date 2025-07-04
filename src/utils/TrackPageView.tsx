'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Suspense } from 'react';

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: any[]) => void;
  }
}

function TrackPageViewInner({ ymId }: { ymId: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ym) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      window.ym(ymId, 'hit', url);
    }
  }, [pathname, searchParams, ymId]);

  return null;
}

export default function TrackPageView({ ymId }: { ymId: number }) {
  return (
    <Suspense fallback={null}>
      <TrackPageViewInner ymId={ymId} />
    </Suspense>
  );
}