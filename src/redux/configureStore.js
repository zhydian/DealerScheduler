import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Users } from './users'
import { Schedules } from './schedules'
import { Settings } from './settings'
import { RequestOff } from './requestOff'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Users: Users,
            Schedules: Schedules,
            Settings: Settings,
            RequestOff: RequestOff
        }),
        applyMiddleware(thunk,logger)
    );

    return store
}