export default function reducer(state = {
  user: {
    perm: 0,
    uid: null
  },
  fetching: false,
  fetched: false,
  error: null,
}, action) {

  switch (action.type) {
    case "FETCH_USER": {
      return { ...state, fetching: true }
    }
    case "CREATE_USER_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "CREATE_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: {
          email: action.payload.email,
          username: action.payload.username,
          perm: action.payload.perm,
          uid: action.payload._id
        }
      }
    }
    case "FETCH_USER_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: {
          email: action.payload.email,
          username: action.payload.username,
          perm: action.payload.perm,
          uid: action.payload._id
        }
      }
    }
    case "SET_USER": {
      return {
        ...state,
        user: { ...state.user },
      }
    }
    case "SET_USER_DATA": {
      return {
        ...state,
        user: {
          email: action.payload.email,
          username: action.payload.username,
          perm: action.payload.perm,
          uid: action.payload._id
        }
      }
    }
    default:
      return state;
  }

  return state
}
