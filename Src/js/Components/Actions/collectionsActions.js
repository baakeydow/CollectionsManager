import axios from "axios";

export function fetchAllCollections() {
  return function (dispatch) {
    dispatch({ type: "FETCH_COLLECTIONS" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/list/?dev=true' : '/db/list';
    axios({
      method: 'get',
      url: url
    }).then((response) => {
      dispatch({ type: "FETCH_COLLECTIONS_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "FETCH_COLLECTIONS_REJECTED", payload: err })
    })
  }
}

export function fetchOneCollection(collname) {
  return function (dispatch) {
    dispatch({ type: "FETCH_ONECOLL" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/getdbcoll/' : '/db/getdbcoll/';
    axios({
      method: 'post',
      url: url,
      data: {
        coll: collname
      }
    }).then((response) => {
      dispatch({ type: "FETCH_ONECOLL_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "FETCH_ONECOLL_REJECTED", payload: err })
    })
  }
}

export function addCollection(coll) {
  return function (dispatch) {
    dispatch({ type: "ADD_ONECOLL" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/adddbcoll/' : '/db/adddbcoll/';
    axios({
      method: 'POST',
      url: url,
      data: {
        coll: coll
      }
    }).then((response) => {
      dispatch({ type: "ADD_ONECOLL_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "ADD_ONECOLL_REJECTED", payload: err })
    })
  }
}

export function dropOneCollection(collname) {
  return function (dispatch) {
    dispatch({ type: "DROP_ONECOLL" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/dropdbcoll/' : '/db/dropdbcoll/';
    axios({
      method: 'post',
      url: url,
      data: {
        coll: collname
      }
    }).then((response) => {
      dispatch({ type: "DROP_ONECOLL_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "DROP_ONECOLL_REJECTED", payload: err })
    })
  }
}

export function addItem(item) {
  return function (dispatch) {
    dispatch({ type: "ADD_ITEM" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/additem/' : '/db/additem/';

    axios({
      method: 'POST',
      url: url,
      data: {
        item: item
      }
    }).then((response) => {
      dispatch({ type: "ADD_ITEM_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "ADD_ITEM_REJECTED", payload: err })
    })
  }
}

export function delItem(item) {
  return function (dispatch) {
    dispatch({ type: "DELL_ITEM" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/delitem/' : '/db/delitem/';

    axios({
      method: 'POST',
      url: url,
      data: {
        item: item
      }
    }).then((response) => {
      dispatch({ type: "DELL_ITEM_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "DELL_ITEM_REJECTED", payload: err })
    })
  }
}

export function updateItem(item) {
  return function (dispatch) {
    dispatch({ type: "UPDATE_ITEM" });
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/db/updateitem/' : '/db/updateitem/';

    axios({
      method: 'POST',
      url: url,
      data: {
        item: item
      }
    }).then((response) => {
      dispatch({ type: "UPDATE_ITEM_FULFILLED", payload: response.data })
    }).catch((err) => {
      console.log('ERROR! : ', err);
      dispatch({ type: "UPDATE_ITEM_REJECTED", payload: err })
    })
  }
}
