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

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        const wallet = accounts[0];
        const web3Signer = web3Provider.getSigner();
        dispatch(createProvider({web3Provider, web3Signer, wallet}));
        setWalletDesconected(false);
      } catch(error) {
        console.log(error)
      }
    } else {
      alert("Meta Mask not detected");
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
