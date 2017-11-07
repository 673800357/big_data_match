import {SET_INFO,SET_USER,SET_HISTORY} from '../actions/index';
const initialState = {
    age:20,
    sex:'男',
    name:'',
    user:'游客',
    history:'login'
}
export function user(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SET_INFO:
            return {
                ...state,...action.data
            }
        case SET_USER:
            return {
               ...state, ...action.data
            }
        case SET_HISTORY:
        return {
            ...state,history:action.history
        }
        default:
            return state
    }
}