import axios from "axios";

var initUser = function() {
    var url = process.env.NODE_ENV === 'dev' ? 'http://localhost:8000/' : '/';
    axios({
      method: 'post',
      url: url,
      data: {
        // email: 'oy',
        // username: 'oy',
        // password: '1234',
        // passwordConf: '1234'
        logemail: 'oy',
        logpassword: '1234'
      }
    })
    .then((response) => {
        console.log('user ==========> ', response);
    })
    .catch((err) => {
      console.log('AUTH ERROR! : ', err);
    })
}

export function fetchUser() {
  initUser();
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Doftomdow",
      age: 28,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}
