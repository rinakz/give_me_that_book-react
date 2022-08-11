import { DELETE_BOOKINGS, GET_ALL_BOOKINGS } from "../type"

export const bookingsReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_BOOKINGS:
      return payload  
    case DELETE_BOOKINGS:
      return state.filter(el => el.id != payload)   
      default:
          return state
  }
}
