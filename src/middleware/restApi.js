import axios from 'axios'
import { v1 as uuid } from 'uuid'

function RestApi () {
  const url = 'https://cryptotickects-backend.herokuapp.com/companies'

  const getAllItems = async () => {
    const response = await axios.get(url)
    return response.data
  }

  const getItem = async (address) => {
    const response = await axios.get(`${url}/${address}`)
    return response.data
  }

  const saveItem = async (address, name, eventHash) => {
    const x = { id: uuid(), address, name, eventHash }
    console.log(x)
    const response = await axios.post(url, { id: uuid(), address, name, eventHash })
    console.log(await response.data)
  }

  return {
    getAllItems,
    getItem,
    saveItem
  }
}

export { RestApi }
