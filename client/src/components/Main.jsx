import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../Redux/action';

function Main() {

  const dispatch = useDispatch()
  const { books } = useSelector(s => s)
  const { authuser } = useSelector(s => s)

  function symbols (el) {
    return el.length > 30 ? (el.slice(0, 30) + ' ...') :  el
  }

  return (
    <div className='searchBook'>
      <h2>Эти <span>книги</span> ждут тебя</h2>
      <div className='mainContain'>
      { books.length > 0 ? books.map(el => <div key={el.id}>
        <Link to={ `/bookpage/${ el.id }` }>
          <div className='mainBooks'>
            {el.rating > 0 ? <p>{el.rating}</p> : <p>у книги еще нет оценок</p>}
            <p>владелец: {el.User.name}</p>
            <div>{el.image && <img className='bookImg' src={el.image} alt="img" />}</div>
            <h1>{el.name}</h1>
            <h2>{el.author}</h2>
            <h3>{el.genre}</h3>
            <p>{symbols(el.descr)}</p>
          </div>
        </Link>
        </div> ) :
        <p>библиотека пуста :(</p>
        }
      </div>
    </div>
  )
}

export default Main
