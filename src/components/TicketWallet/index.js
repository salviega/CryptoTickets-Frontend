import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import "./TicketWallet.scss";
import { Button } from "@chakra-ui/react";

function TicketWallet({walletDesconected, setWalletDesconected}) {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const createProvider = (content) => {
    return {
      type: "walletConected",
      payload: {
        wallet: content.wallet,
        provider: content.web3Provider,
        signer: content.web3Signer,
      },
    };
  };

  // const requestAccount = async (provider) => {
  //   if (window.ethereum) {
  //     try {
  //       const accounts = await provider.send("eth_requestAccounts", []);
  //       setWallet(accounts[0]);
  //     } catch (error) {
  //       console.log(error);
  //       console.log("Error connecting...");
  //     }
  //   } else {
  //     alert("Meta Mask not detected");
  //   }
  // };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await web3Provider.send("eth_requestAccounts", []);
      const wallet = accounts[0];
      const web3Signer = web3Provider.getSigner();
      
      //await requestAccount(web3Provider);
      // let buttonMessage = "connect wallet";
      // if (walletConnected) buttonMessage = "..." + String(wallet).slice(38);

      dispatch(createProvider({web3Provider, web3Signer, wallet}));
      setWalletDesconected(false);
    } else {
      // desconect wallet
    }
  };

  React.useEffect(() => {
    if(walletDesconected) {
      connectWallet()
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
      {walletDesconected ? "connect your wallet" : "xxx"}
    </Button>
  );
}

export { TicketWallet };
