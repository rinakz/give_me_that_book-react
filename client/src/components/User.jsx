import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookings, getAllBookings, getAllBooks, getAllComments, getAllUsers } from '../Redux/action';
import { Link, useParams } from 'react-router-dom';



function User() {

  const { id } = useParams()
  const { loading } = useSelector (s => s)
  const { users } = useSelector (s => s)
  const { bookings } = useSelector (s => s)
  const { books } = useSelector (s => s)
  const { comments } = useSelector (s => s)

  const [update, setUpdate] = useState(true)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    dispatch(getAllBookings())
  }, [])

  useEffect(() => {
    dispatch(getAllBooks())
  }, [])

  useEffect(() => {
    dispatch(getAllComments())
  })

  
  function userImage (image) {
    let imageDefault = '/avatar2.png'
    return image ? image : imageDefault
  }

  const userFilter = users.filter(el => el.id == id)
  const userBookingFilter = bookings.filter(el => el.user_id == id)
  const userBooksFilter = books.filter(el => el.user_id == id)
  const userCommentsFilter = comments.filter(el => el.user_id == id)
 
  return (
    <div className='lkContainer'>
      {userFilter.map(el =>
      <div key={el.id} className='userName userPage'>
        <h1>{el.name}</h1>
        <img src={`${userImage(el.image)}`}></img>
      </div>
      )}
      <div className='booksAndBookings'>
      <div>
        <div className='iRead'>
          {userBookingFilter.length > 0 ?
          <h1>{userFilter.map(el => el.name)} читает</h1>
          :
          <h1>{userFilter.map(el => el.name)} ничего не читает :(</h1>
          }
        </div>
        <div className='myBooking'>
          {userBookingFilter.map(el => 
            <div key={el.id} className='mainBooks'>
              <Link to={ `/bookpage/${ el.books_id }` }>
              {el.Book.image && <img className='bookImg' src={el.Book.image} alt="img" />}
              <div className='endBookItems'>
                <h1>{el.Book.name}</h1>
                <h2>{el.Book.author}</h2>
              </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className='iRead'>
          {userBooksFilter.length > 0 ?
          <h1>Книги {userFilter.map(el => el.name)}</h1>
          :
          <h1>У {userFilter.map(el => el.name)} библиотека пуста :(</h1>
          }
        </div>
        <div className='myBooking'>
          {userBooksFilter.map(el => 
          <div key={el.id} className='mainBooks'>
            <Link to={ `/bookpage/${ el.id }` }>
            {el.image && <img className='bookImg' src={el.image} alt="img" />}
            <div className='endBookItems'>
              <h1>{el.name}</h1>
              <h2>{el.author}</h2>
            </div>
            </Link>
          </div>)}
        </div>
        <div className='iRead'>
        {userCommentsFilter.length > 0 ?
          <h1>{userFilter.map(el => el.name)} комментирует</h1>
          :
          <h1>{userFilter.map(el => el.name)} не оставляет комментариев :(</h1>
          }
          {userCommentsFilter.map(el =>
          <div key={el.id} className='userComment'>
            <h3>К книге <Link to={ `/bookpage/${ el.books_id }` }>{el.Book.name}</Link></h3>
            <p>{el.rating}</p>
            <h4>{el.descr}</h4>
            <img src={el.image}/>
            <p className='dateComment'>{el.createdAt.slice(0,10)}</p>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  )
}

export default User
