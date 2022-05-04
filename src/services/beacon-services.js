import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { bytes2Char } from '@taquito/utils'
import { NODE_URL, NFT_CONTRACT, NULL_STR } from '../constants'

const Tezos = new TezosToolkit(NODE_URL);

//let globalWallet: BeaconWallet | undefined

let globalWallet = undefined

const getBeaconInstance = async () => {
  if (!globalWallet) {
    // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
    const wallet = new BeaconWallet({ name: 'TzButton' })

    // Setting the wallet as the wallet provider for Taquito.
    Tezos.setWalletProvider(wallet)
    globalWallet = wallet
  }

  return globalWallet
}

export const connectToBeacon = async () => {
  console.log('CONNECTING TO BEACON NOW')
  const wallet = await getBeaconInstance()

  if (await wallet.client.getActiveAccount()) {
    // Check if we already have an account connected, so we can skip requestPermissions.
    return wallet
  }

  // Send permission request to the connected wallet. This will either be the browser extension, or a wallet over the P2P network.
  await wallet.requestPermissions()

  return wallet
}

export const disconnectFromBeacon = async () => {
  const wallet = await getBeaconInstance()
  await wallet.clearActiveAccount()
}

export const getMyAddress = async () => {
  const wallet = await getBeaconInstance()
  const activeAccount = await wallet.client.getActiveAccount()
  return activeAccount?.address ?? ''
}

export const getMyNfts = async () => {
  const wallet = await getBeaconInstance()
  const activeAccount = await wallet.client.getActiveAccount()
  const activeAccountStr = activeAccount?.address ?? ''
  return activeAccountStr
}


export const getIpfsLink = async() => {
  const user_token_id = 0
  const contract = await Tezos.wallet.at(NFT_CONTRACT)
  const storage = await contract.storage()
  const all_token_metadata = await storage.token_metadata
  const user_token_metadata = await all_token_metadata.get(user_token_id)
  console.log(user_token_metadata)
  const user_token_ipfs_dict = await user_token_metadata.token_info.valueMap
  console.log(user_token_ipfs_dict) 
  const user_token_ipfs_as_bytes = await user_token_ipfs_dict.get(NULL_STR)
  console.log(user_token_ipfs_as_bytes)
  const ipfs_data = bytes2Char(user_token_ipfs_as_bytes)
  return ipfs_data
}

export const helloWorld = async() => {
  const hw = 'hello world'
  return hw
}



