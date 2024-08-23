import './styles/globals.css'

import { Kanit } from 'next/font/google'

const kanit = Kanit({
  subsets: ['latin'],
  display: 'swap',
  weight: '300',
  variable: '--font-kanit',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${kanit.variable} bg-purple-lightest`}>
      <body className='m-5'>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}