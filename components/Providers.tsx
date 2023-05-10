'use client'

import { MoralisProvider } from 'react-moralis'

function Providers({ children }: { children: React.ReactNode }) {
   return (
      <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
   )
}

export default Providers
