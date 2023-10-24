import { SocketProvider } from '@/providers/socket-provider'
import { CinemaProvider } from '@/providers/cinema-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blindtest',
  description: 'Blindtest generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
      <SocketProvider>
        <CinemaProvider>
          {children}
        </CinemaProvider>
      </SocketProvider>
      </body>
    </html>
  )
}
