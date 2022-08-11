import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllBookings } from '../Redux/action'

function BookPage() {

  const dispatch = useDispatch()

  const { id } = useParams()
  const { books } = useSelector(s => s)
  const { bookings } = useSelector (s => s)

  const [date, setDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [bookId, setBookId] = useState('')
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    dispatch(getAllBookings())
  }, [update])

  const handleBooking = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('books_id', bookId)
    data.append('date', date)
    data.append('returndate', returnDate)
    fetch('/bookings', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(data))
    }).then(res => {console.log(res); setDate(''); setReturnDate(''); setUpdate(prev => !prev)})
  }

  const bookingFilter = bookings.filter(el => el.books_id == id)

  return (
    <div className='bookPageContain'>
      {books.filter(el => el.id == id).map(el => 
      <div key={el.id} className='bookInPage'>
        <div className='bookInPageImg'>
          <img src={el.image}/>
        </div>
        <div className='bookInPageDescr'>
          {el.rating > 0 ? <h5>Оценка пользователей:<span>{el.rating}</span></h5> : <h5>Оценка пользователей: у книги еще нет оценок</h5>}
          <h1>{el.name}</h1>
          <p>Автор: {el.author}</p>
          <p>Жанр: {el.genre}</p>
          <br/>
          <p className='pDescr'>Описание: {el.descr}</p>
        </div>
        <div className='bookBooking'>
          <div className='owner'>
            <h5>Владелец книги: <span>{el.User.name}</span></h5>
          </div>
          <div className='windBooking'>
            <h4>Статус книги: {bookingFilter.length > 0 ? <p>забронирована до {bookingFilter.map(el => el.returndate.slice(0,10))}</p> 
            : 
            <div>
            <p>доступна</p> 
            <form className='formBooking' onSubmit={handleBooking}>
              <p className='dateBooking'>Выбери дату бронирования</p>
              <input
              type='date'
              name='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              />
              <p className='dateBooking'>Выбери дату возврата</p>
              <input
              type='date'
              name='returndate'
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              />
              <br/>
              <button type="submit" onClick={()=>{setBookId(el.id)}}>Забрать</button>
            </form>
            </div>
            }
            </h4>
          </div>
        </div>
      </div>
      )
    }
    </div>
  )
}

export default BookPage
