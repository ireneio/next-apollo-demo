import { combineReducers } from 'redux'
import taskReducer from './task'
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer
})

export default rootReducer
