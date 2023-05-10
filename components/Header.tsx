'use client'

import { ConnectButton } from 'web3uikit'

function Header() {
   return (
      <nav className='sm:flex items-center justify-between border-b-2 pb-5'>
         <h1 className='text-2xl font-semibold mb-4 sm:mb-0 ml-4 sm:ml-0'>
            Decentralized Raffle
         </h1>
         <ConnectButton moralisAuth={false} />
      </nav>
   )
}

export default Header
