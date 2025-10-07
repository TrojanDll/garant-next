'use client';

import Script from 'next/script';
import React from 'react';

interface IProps {
  gaId: string;
}



export default function GoogleAnalytics({ gaId }: IProps) {
  if (process.env.NODE_ENV === 'development') return null;

  return (
    <>
      {/* Подключаем библиотеку gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      
      {/* Инициализация GA */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
};
