import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

// ID вашего Google Analytics (заменить на реальный после создания аккаунта)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const metadata: Metadata = {
  title: 'Портфолио | Data Science специалист',
  description: 'Портфолио Data Science специалиста с проектами по анализу данных, машинному обучению и системной интеграции',
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
        <meta name="keywords" content="data science, аналитика данных, портфолио, машинное обучение, прогнозирование, анализ данных" />
        <meta name="author" content="EIS Portfolio" />
      </head>
      <body className={inter.className}>
        {/* Добавляем компонент Google Analytics */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        {children}
      </body>
    </html>
  )
} 