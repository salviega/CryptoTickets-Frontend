import { create } from 'ipfs-http-client';

function IpfsApi() {

  const url = 'https://ipfs.infura.io:5001/api/v0';

  const addToIpsf = async (item, state) => {
    try {
      const stringifiedItem = JSON.stringify(item);
      const client = create(url);
      const created = await client.add(stringifiedItem);
      state(created.path);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const getIpsf = async (path) => {
    let response = await fetch(`https://ipfs.infura.io/ipfs/${path}`);
    let data = await response.json();
    return data;
  };

  return {
    addToIpsf,
    getIpsf
  }
}

export { IpfsApi };
