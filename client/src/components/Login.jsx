import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionLogin } from '../Redux/action';

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const [login, setLogin] = useState(true);
  const toggle = function (e) {
    e.preventDefault();
    setLogin((prev) => !prev);
  };

  const authHeader = useRef();

  const loginSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(actionLogin(res));
        nav('/');
      })
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };
  const regSubmit = (e) => {
    e.preventDefault();
    fetch('/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(actionLogin(res));
        nav('/');
      })
      .catch(console.log)
      .finally(() => {
        setForm({});
        e.target.reset();
      });
  };
  
  return (
    <div className="loginContainer">
        {login ? (
          <form className="authForm" onSubmit={regSubmit}>
            <h1 ref={authHeader}>Присоединяйся к нашей
            <br /> <span>библиотеке</span></h1>
            <h4>Если у тебя уже есть аккаунт просто <a onClick={(e) => {
                  authHeader.current.classList.toggle('authtoggle');
                  toggle(e);
                }}>АВТОРИЗУЙСЯ</a></h4>
            <p type="Name:">
              Введи имя:
              <input
                type="text"
                name="name"
                value={form.name || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Email:">
              Введи E-mail:
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Password:">
              Придумай пароль:
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Contact:">
              Контакт для связи:
              <input
                type="text"
                name="contact"
                value={form.contact || ''}
                onChange={handleChange}
              />
            </p>
            <div className="authBtns">
              <button type="submit">Зарегистрироваться</button>
            </div>
          </form>
        ) : (
          <form className="authForm" onSubmit={loginSubmit}>
            <h1 ref={authHeader}>Добро пожаловать!</h1>
            <h4>Если у тебя еще нет аккаунта <a onClick={(e) => {
                  authHeader.current.classList.toggle('authtoggle');
                  toggle(e);
                }}>Зарегистрируйся</a></h4>
            <p type="Email:">
              Введи E-mail:
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
              />
            </p>
            <p type="Password:">
              Введи Пароль:
              <input
                type="password"
                name="password"
                value={form.password || ''}
                onChange={handleChange}
              />
            </p>
            <div className="authBtns">
              <button type="submit">Войти</button>
            </div>
          </form>
        )}
      </div>
  );
};

export default Login;
