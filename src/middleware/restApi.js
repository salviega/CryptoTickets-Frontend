import axios from 'axios';
import { v1 as uuid} from 'uuid';

function RestApi() {

  const url = 'https://cryptotickects-backend.herokuapp.com/companies';
 
  const getAllItems = async () => {
    let response = await axios.get(url);
    return response.data
  }

  const getItem = async (address) => {
    let response = await axios.get(`${url}/${address}`);
    return response.data
  }

  const saveItem = async (address, name, eventHash) => {
    let x = {id: uuid(), address: address, name:name, eventHash:eventHash};
    console.log(x)
    let response = await axios.post(url, {id: uuid(), address: address, name:name, eventHash:eventHash});
    console.log(await response.data);
  }
  
  return {
    getAllItems,
    getItem,
    saveItem,
  }
}

export { RestApi };
