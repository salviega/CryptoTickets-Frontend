import React from 'react';
import { useParams } from 'react-router-dom';

import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';

function Event({ events }) {
  const { id } = useParams();

  const eventFilter = events.filter((event) => event.id === id);
  const event = eventFilter[0];

  return (
    <Box width='100%' display='flex' justifyContent='center'>
      <Box width='90%' display='flex' marginTop='1rem'>
        <Box width='100%'>
          <Heading paddingLeft='1rem'>{event.artist}</Heading>
          <Box bg='#f8fafc' paddingLeft='1rem' paddingBottom='1rem' border='1px' borderColor='gray.200' borderRadius='2xl'>
            <Text>Location: {event.location}</Text>
            <Text>City: {event.city}</Text>
            <Text>Date: {event.date}</Text>
            <Text>categoria: {event.categoria}</Text>
            <Text>Edad minima: {event.adadMinima}</Text>
            <Text>responsable: {event.responsable}</Text>
            <Text>nit:{event.nit}</Text>
          </Box>
          <Button marginTop='1rem'>Comprar</Button>
        </Box>
        <Box width='100%' display='flex' justifyContent='center'>
          <Image boxSize='500px' objectFit='cover' pos src='https://bit.ly/dan-abramov' alt='Dan Abramov' rounded='md' />
        </Box>
      </Box>
    </Box>
  );
}

export default Event;
