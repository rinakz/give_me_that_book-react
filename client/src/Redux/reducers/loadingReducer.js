import { START, STOP} from '../type'

export const loadingReducer = (state = false, action) => {
  const {type, payload} = action
  switch (type) {
    case START:
      return true
    case STOP:
      return false
    default:
      return state
  }
}
