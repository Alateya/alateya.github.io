import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import YandexMetrika from '@/components/YandexMetrika'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

// ID Яндекс.Метрики
const YM_COUNTER_ID = '101044258';

export const metadata: Metadata = {
  title: 'Портфолио | EIS специалист',
  description: 'Портфолио EIS специалиста с проектами по анализу данных, машинному обучению и системной интеграции',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Добавляем метатеги для поисковых систем */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="EIS, аналитика данных, портфолио, машинное обучение, прогнозирование, анализ данных" />
        <meta name="author" content="EIS Portfolio" />
      </head>
      <body className={inter.className}>
        {/* Добавляем компонент Яндекс.Метрики */}
        <YandexMetrika counterId={YM_COUNTER_ID} />
        {children}
      </body>
    </html>
  )
} 