import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookings, getAllBookings, getAllBooks, getAllUsers } from '../Redux/action';
import { Link } from 'react-router-dom';



function My() {

  const { authuser } = useSelector (s => s)

  const [update, setUpdate] = useState(true)
  const [editProfile, setEditProfile] = useState(false)
  const [img, setImg] = useState(null)
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBookings())
  }, [update])

  useEffect(() => {
    dispatch(getAllBooks())
  }, [])
  
  const { bookings } = useSelector (s => s)

  
  function userImage (image) {
    let imageDefault = 'avatar2.png'
    return image ? image : imageDefault
  }

  const myBookFilter = bookings.filter(el => el.user_id == authuser.id)

  console.log(bookings.filter(el => el.user_id == authuser.id))

  const handleSubmitProfile = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', name)
    data.append('image', img)
    fetch(`/${editProfile}`, {
      method: 'put',
      body: data
    }).then(res => {console.log(res); setName(''); setEditProfile(false); setUpdate(prev => !prev)})
  }


  return (
    <div className='lkContainer'>
      <div className='userName'>
        {editProfile ? 
            <form onSubmit={handleSubmitProfile}>
            <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            / >
            <label>
            <input className='hideInput'
            type="file"
            name="image"
            onChange={(e) => setImg(e.target.files[0])}
            / >
            <div className='addFile'>добавить фото</div>
            </label>
            <div className="send">
            <button type="submit">Сохранить</button>
            <button type="click" onClick={(e) => {
            e.preventDefault()
            setEditProfile(false)
            }}>Закрыть</button>
            </div>
            </form> :
            true && 
            <div>
              <h1>{authuser.name}</h1>
              <button className='editProfileBtn' onClick={() => {
              setEditProfile(authuser.id); 
              setName(authuser.name)}}>
              Редактировать
              </button>
            </div>}
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
          <Link to={ `/bookpage/${ el.books_id }` }>
          {el.Book.image && <img className='bookImg' src={el.Book.image} alt="img" />}
          <div className='endBookItems'>
            <h1>{el.Book.name}</h1>
            <h2>{el.Book.author}</h2>
          </div>
          </Link>
        <button onClick={() => dispatch(deleteBookings(el.id))}>вернуть книгу</button>
      </div>)}
      </div>
      </div>
    </div>
  )
}

export default My
