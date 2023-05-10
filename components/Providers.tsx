'use client'

import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'

function Providers({ children }: { children: React.ReactNode }) {
   return (
      <MoralisProvider initializeOnMount={false}>
         <NotificationProvider>{children}</NotificationProvider>
      </MoralisProvider>
   )
}

export default Providers
