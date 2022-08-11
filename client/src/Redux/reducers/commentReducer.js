import { DELETE_COMMENTS, GET_ALL_COMMENTS } from "../type"

export const commentReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_COMMENTS:
      return payload  
    case DELETE_COMMENTS:
      return state.filter(el => el.id != payload)   
      default:
          return state
  }
}
