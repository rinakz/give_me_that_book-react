import { authuserReducer } from './authuserReducer'
import { combineReducers } from 'redux'
import { booksReducer } from './booksReducer'
import { bookingsReducer } from './bookingReducer'
import { commentReducer } from './commentReducer'
import { usersReducer } from './usersReducer'
import { loadingReducer } from './loadingReducer'
import { booksApiReducer } from './booksApiReducer'



export const rootReducer = combineReducers({
  books: booksReducer,
  bookings: bookingsReducer,
  authuser: authuserReducer,
  comments: commentReducer,
  users: usersReducer,
  loading:loadingReducer,
  booksapi:booksApiReducer,
})
