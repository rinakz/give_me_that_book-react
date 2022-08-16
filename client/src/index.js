import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Navbar from './components/Navbar';
import My from './components/My';
import MyBook from './components/MyBook';
import Rating from './components/Rating';
import BookPage from './components/BookPage';
import User from './components/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Login />}/>
        <Route path='/my' element={<My />}/>
        <Route path='/mybook' element={<MyBook />}/>
        <Route path='/rating' element={<Rating />}/>
        <Route path='/bookpage/:id' element={<BookPage />}/>
        <Route path='/userpage/:id' element={<User />}/>
      </Routes>
    </Provider>
  </BrowserRouter> 
);
