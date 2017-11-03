import {SET_INFO,SET_USER} from '../actions/index';
const initialState = {
    age:20,
    sex:'男',
    name:'',
    user:'游客'
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
        default:
            return state
    }
}