export default function reducer(state = {
  collections: [],
  coll: [],
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  switch (action.type) {
    // all
    case "FETCH_COLLECTIONS": {
      return { ...state, fetching: true }
    }
    case "FETCH_COLLECTIONS_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "FETCH_COLLECTIONS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        collections: action.payload,
      }
    }
    // one
    case "FETCH_ONECOLL": {
      return { ...state, fetching: true }
    }
    case "FETCH_ONECOLL_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "FETCH_ONECOLL_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        coll: action.payload,
      }
    }
    // add
    case "ADD_ONECOLL": {
      return { ...state, fetching: true }
    }
    case "ADD_ONECOLL_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "ADD_ONECOLL_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        collections: action.payload,
      }
    }
    // dell \o/
    case "DROP_ONECOLL": {
      return { ...state, fetching: true }
    }
    case "DROP_ONECOLL_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "DROP_ONECOLL_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        collections: action.payload,
      }
    }
    // add
    case "ADD_ITEM": {
      return { ...state, fetching: true }
    }
    case "ADD_ITEM_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "ADD_ITEM_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        coll: action.payload,
      }
    }
    // update
    case "UPDATE_ITEM": {
      return { ...state, fetching: true }
    }
    case "UPDATE_ITEM_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "UPDATE_ITEM_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        coll: action.payload,
      }
    }
    // dell
    case "DELL_ITEM": {
      return { ...state, fetching: true }
    }
    case "DELL_ITEM_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "DELL_ITEM_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        coll: action.payload,
      }
    }

    default:
      return state;
  }

  return state
}
