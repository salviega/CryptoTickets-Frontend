// libraries
import { ethers } from 'ethers';
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import { Box } from '@chakra-ui/react';

// components
import About from '../About';
import Event from '../Event';
import Home from '../Home';
import Maker from '../Maker';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import { TicketContext, TicketProvider } from '../TicketContext/TicketContext';

function App() {
  const {companies, loading, error, getCompany, saveCompany, addToIpsf, getIpsf} = useContext(TicketContext);
  const [events, setEvents] = useState();
  const [wallet, setWallet] = useState();
  const [provider, setProvider] = useState();
  const [walletConnected, setWalletConnected] = useState();
  const [signer, setSigner] = useState();

  const fetchDatos = async () => {
    let data = await companies();
    let promises = data.map(async (event, index) => {
      let ipfsInfor = await getIpsf(event.eventHash);
      return (data[index] = {
        ...data[index],
        ...ipfsInfor,
      });
    });
    let results = await Promise.all(promises);
    setEvents(results);
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const requestAccount = async (provider) => {
    if (window.ethereum) {
      try {
        const accounts = await provider.send('eth_requestAccounts', []);
        setWallet(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      alert('Meta Mask not detected');
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await requestAccount(provider);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      setWalletConnected(true);
    }
  };

  return (
    <Box w='100%' minHeight='100vh'>
      <TicketProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home events={events} />} />
            <Route path={'/event/:id'} element={<Event events={events} />} />
            <Route path='/about' element={<About />} />
            <Route path='/maker' element={<Maker signer={signer} wallet={wallet} />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </TicketProvider>
      <Header connect={connectWallet} wallet={wallet} isConnected={walletConnected} />
    </Box>
  );
}

export default App;
