import {login} from './loginReducer';
import {home} from './homeReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    login,
    home
});

export default rootReducer
