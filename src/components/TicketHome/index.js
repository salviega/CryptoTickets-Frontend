import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

function TicketHome(props) {
  return (
    <Box width='100%' bg='white' marginBottom='1rem' paddingBottom='1rem' display="flex" flexDirection="column" alignItems="center" >
      <Heading fontWeight="medium" color="#003865" fontSize="5xl" marginBottom="2rem" borderBottom="1px" borderColor="gray.200">Events near you</Heading>
      <Box width='80%' display='flex' justifyContent='space-around'>
        {props.children}
      </Box>
    </Box>
  );
}

export { TicketHome };
