import React from 'react';
import { IpfsApi } from '../../middleware/ipfsApi.js';
import { RestApi } from '../../middleware/restApi.js';

const TicketContext = React.createContext();

function TicketProvider(props) {
    const { items: companies, loading, error, getItem: getCompany, saveItem: saveCompany } = RestApi();
    const  { addToIpsf, getIpsf } = IpfsApi();

    const [events, setEvents] = React.useState();
    const [wallet, setWallet] = React.useState();
    const [provider, setProvider] = React.useState();
    const [walletConnected, setWalletConnected] = React.useState();
    const [signer, setSigner] = React.useState();

    return(
        <TicketContext.Provider value={{
            companies, 
            loading,
            error,
            getCompany,
            saveCompany,
            addToIpsf,
            getIpsf
        }}>
        {props.children}
        </TicketContext.Provider>
    )
}

export { TicketContext, TicketProvider }

