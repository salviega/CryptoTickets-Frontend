import { useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { ethers } from 'ethers';

import './Maker.scss';
import { Box, Button, Heading, Input, Text, Image } from '@chakra-ui/react';

// Contracts
// import addressesContracts from '../../blockchain/environment/contract-address.json';
// import cryptoTicketsAbi from '../../blockchain/hardhat/artifacts/hardhat/contracts/CryptoTickets.sol/CryptoTickets.json'

import abi from '../../crytoTicketsABI.json';
import byteCode from '../../crytoTicketsBitCode.json';

function TicketMaker({ saveItem ,addToIpsf }) {

  const [eventHash, setEventHash] = useState('');
  const [eventInformation, setEventInformation] = useState({
    adadMinima: '',
    artist: '',
    aperturaDePuertas: '',
    categoria: '',
    city: '',
    date: '',
    location: '',
    maxCapta: '',
    nit: '',
    responsable: '',
  });
  const [addressContract, setAddressContract] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageLoaded, setImageLoaded] = useState();

  const location = useRef();
  const artist = useRef();
  const city = useRef();
  const date = useRef();
  const categoria = useRef();
  const adadMinima = useRef();
  const responsable = useRef();
  const nit = useRef();
  const aperturaDePuertas = useRef();
  const maxCapta = useRef();

  const state = useSelector(state => state)

  const clickHandler = async () => {
    console.log(state)
    if(!imageLoaded) return;
    setEventInformation({
      adadMinima: adadMinima.current.value,
      artist: artist.current.value,
      aperturaDePuertas: aperturaDePuertas.current.value,
      categoria: categoria.current.value,
      city: city.current.value,
      date: date.current.value,
      location: location.current.value,
      maxCapta: maxCapta.current.value,
      nit: nit.current.value,
      responsable: responsable.current.value,
    });

    await makeContract();
    await addToIpsf(eventInformation, setEventHash);
    await saveItem(addressContract, responsable.current.value, eventHash);
    console.log("done")
  };

  const makeContract = async () => {
    const factory = new ethers.ContractFactory(abi, byteCode);
    const res = await factory.connect(state.payload.signer).deploy(state.payload.wallet, maxCapta);
    setAddressContract(res.address);
  };

  const onImageChange = async (event) => {
    setImageLoaded(false)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (imageBase64) => {
        setImageBase64(imageBase64.target.result);
        setImageLoaded(true)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  
  return (
    <Box width='100%' bg='white' marginBottom='1rem' paddingBottom='1rem'>
     
      <Box display='flex' justifyContent='center'>
        <Box width='50%' bg='#f8fafc' padding='1rem' margin="3rem" border="1px" borderColor="gray.200" boxShadow='sm' rounded='md'>
          <Box marginTop='1rem' marginBottom='1rem'>
            <Heading color='#003865' >Create event nft</Heading>
            <Text>Artista:</Text>
            <Input placeholder='' ref={artist} />
            <Text>Location: </Text>
            <Input placeholder='' ref={location} />
            <Text>City: </Text>
            <Input ref={city} />
            <Text>Date: </Text>
            <Input type='datetime-local' ref={date} />
            <Text>Categoria: </Text>
            <Input ref={categoria} />
            <Text>Edad minima ingreso: </Text>
            <Input ref={adadMinima} />
            <Text>Responsable: </Text>
            <Input ref={responsable} />
            <Text>Nit: </Text>
            <Input ref={nit} />
            <Text>Apertura puertas: </Text>
            <Input ref={aperturaDePuertas} />
            <Text>maximum capacity: </Text>
            <Input placeholder='tomas' ref={maxCapta} />
            <Box>
              <Box>
                {!imageBase64 ? null : <Image src={imageBase64} alt='' ></Image>}
              </Box>
              <div className='container'>
                <span className='hiddenFileInput'>
                  <input onChange={onImageChange} type='file' name='cambiar foto de perfil' accept='image/x-png,image/gif,image/jpeg' />
                </span>
             </div>
            </Box>
            <Button onClick={clickHandler}>create NFT</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export { TicketMaker };
