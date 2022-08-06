// libraries
import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// styles
import { Box } from "@chakra-ui/react";

// components
import About from "../About";
import Event from "../Event";
import Home from "../Home";
import Maker from "../Maker";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import { TicketContext } from "../TicketContext/TicketContext";

function App() {
  const {
    items: events,
    wallet,
    walletConnected,
    signer,
    connectWallet,
    loading,
    error,
    setLoading
  } = useContext(TicketContext);
  
  return (
    <Box w="100%" minHeight="100vh">
      <Header
        connect={connectWallet}
        wallet={wallet}
        isConnected={walletConnected}
      />
      {error && <h1>Error 404</h1>}
      {loading && <h1>loading...</h1>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home events={events}/>} />
          <Route path={"/event/:id"} element={<Event events={events} loading={loading} setLoading={setLoading} />} />
          <Route path="/about" element={<About />} />
          <Route path="/maker" element={<Maker signer={signer} wallet={wallet} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
}

export { App };
