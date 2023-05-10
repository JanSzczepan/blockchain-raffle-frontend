'use client'

import { useMoralis } from 'react-moralis'
import Header from '@/components/Header'
import { useMemo } from 'react'
import { contractAddresses } from '../constants'
import RaffleEntrance from '@/components/RaffleEntrance'

export default function Home() {
   const { isWeb3Enabled, chainId } = useMoralis()
   const supportedChains = useMemo(() => {
      return Object.keys(contractAddresses)
   }, [])

   return (
      <main className='px-4 py-5'>
         <Header />
         {isWeb3Enabled ? (
            <div className='py-4'>
               {supportedChains.includes(parseInt(chainId!).toString()) ? (
                  <RaffleEntrance />
               ) : (
                  <div>
                     <p>
                        Please switch to a supported chainId. The supported
                        Chain Ids are:
                     </p>
                     <p>
                        {supportedChains.map((chain, idx, arr) => (
                           <span key={chain}>
                              {chain}
                              {idx < arr.length - 1 && ', '}
                           </span>
                        ))}
                     </p>
                  </div>
               )}
            </div>
         ) : (
            <div className='py-4'>
               <span>Please connect to a Wallet</span>
            </div>
         )}
      </main>
   )
}
