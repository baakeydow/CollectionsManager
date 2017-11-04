import axios from "axios";

export function getCred(login) {
    return function(dispatch) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/' : '/';
        axios({
            method: 'post',
            url: url,
            data: {
                logemail: login.username,
                logpassword: login.passwd
            }
        })
        .then((response) => {
            dispatch({type: "FETCH_USER_FULFILLED", payload: response.data})
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
            dispatch({type: "FETCH_USER_REJECTED", payload: err})
        })
    }
}

export function findUser() {
    return function(dispatch) {
        var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/finduser' : '/finduser';
        axios({
            method: 'post',
            url: url,
            data: {
                te: 'doftom'
            }
        })
        .then((response) => {
            dispatch({type: "SET_USER_DATA", payload: response.data})
        })
        .catch((err) => {
            console.log('ERROR! : ', err);
            dispatch({type: "FETCH_USER_REJECTED", payload: err})
        })
    }
}

export function setUserName(user) {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export function setUserAge(data) {
  return {
    type: 'SET_USER_DATA',
    payload: data,
  }
}
