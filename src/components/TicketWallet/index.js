import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import "./TicketWallet.scss";
import { Button } from "@chakra-ui/react";

function TicketWallet() {
  const [wallet, setWallet] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [signer, setSigner] = React.useState(null);
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const createProvider = () => {
    return {
      type: "walletConect",
      payload: {
        wallet: wallet,
        walletConnected: walletConnected,
        provider: provider,
        signer: signer,
      },
    };
  };

  const requestAccount = async (provider) => {
    if (window.ethereum) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0]);
      } catch (error) {
        console.log(error);
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      await requestAccount(web3Provider);
      
      setProvider(web3Provider);
      setSigner(web3Signer);
      setWalletConnected(true);
      setIsConnected(true);

      dispatch(createProvider());
      console.log(state);
    } else {
      // disconect wallet
    }
  };

  let buttonMessage = "connect wallet";
  if (isConnected) buttonMessage = "..." + String(wallet).slice(38);
  else buttonMessage = "connect wallet";

  React.useEffect(() => {
    if(!walletConnected) {
      connectWallet();
    }
  }, []);

  return (
    <Button
      border="1px"
      borderColor="#003865"
      color="#003865"
      onClick={connectWallet}
      minWidth="10%"
    >
      {buttonMessage}
    </Button>
  );
}

export { TicketWallet };
