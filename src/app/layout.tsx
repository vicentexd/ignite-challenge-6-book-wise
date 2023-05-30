import { Providers } from '@/components/Providers'
import './globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunitoFont = Nunito_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Book Wise',
  description: 'Seu catálogo de livros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${nunitoFont.className} overflow-x-hidden flex items-center justify-center max-h-screen max-w-screen  bg-gray-800 m-5`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
