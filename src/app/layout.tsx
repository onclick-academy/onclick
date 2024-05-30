import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Hero/Header'
import './globals.css'
import './index.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OnClick Academy',
  description: 'OnClick Academy',
  icons: {
    icon: '/favicon.png'
  }
}

// Move viewport configuration to generate-viewport export
export const generateViewport = () => ({
  width: 'device-width',
  initialScale: 1
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-hero bg-fixed h-auto`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
