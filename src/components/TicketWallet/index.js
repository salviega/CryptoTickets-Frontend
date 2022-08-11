import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import "./TicketWallet.scss";
import { Button } from "@chakra-ui/react";

function TicketWallet() {
  const [wallet, setWallet] = React.useState();
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [provider, setProvider] = React.useState();
  const [signer, setSigner] = React.useState();

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
      await requestAccount(web3Provider);
      const web3Signer = web3Provider.getSigner();
      setProvider(web3Provider);
      setSigner(web3Signer);
      setWalletConnected(true);
      setIsConnected(true);

      dispatch(createProvider());
      console.log(state);
    } else {
      // disconected wallet
    }
  };

  let buttonMessage = "connect wallet";
  if (isConnected) buttonMessage = "..." + String(wallet).slice(38);
  else buttonMessage = "connect wallet";

  React.useEffect(() => {
    connectWallet();
    //requestAccount(provider);
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
