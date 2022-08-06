import React from 'react';

import { Box,Heading,Text,Button } from '@chakra-ui/react'

function Header({connect, wallet,isConnected}) {

  let buttonMessage = "connect wallet"
  if(isConnected){
    buttonMessage = "..." + String(wallet).slice(38)
  }
  return (
    <Box display="flex"  bg="#f8fafc" borderBottom="1px" borderColor="gray.200" justifyContent="space-around" alignItems="center" paddingTop=".5rem" paddingBottom=".5rem"  >
        <Heading as="a" href='/' color="#003865">CryptoTickets</Heading>
        <Box width="30%" display="flex" alignItems="center" justifyContent="space-between">
            <Text as="a" href='/about' color="gray.500">about us</Text>
            <Text as="a" href='/maker' color="gray.800">make event</Text>
            <Button border="1px" borderColor="#003865" color="#003865" onClick={connect} minWidth="10%" >{buttonMessage}</Button>
        </Box>
    </Box>
  );
}

export default Header;
