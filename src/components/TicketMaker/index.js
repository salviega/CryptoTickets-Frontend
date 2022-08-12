import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ethers } from 'ethers'

import './Maker.scss'
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react'

import cryptoTicketsCompile from '../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/CryptoTickets.sol/CryptoTickets.json'

function TicketMaker ({ saveItem, addToIpsf }) {
  const [eventHash, setEventHash] = useState('...')
  const [addressContract, setAddressContract] = useState('')
  const state = useSelector((state) => state)

  const location = useRef()
  const artist = useRef()
  const city = useRef()
  const date = useRef()
  const categoria = useRef()
  const adadMinima = useRef()
  const admin = useRef()
  const nit = useRef()
  const aperturaDePuertas = useRef()
  const maxCapta = useRef()
  const nftImage = useRef()
  const tokenName = useRef()
  const tokenSymbol = useRef()

  const handleSubmit = async () => {
    const eventInfo = {
      adadMinima: adadMinima.current.value,
      admin: admin.current.value,
      artist: artist.current.value,
      aperturaDePuertas: aperturaDePuertas.current.value,
      categoria: categoria.current.value,
      city: city.current.value,
      date: date.current.value,
      location: location.current.value,
      nftImage: nftImage.current.value,
      maxCapta: maxCapta.current.value,
      nit: nit.current.value,
      symbol: tokenSymbol.current.value,
      tokenName: tokenName.current.value
    }

    await deployContract(setAddressContract, { admin: state.wallet, maxCapta: eventInfo.maxCapta, name: eventInfo.tokenName, symbol: eventInfo.symbol }) // burned data
    await addToIpsf(setEventHash, eventInfo)
    await saveItem(addressContract, eventInfo.admin, eventHash)
  }

  const deployContract = async (stateHook, constructor) => {
    try {
      const contractFactory = new ethers.ContractFactory(cryptoTicketsCompile.abi, cryptoTicketsCompile.bytecode, state.signer)
      const contract = await contractFactory.deploy(constructor.admin, constructor.maxCapta, constructor.name, constructor.symbol)
      await contract.deployed()
      console.log(`Deployment successful! Contract Address: ${contract.address}`)
      stateHook(contract.address)
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  // const onTransformImageToBase64 = async (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let imageBase64 = '';
  //     let reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0])
  //     reader.onload = () => {
  //       imageBase64 = reader.result;
  //     }
  //     //reader.readAsDataURL(event.target.files[0]);
  //     console.log(imageBase64);
  //     //return imageBase64
  //   };
  // };

  /*
  handleSubmit(event) {
    event
  }
  <form onSubmit=(handleSubmit)>
            <label for="email">
                <span>¿Cuál es tu email? </span>
                <input type="text" id="email" placeholder="nombre@gmail.com..."/>
            </label>
            <label for="contraseña">
                <span>¿Cuál es tu contraseña? </span>
                <input type="text" id="contraseña" placeholder="****"/>
            </label>
            <label for="cumpleaños">
                <span>¿Cuál es tu cumpleaños? </span>
                <input type="date" id="cumpleaños" />
            </label>
            <label for="horario">
                <span>¿En qué horario estudias? </span>
                <input type="time" id="horario" />
            </label>
            <input type="submit" />
  </form>
  */

  return (
    <Box width='100%' bg='white' marginBottom='1rem' paddingBottom='1rem'>
      <Box display='flex' justifyContent='center'>
        <Box
          width='50%'
          bg='#f8fafc'
          padding='1rem'
          margin='3rem'
          border='1px'
          borderColor='gray.200'
          boxShadow='sm'
          rounded='md'
        >
          <Box marginTop='1rem' marginBottom='1rem'>
            <Heading color='#003865'>Create event nft</Heading>
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
            <Input ref={admin} />
            <Text>Nit: </Text>
            <Input ref={nit} />
            <Text>Apertura puertas: </Text>
            <Input ref={aperturaDePuertas} />
            <Text>maximum capacity: </Text>
            <Input placeholder='tomas' ref={maxCapta} />
            <Text>token name: </Text>
            <Input placeholder='tomas' ref={tokenName} />
            <Text>token symbol: </Text>
            <Input placeholder='tomas' ref={tokenSymbol} />
            <Box>
              <Box>
                {/* {!imageBase64 ? null : <Image src={imageBase64} alt=""></Image>} */}
              </Box>
              <div className='container'>
                <span className='hiddenFileInput'>
                  <input
                    ref={nftImage}
                    type='file'
                    name='cambiar foto de perfil'
                    accept='image/x-png,image/gif,image/jpeg'
                  />
                </span>
              </div>
            </Box>
            <Button onClick={handleSubmit}>create NFT</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export { TicketMaker }
