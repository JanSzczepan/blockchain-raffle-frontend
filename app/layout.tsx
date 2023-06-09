import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

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
            <Providers>
               <div className='container mx-auto'>{children}</div>
            </Providers>
         </body>
      </html>
   )
}
