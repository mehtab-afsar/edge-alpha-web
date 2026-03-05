import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Edge Alpha — The Founder Evaluation Platform',
  description:
    'Your startup has a score. Edge Alpha quantifies founder quality into a Q-Score and deploys 9 AI agents to improve it.',
  openGraph: {
    title: 'Edge Alpha — One number. Every dimension.',
    description: 'One number. Every dimension. 9 agents that execute.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edge Alpha — The Founder Evaluation Platform',
    description: 'Your startup has a score. You just don\'t know it yet.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = 'manual'` }} />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
