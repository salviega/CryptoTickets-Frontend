const fs = require('fs')
const { ethers } = require('hardhat')

async function main () {
  const CryptoTicketsContract = await ethers.getContractFactory('CryptoTickets')
  const cryptoTickets = await CryptoTicketsContract.deploy('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 'CryptoTickets', 'CTK', 1000)
  await cryptoTickets.deployed()
  console.log('CryptoTickets Contract was deployed to: ' + cryptoTickets.address)

  const addresses = {
    cryptoticketcontract: cryptoTickets.address
  }
  const addressesJSON = JSON.stringify(addresses)
  fs.writeFileSync('src/blockchain/environment/contract-address.json', addressesJSON)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
