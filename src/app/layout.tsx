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
      <body className={`${nunitoFont.className} bg-gray-800 p-5`}>
        {children}
      </body>
    </html>
  )
}
