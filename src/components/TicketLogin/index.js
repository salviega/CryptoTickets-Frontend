import React from 'react';
import { ethers } from "ethers";

import './TicketLogin.scss'
import { Button } from '@chakra-ui/react'


function TicketLogin() {

    const [wallet, setWallet] = React.useState();
    const [provider, setProvider] = React.useState();
    const [walletConnected, setWalletConnected] = React.useState();
    const [signer, setSigner] = React.useState();
    const [isConnected, setIsConnected] = React.useState();

    const requestAccount = async (provider) => {
        if (window.ethereum) {
          try {
            const accounts = await provider.send("eth_requestAccounts", []);
            setWallet(accounts[0]);
          } catch (error) {
            console.log(error)
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
          setIsConnected(true)
        } else {
            // disconected wallet
        }
      };

      let buttonMessage = "connect wallet"
      if(isConnected){
        buttonMessage = "..." + String(wallet).slice(38)
      } else {
        buttonMessage = "connect wallet"
      }

      React.useEffect(() => {
        connectWallet();
        requestAccount(provider);

      }, [])

      return (
        <Button border="1px" borderColor="#003865" color="#003865" onClick={connectWallet} minWidth="10%" >{buttonMessage}</Button>
      )
}

export {TicketLogin}