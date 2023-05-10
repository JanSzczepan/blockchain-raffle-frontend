import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'Smart Contract Raffle',
   description: 'Decentralized lottery',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang='en'>
         <body className={inter.className}>
            <div className='container mx-auto'>{children}</div>
         </body>
      </html>
   )
}
