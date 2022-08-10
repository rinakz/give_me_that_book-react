import { authuserReducer } from './authuserReducer'
import { combineReducers } from 'redux'
import { booksReducer } from './booksReducer'



export const rootReducer = combineReducers({
  books: booksReducer,
  authuser: authuserReducer,
})
