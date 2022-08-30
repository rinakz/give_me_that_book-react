import { ACCEPT, DELETE_BOOKINGS, GET_ALL_BOOKINGS } from "../type"

export const bookingsReducer = (state = [], action) => {
  const { type, payload } = action
  
  switch (type) {
    case GET_ALL_BOOKINGS:
      return payload  
    case DELETE_BOOKINGS:
      return state.filter(el => el.id != payload) 
    case ACCEPT:
      return state.map(el => {
        if (el.id == payload) {
          return {...el, status: true}
        }
        return {...el}
      })  
      default:
          return state
  }
}
