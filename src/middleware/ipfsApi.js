import { create } from 'ipfs-http-client'

function IpfsApi () {
  const url = 'https://ipfs.infura.io:5001/api/v0'

  const addToIpsf = async (state, item) => {
    const stringifiedItem = JSON.stringify(item)
    const client = create(url)
    const created = await client.add(stringifiedItem)
    console.log(created.path)
    state(created.path)
  }

  const getIpsf = async (path) => {
    const response = await fetch(`https://ipfs.infura.io/ipfs/${path}`)
    return await response.json()
  }

  return {
    addToIpsf,
    getIpsf
  }
}

export { IpfsApi }
