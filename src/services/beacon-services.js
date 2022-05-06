import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { bytes2Char } from '@taquito/utils'
import { NODE_URL, NFT_CONTRACT, NULL_STR } from '../constants'

import $ from 'jquery'

const Tezos = new TezosToolkit(NODE_URL);

let globalWallet = undefined

const getBeaconInstance = async () => {
  if (!globalWallet) {
    // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
    const wallet = new BeaconWallet({ name: 'TXL Minter Connection' })

    // Setting the wallet as the wallet provider for Taquito.
    Tezos.setWalletProvider(wallet)
    globalWallet = wallet
  }
  return globalWallet
}

export const getBeaconWallet = async () => {
  console.log('GETTING EXISTING? BEACON WALLET')
  const wallet = await getBeaconInstance()
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

export const getContractStorage = async() => {
  const contract = await Tezos.wallet.at(NFT_CONTRACT)
  const storage = await contract.storage()
  return storage
}

export const getIpfsDict = async(address) => {
  const storage = await getContractStorage()
  console.log(address)
  const user_token_id = 0
  const ledger = await storage.ledger
  const owners = await ledger.get(0)
  if (owners === address) {
    const all_token_metadata = await storage.token_metadata
    const user_token_metadata = await all_token_metadata.get(user_token_id)
    const user_token_ipfs_hash_dict = await user_token_metadata.token_info.valueMap
    return user_token_ipfs_hash_dict
  } 
}

export const getIpfsMetaDataJson = async(address) => {
  const user_token_ipfs_hash_dict = await getIpfsDict(address)
  if (user_token_ipfs_hash_dict) {
    const user_token_ipfs_as_bytes = await user_token_ipfs_hash_dict.get(NULL_STR)
    const ipfs_meta_data_link = bytes2Char(user_token_ipfs_as_bytes)
    const ipfs_meta_data_json = getJsonObject(ipfs_meta_data_link)
    return ipfs_meta_data_json
  } else {
      alert("No NFTs for address", address)
  }
}

export const getJsonObject = async(ipfs_meta_data_link) => {
  const meta_data = await $.getJSON(ipfs_meta_data_link)
  console.log(meta_data)
  return meta_data
}

export const reduceAddress = async(address) => {
  return address.substring(0, 4) + '..' + address.substring(address.length - 4)
}




