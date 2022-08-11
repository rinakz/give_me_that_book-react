import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../Redux/action'

function Rating() {
  const dispatch = useDispatch()
  
  const { authuser } = useSelector(s => s)
  const { bookings } = useSelector (s => s)

  const [update, setUpdate] = useState(true)

  useEffect(() => {
    dispatch(getAllBookings())
  }, [update])

  return (
    <div className='ratingContain'>
      <div>
        <h1>Топ владельцев</h1>
      </div>
      <div>
        <h1>Топ читателей</h1>
      </div>
    </div>
  )
}

export default Rating
