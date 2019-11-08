import { combineReducers } from 'redux'

import reducersTodo from './reducersTodo'

const appReducers= combineReducers({
    todo: reducersTodo
})

export default appReducers
