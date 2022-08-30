import axios from "axios";
import { LOGIN, LOGOUT, GET_ALL_BOOKS, DELETE_BOOKS, GET_ALL_BOOKINGS, DELETE_BOOKINGS, GET_ALL_COMMENTS, DELETE_COMMENTS, GET_ALL_USERS, START, STOP, GET_ALL_BOOKS_API, ACCEPT} from "./type";

export const actionLogin = (data) => ({
  type: LOGIN, payload: data
})
export const actionLogout = () => ({
  type: LOGOUT
})

export const getAllUsers = () => async (dispatch) => {
  const response = await axios('/allusers')
  dispatch({type: GET_ALL_USERS, payload: response.data});
}

export const getAllBooks = () => async (dispatch) => {
  dispatch({type:START})
  const response = await axios('/books')
  dispatch({type: STOP})
  dispatch({type: GET_ALL_BOOKS, payload: response.data});
}

export const deleteBooks = (id) => async (dispatch) => {
  const response = await axios.delete(`/books/${id}`)
  dispatch({type: DELETE_BOOKS, payload: id})
}

export const getAllBookings = () => async (dispatch) => {
  dispatch({type:START})
  const response = await axios('/bookings')
  dispatch({type: STOP})
  dispatch({type: GET_ALL_BOOKINGS, payload: response.data});
}

export const deleteBookings = (id) => async (dispatch) => {
  const response = await axios.delete(`/bookings/${id}`)
  dispatch({type: DELETE_BOOKINGS, payload: id})
}

export const getAllComments = () => async (dispatch) => {
  dispatch({type:START})
  const response = await axios('/comments')
  dispatch({type: STOP})
  dispatch({type: GET_ALL_COMMENTS, payload: response.data});
}

export const deleteComments = (id) => async (dispatch) => {
  const response = await axios.delete(`/comments/${id}`)
  dispatch({type: DELETE_COMMENTS, payload: id})
}

export const acceptBooking = (id) => async (dispatch) => {
  const response = await axios.put(`/bookings/${id}`)
  dispatch({type: ACCEPT, payload: id})
}

// export const getAllBooksApi = () => async (dispatch) => {
//   const response = await axios('https://www.googleapis.com/books/v1/volumes?q=isbn:0735619670')
//   dispatch({type: GET_ALL_BOOKS_API, payload: response.data});
// }
