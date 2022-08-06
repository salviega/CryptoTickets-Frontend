import React from 'react';
import axios from 'axios';
import { v1 as uuid} from 'uuid';

function RestApi() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const url = 'https://cryptotickets.herokuapp.com/companies';

  React.useEffect(() => {
    try {
      let data = getAllItems();
      setItems(data);
      setLoading(false);

    } catch(error) {
      setError(error);
    }
  }, [])
  
  const getItem = async (address) => {
    try {
      let response = await axios.get(`${url}/${address}`);
      let data = await response.data;
      return data;
    } catch(error) {
      setError(error)
    }
  };
  
  const getAllItems = async () => {
    try {
      let response = await axios.get(url);
      let data = await response.data;
      return data;
    } catch(error) {
      setError(error);
    }
  };

  const saveItem = async (address, name, eventHash) => {
    try {
        let item = {
        id: uuid,
        address,
        name,
        eventHash,
        };
        let response = await axios.post(url, item);
        let data = await response.data;
        return data;
    } catch(error) {
      setError(error);
    }
  };

  return {
    items,
    loading,
    error,  
    getItem,
    saveItem
  }
}

export { RestApi };
