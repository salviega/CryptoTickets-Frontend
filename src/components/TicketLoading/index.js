import React from 'react'
import { CircularProgress } from '@chakra-ui/react'

import './TicketLoading.scss'

function TicketLoading () {
  return (
    <div className='center'>
      <CircularProgress isIndeterminate color='blue.300' />
    </div>

  )
}

export { TicketLoading }
