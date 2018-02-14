import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from './js/store';
import App from './js/App';

const app = document.getElementById('root');

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in ' + process.env.NODE_ENV +' mode...');
}

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, app);

if (module.hot) {
  module.hot.accept()
}
