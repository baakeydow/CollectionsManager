export default function reducer(state={
    user: {
      userId: null,
      data: null
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER": {
        return {
          ...state,
          user: {...state.user},
        }
      }
      case "SET_USER_DATA": {
        const data = {
            email: action.payload.email,
            username: action.payload.username
        }
        return {
          ...state,
          user: {
              userId: action.payload._id,
              data: data
          },
        }
      }
      default:
        return state;
    }

    return state
}
