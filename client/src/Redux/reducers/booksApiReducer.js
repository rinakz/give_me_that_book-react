import { GET_ALL_BOOKS_API } from "../type"

export const booksApiReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_BOOKS_API:
      return payload    
      default:
          return state
  }
}
