import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react'
import { App } from './components/App/';
import { TicketProvider } from './components/TicketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (
    <ChakraProvider>
      <TicketProvider>
        <App />
      </TicketProvider>
    </ChakraProvider>
  )
);


