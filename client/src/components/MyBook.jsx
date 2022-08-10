import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooks, getAllBooks } from '../Redux/action';

function MyBook() {

const dispatch = useDispatch()

const { books } = useSelector(s => s)
const { authuser } = useSelector(s => s)
const [nameBook, setNameBook] = useState('')
const [author, setAuthor] = useState('')
const [descr, setDescr] = useState('')
const [genre, setGenre] = useState('')
const [img, setImg] = useState(null)
const [update, setUpdate] = useState(true)
useEffect(() => {
  dispatch(getAllBooks())
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

  return (  
    <div className='myBookContainer'>
      <form onSubmit={handleSubmit}>
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
          <div className='thisBook'>
            <div>{el.image && <img className='bookImg' src={el.image} alt="img" />}</div>
            <h1>{el.name}</h1>
            <h2>{el.author} <button onClick={() => dispatch(deleteBooks(el.id))}>x</button></h2> 
          </div>
        </div> ) :
        <p>библиотека пуста :(</p>
        }
      </div>
    </div>
    
  )
}

export default MyBook
