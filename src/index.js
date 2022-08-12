import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'

import { App } from './components/App/';
import { TicketProvider } from './components/TicketContext';
import { walletReducer } from './components/TicketReducer';
const store = createStore(walletReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (
    <ChakraProvider>
      <Provider store={store}>
      <TicketProvider>
        <App />
      </TicketProvider>
      </Provider>
    </ChakraProvider>
  )
);


