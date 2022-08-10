import { DELETE_BOOKS, GET_ALL_BOOKS } from "../type"

export const booksReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_BOOKS:
      return payload  
    case DELETE_BOOKS:
      return state.filter(el => el.id != payload)   
      default:
          return state
  }
}
