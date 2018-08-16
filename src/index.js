import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './redux/reducers'
let initialState = {
    userInfo: {
        location: {
            city: window.localStorage.getItem('city') || '选择城市',
            name: window.localStorage.getItem('name') || ''
        }
    }
}
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log('' || 2)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();


export { store } 