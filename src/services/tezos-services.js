import { BeaconWallet } from '@taquito/beacon-wallet'
import { TezosToolkit } from '@taquito/taquito'
import { bytes2Char } from '@taquito/utils'
import { KALAMINT_CONTRACT, NODE_URL, NULL_STR, ID_LOOKUP } from '../constants'
import { getJsonObjectFromString } from './utilities';

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

export const getContractStorage = async(nft_contract_address) => {
  const contract = await Tezos.wallet.at(nft_contract_address)
  const storage = await contract.storage()
  return storage
}

export const getAllKalamintTokens = async() => {
  const contract = await Tezos.wallet.at(KALAMINT_CONTRACT)
  console.log(contract)
  const storage = await contract.storage()
  const tokens = await storage.tokens
  return tokens
}

export const getKalamintTxlTokens = async() => {
  const all_tokens = await getAllKalamintTokens()
  var kalamintTxls = []  
  let id = 1
  for (id = 1; id <= 78; ++id) {
    console.log('buiding')
    console.log(id)
    const zero_filled = ('0000'+id).slice(-3)
    let token_id = ID_LOOKUP[zero_filled]
    if (token_id) {
      const txl = await all_tokens.get(token_id)
      kalamintTxls[id - 1] = txl
      console.log(kalamintTxls)
    }
  }
  return kalamintTxls
}

export const getIpfsDict = async(address, contract) => {
  const storage = await getContractStorage(contract)
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

export const getIpfsMetaDataJson = async(address, contract) => {
  const user_token_ipfs_hash_dict = await getIpfsDict(address, contract)
  if (user_token_ipfs_hash_dict) {
    const user_token_ipfs_as_bytes = await user_token_ipfs_hash_dict.get(NULL_STR)
    const ipfs_meta_data_link = bytes2Char(user_token_ipfs_as_bytes)
    const ipfs_meta_data_json = getJsonObjectFromString(ipfs_meta_data_link)
    return ipfs_meta_data_json
  } else {
      alert("No NFTs for address", address)
  }
}

