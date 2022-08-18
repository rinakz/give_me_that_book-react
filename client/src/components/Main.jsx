import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../Redux/action';

function Main() {

  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const { books } = useSelector(s => s)
  const { authuser } = useSelector(s => s)
  const { loading } = useSelector (s => s)
  
  useEffect(() => {
    dispatch(getAllBooks())
  }, [])

  const getRating = (el) => {
    return (el.Comments.reduce((acc,curr) => {return acc + curr.rating},0)/el.Comments.length).toFixed(1)
  }


  return (
    <div className='searchBook'>
      <h2>Эти <span>книги</span> ждут тебя</h2>
      <input 
        className='bookSearchInput'
        type={"search"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='книга или автор'
      />
      {loading && <div className="lds-ripple"><div></div><div></div></div>}
      {!loading &&
      <div className='mainContain'>
      { books.length > 0 ? books.filter(el => search ? 
          (el.name.toLowerCase().includes(search.toLowerCase()) || 
          el.author.toLowerCase().includes(search.toLowerCase())) :
          true).map(el => <div key={el.id}>
        <Link to={ `/bookpage/${ el.id }` }>
          <div className='mainBooks'>
          <div className='firstBookItems'>
              {!isNaN(getRating(el)) ? <p>{getRating(el)}</p> : <p>у книги еще нет оценок</p>}
            <p>владелец: {el.User.name}</p>
            </div>
            {el.image && <img className='bookImg' src={el.image} alt="img" />}
            <div className='endBookItems'>
              <h1>{el.name}</h1>
              <h2>{el.author}</h2>
              <h3>{el.genre}</h3>
            </div>
          </div>
        </Link>
        </div> ) :
        <p>библиотека пуста :(</p>
        }
      </div>
    }
    </div>
  )
}

export default Main
