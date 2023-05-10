'use client'

import { useMoralis } from 'react-moralis'
import Header from '@/components/Header'
import { useMemo } from 'react'
import { contractAddresses } from '../constants'

export default function Home() {
   const { isWeb3Enabled, chainId } = useMoralis()
   const supportedChains = useMemo(() => {
      return Object.keys(contractAddresses)
   }, [])

   return (
      <main className='px-4 py-5'>
         <Header />
         {isWeb3Enabled ? (
            <div className='py-3'>
               {supportedChains.includes(parseInt(chainId!).toString()) ? (
                  <div>
                     <span>ok</span>
                  </div>
               ) : (
                  <div>
                     <p>
                        Please switch to a supported chainId. The supported
                        Chain Ids are:
                     </p>
                     <p>
                        {supportedChains.map((chain) => (
                           <span key={chain}>{chain}</span>
                        ))}
                     </p>
                  </div>
               )}
            </div>
         ) : (
            <div className='py-3'>
               <span>Please connect to a Wallet</span>
            </div>
         )}
      </main>
   )
}
