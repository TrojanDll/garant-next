'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: any[]) => void;
  }
}

export default function TrackPageView({ ymId }: { ymId: number }) {
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