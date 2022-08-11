import axios from "axios";
import { LOGIN, LOGOUT, GET_ALL_BOOKS, DELETE_BOOKS, GET_ALL_BOOKINGS, DELETE_BOOKINGS} from "./type";

export const actionLogin = (data) => ({
  type: LOGIN, payload: data
})
export const actionLogout = () => ({
  type: LOGOUT
})

export const getAllBooks = () => async (dispatch) => {
  const response = await axios('/books')
  dispatch({type: GET_ALL_BOOKS, payload: response.data});
}

export const deleteBooks = (id) => async (dispatch) => {
  const response = await axios.delete(`/books/${id}`)
  dispatch({type: DELETE_BOOKS, payload: id})
}

export const getAllBookings = () => async (dispatch) => {
  const response = await axios('/bookings')
  dispatch({type: GET_ALL_BOOKINGS, payload: response.data});
}

export const deleteBookings = (id) => async (dispatch) => {
  const response = await axios.delete(`/bookings/${id}`)
  dispatch({type: DELETE_BOOKINGS, payload: id})
}
