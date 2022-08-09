// libraries
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles
import { Box } from "@chakra-ui/react";

// components
import { Header } from "../../shared/Header";
import { Footer } from "../../shared/Footer";
import { TicketAbout } from "../TicketAbout";
import { TicketEvent } from "../TicketEvent";
import { TicketHome } from "../TicketHome";
import { TicketMaker } from "../TicketMaker";
import { TicketPost } from '../TicketPost';
import { TicketContext } from "../TicketContext";
import { TicketLoading } from "../TicketLoading"
import { TicketError } from '../TicketError';

function App() {
  const {
    items: events,
    wallet,
    walletConnected,
    signer,
    connectWallet,
    loading,
    error,
  } = useContext(TicketContext);
  
  return (
    <Box w="100%" minHeight="100vh">
      {error && <TicketError />}
      {loading && <TicketLoading />}
      <Header connect={connectWallet} wallet={wallet} isConnected={walletConnected}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=
          {<TicketHome> {events?.map((event, index) => (<TicketPost event={event} key={index} />))}</TicketHome>} />
          <Route path="/about" element={<TicketAbout />} />
          <Route path="/maker" element={<TicketMaker signer={signer} wallet={wallet} />} />
          {events?.map((event, index) => <Route path={"/event/:id"} element={<TicketEvent event={event} />} key={index} />)}
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
}

export { App };
