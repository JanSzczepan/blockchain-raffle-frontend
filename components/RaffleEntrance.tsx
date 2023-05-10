import { abi, contractAddresses } from '@/constants'
import { BigNumber, ContractTransaction, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { Button, useNotification } from 'web3uikit'
import { AiOutlineBell } from 'react-icons/ai'

function RaffleEntrance() {
   const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
   const chainId = parseInt(chainIdHex!)
   const raffleAddress =
      chainId in contractAddresses
         ? contractAddresses[
              chainId as unknown as keyof typeof contractAddresses
           ][0]
         : undefined
   const dispatch = useNotification()

   const [entranceFee, setEntranceFee] = useState<string | undefined>(undefined)
   const [numberOfPlayers, setNumberOfPlayers] = useState<string | undefined>(
      undefined
   )
   const [recentWinner, setRecentWinner] = useState<string | undefined>(
      undefined
   )

   const { runContractFunction: getEntranceFee } = useWeb3Contract({
      abi: JSON.parse(abi),
      contractAddress: raffleAddress,
      functionName: 'getEntranceFee',
      params: {},
   })
   const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
      abi: JSON.parse(abi),
      contractAddress: raffleAddress,
      functionName: 'getNumberOfPlayers',
      params: {},
   })
   const { runContractFunction: getRecentWinner } = useWeb3Contract({
      abi: JSON.parse(abi),
      contractAddress: raffleAddress,
      functionName: 'getRecentWinner',
      params: {},
   })
   const { runContractFunction: enterRaffle } = useWeb3Contract({
      abi: JSON.parse(abi),
      contractAddress: raffleAddress,
      functionName: 'enterRaffle',
      params: {},
      msgValue: entranceFee,
   })

   const updateUI = async () => {
      const entranceFeeFromCall = (
         (await getEntranceFee()) as BigNumber
      ).toString()
      const numberOfPlayersFromCall = (
         (await getNumberOfPlayers()) as BigNumber
      ).toString()
      const recentWinnerFromCall = (await getRecentWinner()) as string

      setEntranceFee(entranceFeeFromCall)
      setNumberOfPlayers(numberOfPlayersFromCall)
      setRecentWinner(recentWinnerFromCall)
   }

   useEffect(() => {
      if (isWeb3Enabled) {
         updateUI()
      }
   }, [isWeb3Enabled, chainId])

   useEffect(() => {
      if (raffleAddress && window?.ethereum) {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const signer = provider.getSigner()
         const raffle = new ethers.Contract(raffleAddress, abi, signer)

         raffle.once('WinnerPicked', () => {
            updateUI()
         })
      }
   }, [])

   const handleNewNotification = () => {
      dispatch({
         type: 'info',
         message: 'Transaction Complete!',
         title: 'Transaction Notification',
         position: 'topR',
         icon: <AiOutlineBell />,
      })
   }

   const handleSuccess = async (tx: unknown) => {
      const transaction: ContractTransaction = tx as ContractTransaction

      try {
         await transaction.wait(1)
         updateUI()
         handleNewNotification()
      } catch (error) {
         console.error(error)
      }
   }

   const handleEnterRaffle = async () => {
      await enterRaffle({
         onSuccess: handleSuccess,
         onError: (error) => console.error(error),
      })
   }

   return (
      <div>
         <div className='flex items-center justify-between gap-2 mb-3'>
            <Button
               color='green'
               onClick={handleEnterRaffle}
               text='Enter'
               theme='colored'
            />
            <p>
               Entrance Fee:{' '}
               <span className='font-semibold whitespace-nowrap'>
                  {entranceFee &&
                     ethers.utils.formatUnits(entranceFee, 'ether')}{' '}
                  ETH
               </span>
            </p>
         </div>
         <div>
            <p>
               Current number of players:{' '}
               <span className='font-semibold'>{numberOfPlayers}</span>
            </p>
            <p>
               The most previous winner:{' '}
               <span className='font-semibold break-words'>{recentWinner}</span>
            </p>
         </div>
      </div>
   )
}

export default RaffleEntrance
