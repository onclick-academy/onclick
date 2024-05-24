import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Hero/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OnClick Academy',
  description: 'OnClick Academy',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
      <Header />
      {children}
      </body>
    </html>
  )
}
