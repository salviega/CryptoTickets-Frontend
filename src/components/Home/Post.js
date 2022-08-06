import React from 'react';

import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Post({ event, key }) {
  const navigate = useNavigate();

  return (
    <Box width='23%' bg='#f8fafc' height='15rem' boxShadow='sm' p='2' rounded='md' border='1px' borderColor='gray.200' display="flex" flexDirection="column">
      <Box width='100%' bg='lightseagreen' height='120px' rounded='md'>
        <Image boxSize='100%' objectFit='cover' pos src='https://bit.ly/dan-abramov' alt='Dan Abramov' rounded='md' />
      </Box>
      <Box height="35%">
        <Heading fontSize='2xl' color='gray.600'>
          {event.artist}
        </Heading>
        <Text color='gray.400'>{event.city}</Text>
      </Box>
      <Button width='100%' marginTop='.5rem' bg='#003865' color='white' onClick={() => navigate(`event/${event.id}`)}>
        comprar entrada
      </Button>
    </Box>
  );
}

export default Post;
