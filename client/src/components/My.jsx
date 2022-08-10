import React from 'react'
import { useDispatch, useSelector } from 'react-redux';



function My() {

  const { authuser } = useSelector(s => s)
  
  function userImage (image) {
    let imageDefault = 'avatar.png'
    return image ? image : imageDefault
  }

  return (
    <div className='lkContainer'>
      <div className='userName'>
        <h1>{authuser.name}</h1>
      </div>
      <img src={`${userImage(authuser.image)}`}></img>
    </div>
  )
}

export default My
