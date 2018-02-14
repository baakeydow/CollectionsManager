export default function reducer(state={
    lang: "",
    wording: {},
    fetching: false,
    fetched: false,
    error: null,
  }, action) {
    switch (action.type) {
      case "GETFRENCH": {
        state.wording = action.payload
        state.lang = "FR"
        return {
          ...state
        };
      }
      case "GETENGLISH": {
        state.wording = action.payload
        state.lang = "EN"
        return {
          ...state
        };
      }
      default:
        return state;
    }

    return state
}
