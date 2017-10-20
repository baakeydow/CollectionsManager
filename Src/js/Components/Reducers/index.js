import { combineReducers } from "redux"

import collections from "./collectionsReducer"
import user from "./userReducer"
import lang from "./langReducer"

export default combineReducers({
  collections,
  user,
  lang,
})
