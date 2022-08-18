import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAllBookings, getAllBooks, getAllComments } from '../Redux/action'

function BookPage() {

  const dispatch = useDispatch()

  const { id } = useParams()
  const { books } = useSelector(s => s)
  const { bookings } = useSelector (s => s)
  const { authuser } = useSelector (s => s)
  const { comments } = useSelector (s => s)

  const [date, setDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [bookId, setBookId] = useState('')
  const [descr, setDescr] = useState('')
  const [photo, setPhoto] = useState('')
  const [update, setUpdate] = useState(true)
  const [rateArr, setRateArr] = useState([1,2,3,4,5]) 
  const [curRate, setcurRate] = useState('')

  useEffect(() => {
    dispatch(getAllBookings())
  }, [update])

  useEffect(() => {
    dispatch(getAllBooks())
  }, [update])

  useEffect(() => {
    dispatch(getAllComments())
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

  const handleComment = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('books_id', bookId)
    data.append('descr', descr)
    data.append('image', photo)
    data.append('rating', curRate)
    fetch('/comments', {
      method: 'post',
      body: data
    }).then(res => {console.log(res); setDescr(''); setUpdate(prev => !prev)})
  }

  const getRating = (el) => {
    return (el.Comments.reduce((acc,curr) => {return acc + curr.rating},0)/el.Comments.length).toFixed(1)
  }


  return (
    <div className='bookPageContain'>
      {books.filter(el => el.id == id).map(el => 
      <div key={el.id} >
      <div className='bookInPage'>
        <div className='bookInPageImg'>
          <img src={el.image}/>
        </div>
        <div className='bookInPageDescr'>
          {!isNaN(getRating(el)) ? <h5>Оценка пользователей:<span>{getRating(el)}</span></h5> : <h5>Оценка пользователей: у книги еще нет оценок</h5>}
          <h1>{el.name}</h1>
          <p>Автор: {el.author}</p>
          <p>Жанр: {el.genre}</p>
          <br/>
          <p className='pDescr'>Описание: {el.descr}</p>
        </div>
        <div className='bookBooking'>
          <div className='owner'>
            <h5>Владелец книги: <span><Link to={ `/userpage/${ el.user_id }` }>{el.User.name}</Link></span></h5>
          </div>
          <div className='windBooking'>
            <h4>Статус книги: {bookings.filter(el => el.books_id == id).length > 0 ? <p>забронирована до {bookings.filter(el => el.books_id == id).map(el => el.returndate.slice(0,10))}</p> 
            : 
            <div>
            <p>доступна</p> 
            {authuser &&
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
            }
            </div>
            }
            </h4>
          </div>
        </div>
        </div>
        {authuser && <div className='bookComment'>
          <h2>Оставь свой отзыв</h2>
          <h4>Твоя оценка:</h4>
          <div className='stars'>
          {rateArr.map(el =>
          <p onClick={(e) => {
            e.target.classList.toggle('voted')
            setcurRate(e.target.textContent);
          }}>{el}</p>
          )}
          </div>
          <form className='formComment' onSubmit={handleComment}>
            <input 
            placeholder='...'
            type='text'
            name='descr'
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
            />
            <label>
            <input className='hideInput'
            type="file"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            />  
            <div className='addFile'>прикрепить фото</div>
            </label>
            <button type="submit" onClick={()=>{setBookId(el.id)}}>Отправить</button>
          </form>
          <h1>Отзывы других читателей</h1>
          {comments.filter(el => el.books_id == id).length > 0 ? 
          comments.filter(el => el.books_id == id).sort((a, b) => b.id - a.id).map(el =>
            <div key={el.id} className='userComment'>
              <p className='userStar'>{el.rating}</p>
              <h3><Link to={ `/userpage/${ el.user_id }` }>{el.User.name}</Link>:</h3>
              <h4>{el.descr}</h4>
              <img src={el.image}/>
              <p className='dateComment'>{el.createdAt.slice(0,10)}</p>
            </div>)
            :
          <h5> у книги еще нет отзывов</h5>}
        </div>
        }
      </div>
      )
    }
    </div>
  )
}

export default BookPage
