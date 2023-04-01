import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../Reducer'
import thunk from 'redux-thunk'
const middleware = [thunk]

import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store