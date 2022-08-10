import axios from "axios";
import { LOGIN, LOGOUT, GET_ALL_BOOKS, DELETE_BOOKS} from "./type";

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
