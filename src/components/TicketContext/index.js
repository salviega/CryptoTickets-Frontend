import React from "react";

import { IpfsApi } from "../../middleware/ipfsApi.js";
import { RestApi } from "../../middleware/restApi.js";

const TicketContext = React.createContext({
  currentUser: null,
});

function TicketProvider(props) {
  const { getAllItems, getItem, saveItem } = RestApi();
  const { addToIpsf, getIpsf } = IpfsApi();

  const [items, setItems] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [walletDesconected, setWalletDesconected] = React.useState(true);

  const joinData = async () => {
    try {
      let data = await getAllItems();
      let promises = data.map(async (item, index) => {
        let itemInfo = await getIpsf(item.eventHash);
        return (data[index] = {
          ...data[index],
          ...itemInfo,
        });
      });
      let results = await Promise.all(promises);
      setItems(results);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  React.useEffect(() => {
    joinData();
  }, []);

  return (
    <TicketContext.Provider
      value={{
        items,
        saveItem,
        addToIpsf,
        loading,
        error,
        walletDesconected, 
        setWalletDesconected
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
}

export { TicketContext, TicketProvider };
