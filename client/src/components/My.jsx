import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookings, getAllBookings, getAllBooks } from '../Redux/action';
import { Link } from 'react-router-dom';



function My() {

  const dispatch = useDispatch()
  
  const { bookings } = useSelector (s => s)
  const { authuser } = useSelector (s => s)

  const [update, setUpdate] = useState(true)

  useEffect(() => {
    dispatch(getAllBookings())
  }, [update])
  
  function userImage (image) {
    let imageDefault = 'avatar2.png'
    return image ? image : imageDefault
  }

  const myBookFilter = bookings.filter(el => el.user_id == authuser.id)

  console.log(bookings.filter(el => el.user_id == authuser.id))


  return (
    <div className='lkContainer'>
      <div className='userName'>
        <h1>{authuser.name}</h1>
        <img src={`${userImage(authuser.image)}`}></img>
      </div>
      <div>
        <div className='iRead'>
          {myBookFilter.length > 0 ?
          <h1>я читаю</h1>
          :
          <h1>я ничего не читаю :(</h1>
          }
        </div>
        <div className='myBooking'>
      {bookings.filter(el => el.user_id == authuser.id).map(el => 
      <div key={el.id} className='mainBooks'>
        <div>
          <Link to={ `/bookpage/${ el.books_id }` }>
          {el.Book.image && <img className='bookImg' src={el.Book.image} alt="img" />}
          </Link></div>
        <h1>{el.Book.name}</h1>
        <h2>{el.Book.author}</h2>
        <button onClick={() => dispatch(deleteBookings(el.id))}>вернуть книгу</button>
      </div>)}
      </div>
      </div>
    </div>
  )
}

export default My
