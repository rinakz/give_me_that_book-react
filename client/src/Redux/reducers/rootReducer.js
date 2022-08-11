import { authuserReducer } from './authuserReducer'
import { combineReducers } from 'redux'
import { booksReducer } from './booksReducer'
import { bookingsReducer } from './bookingReducer'



export const rootReducer = combineReducers({
  books: booksReducer,
  bookings: bookingsReducer,
  authuser: authuserReducer,
})
