'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Компонент для подключения Google Analytics
export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  // Устанавливаем GA только после загрузки страницы
  useEffect(() => {
    // Создаем глобальную функцию gtag, которую использует GA
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      // @ts-ignore
      window.dataLayer.push(arguments);
    }
    
    // Инициализируем GA с идентификатором
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: window.location.pathname,
      // Дополнительные настройки для улучшения приватности
      anonymize_ip: true,
      allow_display_features: false,
    });
  }, [measurementId]);

  return (
    <>
      {/* Google Analytics скрипт */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      
      {/* Инициализация Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            allow_display_features: false,
          });
        `}
      </Script>
    </>
  );
}

// Для TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
} 