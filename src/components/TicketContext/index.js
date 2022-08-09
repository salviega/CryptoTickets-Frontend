import React from "react";
import { ethers } from "ethers";

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

  const [wallet, setWallet] = React.useState();
  const [provider, setProvider] = React.useState();
  const [walletConnected, setWalletConnected] = React.useState();
  const [signer, setSigner] = React.useState();

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

  const requestAccount = async (provider) => {
    if (window.ethereum) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0]);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await requestAccount(provider);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      setWalletConnected(true);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        items,
        saveItem,
        addToIpsf,
        wallet,
        walletConnected,
        signer,
        connectWallet,
        loading,
        error,
        setLoading,
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
}

export { TicketContext, TicketProvider };
