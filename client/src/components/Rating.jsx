import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Rating() {

  const [rating, setRating] = useState([])
  const [rating2, setRating2] = useState([])

  useEffect(() => {
    axios('/allusers').then(res => setRating(res.data.sort((a,b) => b.Books.length - a.Books.length)))
  }, [])

  useEffect(() => {
    axios('/allusers').then(res => setRating2(res.data.sort((a,b) => b.Bookings.length - a.Bookings.length)))
  }, [])

  return (
    <div className='ratingContain'>
      <div className='ratingOwners'>
        <thead>
          <tr>
            <td></td>
            <th>Топ владельцев</th>
            <th>Книги</th>
          </tr>
        </thead>
        <tbody>
          {rating.map((el, i) => 
          <tr key={el.id}>
            <td>{i + 1}</td>
            <td className='ratingTd'><img src={el.image}></img><Link to={ `/userpage/${ el.id }` }>{el.name}</Link></td>
            <td>{el.Books.length}</td>
          </tr>
          )}
        </tbody>
      </div>
      <div className='ratingReaders'>
      <thead>
          <tr>
            <td></td>
            <th>Топ читателей</th>
            <th>Книги</th>
          </tr>
        </thead>
        <tbody>
          {rating2.map((el, i) => 
          <tr key={el.id}>
            <td>{i + 1}</td>
            <td className='ratingTd'><img src={el.image}></img><Link to={ `/userpage/${ el.id }` }>{el.name}</Link></td>
            <td>{el.Bookings.length}</td>
          </tr>
          )}
        </tbody>
      </div>
    </div>
  )
}

export default Rating
