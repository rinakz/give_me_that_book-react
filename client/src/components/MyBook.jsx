import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { acceptBooking, deleteBookings, deleteBooks, getAllBookings, getAllBooks, getAllBooksApi } from '../Redux/action';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';

function MyBook() {

const { books } = useSelector(s => s)
const { authuser } = useSelector(s => s)
const { bookings } = useSelector(s => s)
const { booksapi } = useSelector(s => s)

const [nameBook, setNameBook] = useState('')
const [author, setAuthor] = useState('')
const [descr, setDescr] = useState('')
const [genre, setGenre] = useState('')
const [img, setImg] = useState(null)
const [update, setUpdate] = useState(true)

const dispatch = useDispatch()

useEffect(() => {
  dispatch(getAllBooks())
  dispatch(getAllBookings())
}, [update])


const handleSubmit = (e) => {
  e.preventDefault()
  const data = new FormData()
  data.append('name', nameBook)
  data.append('author', author)
  data.append('descr', descr)
  data.append('genre', genre)
  data.append('image', img)
  fetch('/books', {
    method: 'post',
    body: data
  }).then(res => {console.log(res); setNameBook(''); setAuthor(''); setDescr(''); setGenre(''); setUpdate(prev => !prev)})
}

// const [apiInput, setApiInput] = useState('')
// const [apiBooks, setApiBooks] = useState([])
// const options = {
// method: 'GET',
// url: `https://hapi-books.p.rapidapi.com/search/${apiInput}`,
// headers: {
//   'X-RapidAPI-Key': '33ad041905mshbb4e45838502cbap171380jsne327e1afcaa4',
//   'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
// }
// };

// const getApiBook = async () => {
//   const response = await axios.request(options)
//   console.log(response.data);
//   // setApiBooks(response.data)
// }

// const timeid = useRef()
// const apiHandler = async (e) => {
//   setApiInput(e.target.value)
//   if (timeid.current) {
//     clearTimeout(timeid.current)
//   }
//   timeid.current = setTimeout(getApiBook, 1000)
// }

// const apiSelector = (el) => {
//   setNameBook(el.name);
//   setAuthor(el.authors.join('')); 
//   setDescr(''); 
//   setGenre('');
//   setImg(el.cover)
// }

console.log(bookings);


  return (  
    <div className='myBookContainer'>
      <form onSubmit={handleSubmit}>
          {/* <div className="searchApi">
            <input type="text" placeholder="Найти книгу" onChange={apiHandler} value={apiInput}/>
            <div className="apiwrapper">
              {apiBooks.map(el => 
                <div key={el.book_id} className="apiitem" onClick={() => apiSelector(el)}>
                  <img src={el.cover} alt="img" width={50} height={50}/>
                  <div className="apiname">{el.name}</div>
                </div>
              )}
            </div>
          </div> */}
        <h2>Загрузить новую книгу</h2>
        <input
        placeholder='Название книги'
        type="text"
        name="name"
        value={nameBook}
        onChange={(e) => setNameBook(e.target.value)}
        ></input>
        <input
        placeholder='Автор'
        type="text"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <input
        placeholder='Жанр'
        type="text"
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        ></input>
        <input
        placeholder='Описание'
        type="text"
        name="descr"
        value={descr}
        onChange={(e) => setDescr(e.target.value)}
        ></input>
      <label>
        <input className='hideInput'
        type="file"
        name="image"
        onChange={(e) => setImg(e.target.files[0])}
        />  
        <div className='addFile'>прикрепить фото</div>
      </label>
      <div className="send">
      <button className='bookBtn' type="submit">готово</button>
      </div>
      </form> 
      <div className='allMyBooks'>
        { books.filter(el => el.user_id == authuser.id).length > 0 ? books.sort((a, b) => b.id - a.id).filter(el => el.user_id == authuser.id).map(el => <div key={el.id} className='myBook'>
          <div className='mainBooks'>
            {!el.Bookings.length && <button onClick={() => dispatch(deleteBooks(el.id))}>удалить книгу</button>}
            {el.Bookings.length ? !el.Bookings[0].status && <button onClick={() => {
              dispatch(acceptBooking(el.Bookings[0].id));
              setUpdate(prev => !prev)
              }}>Подтвердить для {bookings?.filter(elem => elem.books_id == el.id)[0]?.User?.name}</button> : true}
            {el.Bookings[0]?.status && <p>Забронирована пользователем {bookings?.filter(elem => elem.books_id == el.id)[0]?.User?.name}</p>}
            {el.Bookings[0]?.status && <button onClick={() => {dispatch(deleteBookings(el.id)); setUpdate(prev => !prev)}}>Отменить бронирование</button>}
            <Link to={ `/bookpage/${ el.id }` }>
            {el.image && <img className='bookImg' src={el.image} alt="img" />}
              <div className='endBookItems'>
            <h1>{el.name}</h1>
            <h2>{el.author}</h2> 
          </div>
          </Link>
          </div>
        </div> ) :
        <p>библиотека пуста :(</p>
        }
      </div>
    </div>
    
  )
}

export default MyBook
