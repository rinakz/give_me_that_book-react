import React, {useState} from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { actionLogin, actionLogout } from '../Redux/action';

function Navbar() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/check').then((res) => res.json()).then((res) => dispatch(actionLogin(res)));
  }, []);

  const nav = useNavigate()

  const handleLogout = () => {
    fetch('/logout')
      .then(() => {
        dispatch(actionLogout());
				nav('/')
      })
      .catch(console.log);
    };

  const { authuser } = useSelector(s=>s) 

  return (
    <div>
      <div className='navMain'>
        <div className='start'>
          <Link to='/'>Give Me That <span>Book</span></Link>
        </div>
        <div className='end'>
          {authuser && <Link to='my'>{authuser.name}</Link>}
          {!authuser && <Link to='register'>Войти</Link>}
          {authuser && <Link to='/' onClick={handleLogout}>Выйти</Link>}
        </div>
      </div>
      <div className='navBookMenu'>
        <div className='navBook'>
          {authuser && <Link to='mybook'>Мои книги</Link>}
          <Link to='/'>Библиотека</Link>
          <Link to='rating'>Рейтинг</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
